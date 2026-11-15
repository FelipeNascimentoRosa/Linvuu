import { Link } from 'react-router-dom';
import { Curso, coberturaNoSite, statusDoCurso } from '../lib/content';
import { LOCALE, useT } from '../i18n';
import { Capacitor } from '@capacitor/core';

const SAUDACAO: Record<string, string> = { en: 'Hello', es: 'Hola', ru: 'Привет', de: 'Hallo', fr: 'Bonjour', it: 'Ciao', br: 'Olá' };

/** `nivel`: nível do título do cartão (3 dentro de uma seção com h2; 2 numa página em que o h1 é o título). */
const DESCRICOES_CATALOGO: Record<string, string> = {
  en: 'Inglês para quem fala português: pronúncia, gramática explicada com os erros típicos de brasileiros e áudio em cada frase.',
  es: 'Espanhol para quem fala português: falsos amigos e «portunhol» desde a primeira aula, gramática com os erros típicos de brasileiros e áudio em cada frase.',
  de: 'Alemão em passos pequenos: sons, gramática explicada com exemplos e erros comuns, diálogos com áudio e simulados originais.',
  fr: 'Francês para quem fala português: som antes da escrita, gramática com os erros típicos de brasileiros e áudio em cada frase.',
  it: 'Italiano para quem fala português: som e escrita desde a primeira aula, gramática com os erros típicos de brasileiros e áudio em cada frase.',
  ru: 'Russo com explicação em português: alfabeto cirílico, sons, casos com exemplos e erros comuns, diálogos com áudio e simulados originais.',
};

export function CursoCard({ curso, nivel = 3, catalogoRascunho = false }: { curso: Curso; nivel?: 2 | 3; catalogoRascunho?: boolean }) {
  const Titulo = nivel === 2 ? 'h2' : 'h3';
  const t = useT();
  const aulas = Math.floor((statusDoCurso(curso.id)?.publicadas ?? 0) / 4);
  const cob = coberturaNoSite(curso.id);
  const cobertura = t.card.cobertura(cob.traduzidas, cob.total);
  return (
    <Link to={`/curso/${curso.id}`} className="lv-card">
      {catalogoRascunho && curso.id !== 'br' ? <span className={`catalogo-rabisco catalogo-rabisco-${curso.id}`} aria-hidden="true" /> : import.meta.env.VITE_ALVO !== 'apk' && !Capacitor.isNativePlatform() && LOCALE.codigo === 'pt-BR' && <img className="curso-card-capa" src={`/livros/${curso.id}-a1-a2-v1-600.webp`} alt={`Capa do livro de ${curso.nome.toLowerCase()} A1–A2, Coleção Linvuu`} width="600" height="800" loading="lazy" decoding="async" />}
      {SAUDACAO[curso.id] && <span className="lv-saud" lang={curso.id === 'br' ? 'pt-BR' : curso.id} aria-hidden="true">{SAUDACAO[curso.id]}</span>}
      <Titulo className="lv-card-t">{curso.nome}</Titulo>
      <span className="lv-nativo" lang={curso.id === 'br' ? 'pt-BR' : curso.id}>{curso.nomeNativo !== curso.nome ? curso.nomeNativo : ' '}</span>
      <p>{catalogoRascunho && LOCALE.codigo === 'pt-BR' ? DESCRICOES_CATALOGO[curso.id] ?? curso.descricao : curso.descricao}</p>
      <span className="lv-card-meta">{aulas > 0 ? t.card.noAr(aulas) : t.card.preparo}{!catalogoRascunho && <> · {t.card.ate}</>}{cobertura && <><br />{cobertura}</>}</span>
    </Link>
  );
}
