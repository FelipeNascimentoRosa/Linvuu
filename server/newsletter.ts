// Inscrição na newsletter. POST /api/newsletter  → grava em `newsletter/{sha256(email)}` com o Admin SDK.
// O navegador não escreve no Firestore (as regras negam /newsletter): aqui validamos tipos e tamanhos, exigimos o aceite
// de marketing, registramos o consentimento (quando, em qual idioma e qual versão do texto) e limitamos por IP (seguranca.ts).
// O id do documento é o hash do e-mail: inscrever duas vezes não duplica nem revela se o e-mail já estava na lista.
import crypto from 'node:crypto';
import type { Express, Request, Response } from 'express';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { firebaseAdmin, projetoFirebase } from './firebase-admin';

const COLECAO = 'newsletter';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORIGEM = /^[a-z0-9-]{1,40}$/;
const IDIOMAS = new Set(['pt', 'en']);
/** Versão do texto de consentimento exibido no formulário (src/i18n: newsletter.consentimento). Mude ao alterar o texto. */
export const VERSAO_CONSENTIMENTO = 'v1-2026-10-22';

export interface Inscricao { email: string; origem: string; idioma: string }

/** Valida o corpo. Devolve null se qualquer campo faltar, tiver tipo errado, tamanho excessivo ou se o aceite não vier. */
export function validarInscricao(corpo: unknown): Inscricao | null {
  const b = corpo as Record<string, unknown> | null;
  if (!b || typeof b !== 'object' || Array.isArray(b)) return null;
  if (Object.keys(b).some((k) => !['email', 'origem', 'idioma', 'aceite', 'ref_extra_nl'].includes(k))) return null;
  if (typeof b.email !== 'string' || b.email.length > 254) return null;
  const email = b.email.trim().toLowerCase();
  if (!EMAIL.test(email)) return null;
  if (typeof b.origem !== 'string' || !ORIGEM.test(b.origem)) return null;
  if (typeof b.idioma !== 'string' || !IDIOMAS.has(b.idioma)) return null;
  if (b.aceite !== true) return null; // consentimento explícito, marcado pela pessoa
  return { email, origem: b.origem, idioma: b.idioma };
}

export const idDoEmail = (email: string) => crypto.createHash('sha256').update(email).digest('hex');

export function registrarNewsletter(app: Express) {
  app.post('/api/newsletter', async (req: Request, res: Response) => {
    // Campo-isca (`ref_extra_nl`: nome neutro, que gerenciadores de senha e autopreenchimento não reconhecem): invisível para pessoas; se vier preenchido é robô. Respondemos como sucesso, sem gravar.
    if (typeof req.body?.ref_extra_nl === 'string' && req.body.ref_extra_nl !== '') { res.status(204).end(); return; }
    const v = validarInscricao(req.body);
    if (!v) { res.status(400).json({ error: 'Pedido inválido.' }); return; }
    if (!projetoFirebase) { res.status(503).json({ error: 'Indisponível no momento.' }); return; }
    try {
      await getFirestore(firebaseAdmin()).collection(COLECAO).doc(idDoEmail(v.email)).create({
        email: v.email,
        origem: v.origem,
        idioma: v.idioma,
        criadoEm: FieldValue.serverTimestamp(),
        consentimento: true,
        consentimentoEm: FieldValue.serverTimestamp(),
        consentimentoVersao: VERSAO_CONSENTIMENTO,
      });
      res.status(204).end();
    } catch (e) {
      // Já inscrito (documento existe): responde igual a sucesso, sem revelar quem está na lista.
      if ((e as { code?: number | string })?.code === 6 || (e as { code?: string })?.code === 'already-exists') { res.status(204).end(); return; }
      res.status(500).json({ error: 'Não foi possível registrar.' });
    }
  });
}
