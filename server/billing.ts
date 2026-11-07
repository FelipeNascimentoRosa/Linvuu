// Cobrança da Linvuu: Stripe (site) e Google Play via RevenueCat (app) são as fontes da verdade. O navegador manda o token de login (Firebase);
// o servidor confere o token, acha o cliente no Stripe pelo uid e responde se o acesso está ativo. O resultado fica gravado em
// `acessos/{uid}` (server/acesso.ts), renovado pelo webhook a cada evento; a regra está em server/acesso-calculo.ts.
import fs from 'node:fs';
import path from 'node:path';
import type { Express, Request, Response } from 'express';
import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import { firebaseAdmin } from './firebase-admin';
import { consultarPlay, playConfigurado } from './play';
import { registrarWebhookCobranca } from './billing-webhook';
import { precoMensalObrigatorio, planoSiteValido } from './billing-contrato';
import crypto from 'node:crypto';
import { podeComprar, type Acesso } from './acesso-calculo';
import { acessoDoRegistro, gravarRegistro, lerRegistro, liberarConversao, reservarConversao } from './acesso';
import { enviarCompra, validarMedicao } from './conversoes';
import { criarProcessadorCobranca } from './cobranca-eventos';
import { CENTAVOS } from '../src/config/planos.ts';
import { caminhoNoPerfil } from '../src/i18n/locales.ts';
import { perfilDaRequisicao } from './dominio';

const chave = process.env.STRIPE_SECRET_KEY;
const projeto = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
const stripe = chave ? new Stripe(chave) : null;
// Valores cobrados: src/config/planos.ts (fonte única, também usada pelas páginas e pelo JSON-LD). A mensal usa o preço
// recorrente do Stripe (STRIPE_PRICE_ID), conferido contra CENTAVOS.mensal pelo /readyz; os pacotes usam CENTAVOS direto.

/** Alguma origem de cobrança pronta: Stripe (site) ou Google Play (app, via RevenueCat). */
export const cobrancaConfigurada = () => !!((stripe || playConfigurado()) && projeto);

export async function usuario(req: Request): Promise<{ uid: string; email?: string } | null> {
  const h = req.headers.authorization || '';
  if (!h.startsWith('Bearer ') || !projeto) return null;
  try {
    // Revogação e conta desativada também invalidam tokens ainda não expirados.
    const t = await getAuth(firebaseAdmin()).verifyIdToken(h.slice(7), true);
    return { uid: t.uid, email: t.email };
  } catch (e) {
    if (e instanceof Error && /sem credencial/.test(e.message) && !avisouCredencial) { avisouCredencial = true; console.error('[Linvuu]', e.message); }
    return null;
  }
}
let avisouCredencial = false;

async function preco(): Promise<string> {
  // O endpoint /readyz já consulta a API Stripe em modo somente leitura para validar esse preço.
  // Não criar produtos/preços automaticamente: ausência de configuração é erro operacional,
  // nunca autorização para mutação financeira silenciosa em modo live.
  return precoMensalObrigatorio(process.env.STRIPE_PRICE_ID);
}

// A busca de clientes do Stripe é «eventualmente consistente»: um cliente recém-criado pode levar até um minuto para
// aparecer. Sem memória, dois cliques seguidos em «Assinar» criavam dois clientes para a mesma pessoa. O id fica guardado
// por uid (e o pedido em andamento é compartilhado), e a busca só acontece uma vez por processo.
const clientes = new Map<string, Promise<string>>();
const usuarioPorCliente = new Map<string, string>();
function cliente(u: { uid: string; email?: string }): Promise<string> {
  const guardado = clientes.get(u.uid);
  if (guardado) return guardado;
  const p = (async () => {
    const r = await stripe!.customers.search({ query: `metadata['uid']:'${u.uid}'` });
    const id = r.data[0]?.id ?? (await stripe!.customers.create({ email: u.email, metadata: { uid: u.uid } }, { idempotencyKey: `linvuu-cliente-${u.uid}` })).id;
    usuarioPorCliente.set(id, u.uid);
    return id;
  })();
  clientes.set(u.uid, p);
  p.catch(() => clientes.delete(u.uid));
  return p;
}


// Cada sessão paga e cada áudio pago perguntam se o acesso está ativo. Sem memória, eram 3 chamadas ao Stripe por arquivo
// de áudio (dezenas por sessão), o que estoura o limite da API e deixa o site lento. A resposta vale 60 segundos por pessoa.
const ACESSO_MS = 60_000;
const acessos = new Map<string, { ate: number; p: Promise<Acesso> }>();
const renovou = new Map<string, number>();
/** Registra antes de express.json: a assinatura Stripe depende dos bytes originais. */
export function registrarNotificacoesCobranca(app: Express) {
  registrarWebhookCobranca(app, {
    stripe,
    segredo: () => process.env.STRIPE_WEBHOOK_SECRET,
    invalidar: (clienteId, evento) => processarEvento(clienteId, evento),
  });
}
setInterval(() => { const t = Date.now(); for (const [k, v] of acessos) if (v.ate < t) acessos.delete(k); for (const [k, v] of renovou) if (t - v > 60_000) renovou.delete(k); }, 5 * 60_000).unref();
/** Acesso com memória curta; `renovar` ignora a memória (tela de assinatura e volta do pagamento). */
function acesso(u: { uid: string; email?: string }, renovar = false): Promise<Acesso> {
  const t = Date.now();
  const m = acessos.get(u.uid);
  // «renovar» ignora a memória, mas no máximo uma vez a cada 10 s por pessoa (cada renovação custa 2 chamadas ao Stripe).
  const pode = renovar && t - (renovou.get(u.uid) ?? 0) > 10_000;
  if (m && m.ate > t && !pode) return m.p;
  if (pode) renovou.set(u.uid, t);
  // Registro gravado pelo webhook (vale para todas as instâncias) só como atalho para «tem acesso»; sem acesso, vencido ou «renovar»,
  // relê as duas origens (Stripe e Google Play).
  const p = (pode ? Promise.resolve(null) : lerRegistro(u.uid)).then((r) => acessoDoRegistro(r) ?? consultarAcesso(u));
  acessos.set(u.uid, { ate: t + ACESSO_MS, p });
  p.catch(() => acessos.delete(u.uid));
  return p;
}

/** Acesso = assinatura mensal ativa OU pacote de 3 meses pago (Pix e boleto só contam depois de pagos). Stripe é a fonte da verdade. */
async function consultarAcesso(u: { uid: string; email?: string }): Promise<Acesso> {
  // Duas origens, um acesso: assinatura do site (Stripe) OU do app (Google Play). Qualquer erro de consulta vira erro, nunca acesso.
  // Se uma origem falhar e a outra confirmar acesso, vale a confirmação; se nenhuma confirmar e alguma falhar, é erro.
  const [rs, rp] = await Promise.allSettled([stripe ? consultarStripe(u) : Promise.resolve(null), consultarPlay(u.uid)]);
  const site = rs.status === 'fulfilled' ? rs.value : null, play = rp.status === 'fulfilled' ? rp.value : null;
  if (site?.ativa) return site;
  if (play?.ativa) return { ativa: true, via: 'play', status: 'active', cancelaEm: play.cancelaEm, ate: play.ate };
  if (rs.status === 'rejected') throw rs.reason;
  if (rp.status === 'rejected') throw rp.reason;
  return site ?? { ativa: false, via: null, status: null, cancelaEm: null, ate: null };
}

const eventos = criarProcessadorCobranca({
  stripe: () => stripe!,
  registro: { ler: lerRegistro, gravar: gravarRegistro, reservar: reservarConversao, liberar: liberarConversao },
  enviarCompra,
  uidConhecido: (c) => usuarioPorCliente.get(c),
  lembrarUid: (c, uid) => usuarioPorCliente.set(c, uid),
  esquecerMemoria: (uid) => { acessos.delete(uid); renovou.delete(uid); },
});
const processarEvento = eventos.processarEvento;
async function consultarStripe(u: { uid: string; email?: string }): Promise<Acesso> {
  return eventos.acessoDoCliente(u.uid, await cliente(u));
}

export function registrarCobranca(app: Express, urlBase: (req: Request) => string) {
  const nao = (res: Response) => res.status(503).json({ error: 'Pagamento ainda não configurado.' });
  const guarda = async (req: Request, res: Response) => {
    if (!cobrancaConfigurada()) { nao(res); return null; }
    const u = await usuario(req);
    if (!u) { res.status(401).json({ error: 'Entre na sua conta.' }); return null; }
    return u;
  };

  // Sessões depois da 8ª (as 2 primeiras aulas são grátis): só saem do servidor para quem tem assinatura ativa.
  app.get('/api/aula/:idioma/:n', async (req: Request, res: Response) => {
    const idioma = String(req.params.idioma), n = Number(req.params.n);
    if (!/^[a-z]{2}$/.test(idioma) || !Number.isInteger(n) || n < 1 || n > 999) { res.status(404).json({ error: 'Aula não encontrada.' }); return; }
    // ?l=en: a mesma sessão com a explicação traduzida (content/idiomas/<id>/<l>/dia-NNN.json), quando existir.
    const l = String(req.query.l ?? '');
    const nome = `dia-${String(n).padStart(3, '0')}.json`;
    const traduzido = /^en$/.test(l) ? path.join(process.cwd(), 'content', 'idiomas', idioma, l, nome) : '';
    const arq = traduzido && fs.existsSync(traduzido) ? traduzido : path.join(process.cwd(), 'content', 'idiomas', idioma, nome);
    if (!fs.existsSync(arq)) { res.status(404).json({ error: 'Aula não encontrada.' }); return; }
    const livre = n <= 8 || (process.env.NODE_ENV !== 'production' && !cobrancaConfigurada());
    if (!livre) {
      const u = await guarda(req, res); if (!u) return;
      try {
        if (!(await acesso(u)).ativa) { res.status(403).json({ error: 'Assinatura necessária.' }); return; }
      } catch (e) { console.error('aula', e); res.status(500).json({ error: 'Não foi possível verificar a assinatura.' }); return; }
    }
    try { res.set('Cache-Control', 'private, no-store').type('json').send(fs.readFileSync(arq, 'utf8')); } catch (e) { console.error('aula/leitura', e); res.status(500).json({ error: 'Não foi possível abrir a aula.' }); }
  });

  // Gramática por tópico: os tópicos das 2 primeiras aulas (sessões 1 a 8) são abertos; os demais só saem para quem tem assinatura ativa.
  app.get('/api/gramatica/:idioma', async (req: Request, res: Response) => {
    const idioma = String(req.params.idioma);
    if (!/^[a-z]{2}$/.test(idioma)) { res.status(404).json({ error: 'Não encontrado.' }); return; }
    const l = String(req.query.l ?? '');
    const traduzida = /^en$/.test(l) ? path.join(process.cwd(), 'content', 'gramatica', `${idioma}.${l}.json`) : '';
    const arq = traduzida && fs.existsSync(traduzida) ? traduzida : path.join(process.cwd(), 'content', 'gramatica', `${idioma}.json`);
    if (!fs.existsSync(arq)) { res.status(404).json({ error: 'Não encontrado.' }); return; }
    let pacote: { categorias: string[]; topicos: { dia: number; categoria: string }[] };
    try { pacote = JSON.parse(fs.readFileSync(arq, 'utf8')); } catch (e) { console.error('gramatica/leitura', e); res.status(500).json({ error: 'Não foi possível abrir a gramática.' }); return; }
    let completo = process.env.NODE_ENV !== 'production' && !cobrancaConfigurada();
    if (!completo) {
      const u = await usuario(req);
      if (u) {
        try { completo = (await acesso(u)).ativa; } catch (e) { console.error('gramatica', e); }
      }
    }
    const abertos = pacote.topicos.filter((t) => t.dia <= 8);
    const topicos = completo ? pacote.topicos : abertos;
    const categorias = pacote.categorias.filter((c) => topicos.some((t) => t.categoria === c));
    res.set('Cache-Control', 'private, no-store').json({ ...pacote, categorias, topicos, completo, bloqueados: pacote.topicos.length - topicos.length });
  });

  // Áudio das sessões depois da 8ª: arquivos em server/audio-privado (fora de public/). Mesma regra do texto:
  // só sai para quem tem assinatura ativa. Em desenvolvimento sem cobrança configurada, libera para testar.
  app.get('/api/audio/:idioma/:arquivo', async (req: Request, res: Response) => {
    const idioma = String(req.params.idioma), arquivo = String(req.params.arquivo);
    if (!/^[a-z]{2}$/.test(idioma) || !/^[0-9a-f]{8}\.mp3$/.test(arquivo)) { res.status(404).end(); return; }
    // Voz nova (ElevenLabs) em audio-privado-v2; o que ainda não foi regravado cai no áudio antigo (Edge).
    const novo = path.resolve(process.cwd(), 'server', 'audio-privado-v2', idioma, arquivo);
    const arq = fs.existsSync(novo) ? novo : path.resolve(process.cwd(), 'server', 'audio-privado', idioma, arquivo);
    if (!fs.existsSync(arq)) { res.status(404).end(); return; }
    const livre = process.env.NODE_ENV !== 'production' && !cobrancaConfigurada();
    if (!livre) {
      const u = await guarda(req, res); if (!u) return;
      try {
        if (!(await acesso(u)).ativa) { res.status(403).json({ error: 'Assinatura necessária.' }); return; }
      } catch (e) { console.error('audio', e); res.status(500).json({ error: 'Não foi possível verificar a assinatura.' }); return; }
    }
    res.set('Cache-Control', 'private, no-store').type('audio/mpeg').sendFile(arq);
  });

  app.get('/api/billing/status', async (req: Request, res: Response) => {
    const u = await guarda(req, res); if (!u) return;
    try {
      res.set('Cache-Control', 'private, no-store').json(await acesso(u, true));
    } catch (e) { console.error('billing/status', e); res.status(500).json({ error: 'Não foi possível consultar a assinatura.' }); }
  });

  app.post('/api/billing/checkout', async (req: Request, res: Response) => {
    const u = await guarda(req, res); if (!u) return;
    if (!stripe) { nao(res); return; }
    try {
      const base = urlBase(req);
      const plano = req.body?.plano;
      if (!planoSiteValido(plano)) { res.status(400).json({ error: 'Plano inválido.' }); return; }
      const pix = plano === 'trimestral-pix';
      const anual = plano === 'anual';
      const pacote = plano === 'trimestral' || pix || anual;
      // Quem já tem acesso não paga de novo pelo mesmo período (pacote sobre pacote soma; mensal sobre acesso ativo, não).
      const atual = await acesso(u, true);
      const pode = podeComprar(atual, plano);
      if (!pode.ok) { res.status(409).json({ error: pode.motivo === 'ja-assinante' ? 'Você já tem uma assinatura ativa.' : 'Você já tem acesso pago ativo.', motivo: pode.motivo }); return; }
      const medicao = validarMedicao(req.body?.medicao, req.ip, req.get('user-agent'));
      const c = await cliente(u);
      // idioma do site (pt, en): o checkout do Stripe e a volta para o site ficam no mesmo idioma
      const idioma = req.body?.idioma === 'en' ? ('en' as const) : null;
      // volta para o idioma e para o domínio de onde veio (no .com o inglês não tem prefixo; no .com.br segue /en)
      const perfil = perfilDaRequisicao(req);
      const rota = (cod: 'pt-BR' | 'en') => caminhoNoPerfil(perfil, cod, '/assinatura');
      // Duplo clique (ou nova tentativa da rede) com o mesmo pedido em 10 minutos devolve a MESMA sessão, não abre outra.
      const opcoes = { idempotencyKey: 'checkout-' + crypto.createHash('sha256').update(JSON.stringify([u.uid, plano, idioma, medicao, Math.floor(Date.now() / 600_000)])).digest('hex').slice(0, 40) };
      const comum = { customer: c, locale: (idioma ?? 'pt-BR') as 'pt-BR' | 'en', success_url: `${base}${rota(idioma ?? 'pt-BR')}?ok=1`, cancel_url: `${base}${rota(idioma ?? 'pt-BR')}`, client_reference_id: u.uid, allow_promotion_codes: true };
      const s = pix
        ? await stripe!.checkout.sessions.create({
            ...comum, mode: 'payment', allowed_payment_method_types: ['pix'],
            payment_method_options: { pix: { expires_after_seconds: 86400 } },
            line_items: [{ quantity: 1, price_data: { currency: 'brl', unit_amount: CENTAVOS['trimestral-pix'], product_data: { name: 'Linvuu: 3 meses de acesso (Pix, 30% de desconto)' } } }],
            metadata: { plano, uid: u.uid, ...medicao },
            custom_text: { submit: { message: 'Pagamento único por Pix, sem renovação automática. O QR code aparece na tela seguinte. Reembolso integral em até 7 dias.' } },
          }, opcoes)
        : pacote
        ? await stripe!.checkout.sessions.create({
            ...comum, mode: 'payment', allowed_payment_method_types: ['card', 'boleto'],
            payment_method_options: { boleto: { expires_after_days: 3 } },
            line_items: [{ quantity: 1, price_data: { currency: 'brl', unit_amount: anual ? CENTAVOS.anual : CENTAVOS.trimestral, product_data: { name: anual ? 'Linvuu: 12 meses de acesso' : 'Linvuu: 3 meses de acesso' } } }],
            metadata: { plano: anual ? 'anual' : 'trimestral', uid: u.uid, ...medicao },
            custom_text: { submit: { message: 'Pagamento único, sem renovação automática, com reembolso integral em até 7 dias.' } },
          }, opcoes)
        : await stripe!.checkout.sessions.create({
            ...comum, mode: 'subscription',
            custom_text: { submit: { message: 'Reembolso integral em até 7 dias. Cancele quando quiser, sem multa.' } },
            line_items: [{ price: await preco(), quantity: 1 }],
            metadata: { plano: 'mensal', uid: u.uid, ...medicao },
          }, opcoes);
      res.json({ url: s.url });
    } catch (e) { console.error('billing/checkout', e); res.status(500).json({ error: 'Não foi possível abrir o pagamento.' }); }
  });

  app.post('/api/billing/portal', async (req: Request, res: Response) => {
    const u = await guarda(req, res); if (!u) return;
    if (!stripe) { nao(res); return; }
    try {
      const idioma = req.body?.idioma === 'en' ? ('en' as const) : null;
      const s = await stripe!.billingPortal.sessions.create({ customer: await cliente(u), locale: idioma ?? 'pt-BR', return_url: `${urlBase(req)}${caminhoNoPerfil(perfilDaRequisicao(req), idioma ?? 'pt-BR', '/assinatura')}` });
      res.json({ url: s.url });
    } catch (e) { console.error('billing/portal', e); res.status(500).json({ error: 'Não foi possível abrir o portal.' }); }
  });
}

/** Livro de gramática: só entrega o HTML para quem tem acesso ativo (assinatura ou pacote pago). Nunca fica em public/. */
export function registrarLivroProtegido(app: Express) {
  app.get('/api/livros/gramatica-ru', async (req: Request, res: Response) => {
    if (!cobrancaConfigurada()) { res.status(503).json({ error: 'Indisponível no momento.' }); return; }
    const u = await usuario(req);
    if (!u) { res.status(401).json({ error: 'Entre na sua conta.' }); return; }
    let a: Acesso;
    try { a = await acesso(u); } catch (e) { console.error('livro', e); res.status(503).json({ error: 'Indisponível no momento.' }); return; }
    if (!a.ativa) { res.status(402).json({ error: 'Assinatura necessária.' }); return; }
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    try { res.type('html').send(fs.readFileSync(path.resolve(import.meta.dirname, 'conteudo', 'gramatica-ru.html'), 'utf8')); } catch (e) { console.error('livro/leitura', e); res.status(500).json({ error: 'Indisponível no momento.' }); }
  });
}


