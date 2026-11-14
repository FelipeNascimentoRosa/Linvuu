// Materiais gratuitos: guia do alfabeto e da pronúncia (russo, alemão, francês, italiano, espanhol), em português,
// para quem fala português. Só no .com.br. O conteúdo de cada idioma mora em src/lib/alfabeto/<id>.ts.
import { limpar, type Alfabeto, type Bloco, type Exercicio } from "./alfabeto/base.ts";
import { RUSSO } from "./alfabeto/ru.ts";
import { ALEMAO } from "./alfabeto/de.ts";
import { FRANCES } from "./alfabeto/fr.ts";
import { ITALIANO } from "./alfabeto/it.ts";
import { ESPANHOL } from "./alfabeto/es.ts";
import { VOCABULARIO_RUSSO } from './vocabulario-russo.ts';

export type { Alfabeto, Bloco, Exercicio };
export type { Cartao, Exemplo } from "./alfabeto/base.ts";

/** Na ordem em que aparecem no site. */
export const ALFABETOS: Alfabeto[] = [RUSSO, ALEMAO, FRANCES, ITALIANO, ESPANHOL];
export const alfabetoPorSlug = (slug: string) => ALFABETOS.find((a) => a.slug === slug);

export const CAMINHO_HUB = "/materiais-gratuitos";
export const caminhoAlfabeto = (slug: string) => `${CAMINHO_HUB}/${slug}`;
export const TITULO_HUB = "Materiais gratuitos: alfabeto e pronúncia";
export const DESCRICAO_HUB = "Guias gratuitos de alfabeto e pronúncia da Linvuu, sem cadastro: russo, alemão, francês, italiano e espanhol, para quem fala português, com áudio.";
export const LEAD_HUB = "Guias curtos para estudar sem cadastro e sem pagar. Cada um reúne o alfabeto do idioma em uma página: as letras que parecem com as do português, as que enganam e as que são novas.";

/** Todo texto falado (palavras em russo, alemão...) de um idioma, para conferir a cobertura de áudio. */
export function textosFalados(a: Alfabeto): string[] {
  const s = new Set<string>();
  const alvo = (t: string) => limpar(t).trim();
  for (const b of a.blocos) {
    if (b.t === "palavras") for (const w of b.itens) s.add(alvo(w.txt));
    if (b.t === "cartoes") for (const c of b.itens) if (c.exemplo) s.add(alvo(c.exemplo.txt));
  }
  for (const e of a.exercicios) if (e.txt) s.add(alvo(e.txt));
  return [...s];
}

/** Vocabulário de leitura já presente no guia, sem afirmar que constitui um ranking de frequência. */
export function palavrasDoGuia(a: Alfabeto) {
  if (a.id === 'ru') return VOCABULARIO_RUSSO;
  const unicas = new Map<string, { txt: string; pt: string }>();
  for (const bloco of a.blocos) {
    const exemplos = bloco.t === 'palavras' ? bloco.itens : bloco.t === 'cartoes' ? bloco.itens.flatMap((c) => c.exemplo ? [c.exemplo] : []) : [];
    for (const palavra of exemplos) {
      const chave = palavra.txt.normalize('NFD').replace(/\u0301/g, '').toLocaleLowerCase('ru');
      if (!unicas.has(chave)) unicas.set(chave, { txt: palavra.txt, pt: palavra.pt });
    }
  }
  return [...unicas.values()];
}

/** Caminho próprio para não substituir a gravação usada no curso pago. */
export function audioVocabularioRusso(txt: string) {
  let h = 0x811c9dc5;
  for (const c of new TextEncoder().encode(txt.normalize('NFC').replace(/\u0301/g, '').trim())) h = Math.imul(h ^ c, 0x01000193) >>> 0;
  return `/audio/materiais/ru/${h.toString(16).padStart(8, '0')}.mp3`;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const t = (s: string) => esc(limpar(s));

/** HTML simples da página, para o conteúdo pré-renderizado (quem não executa JavaScript e os buscadores). */
export function alfabetoParaHtml(a: Alfabeto): string {
  const p: string[] = [];
  for (const b of a.blocos) {
    if (b.t === "p") p.push(`<p>${t(b.x)}</p>`);
    else if (b.t === "h") p.push(`<h2>${t(b.x)}</h2>`);
    else if (b.t === "h3") p.push(`<h3>${t(b.x)}</h3>`);
    else if (b.t === "lista") p.push(`<ul>${b.itens.map((i) => `<li>${t(i)}</li>`).join("")}</ul>`);
    else if (b.t === "nota") p.push(`<h3>${t(b.titulo)}</h3><p>${t(b.x)}</p>`);
    else if (b.t === "cartoes") p.push(`<ul>${b.itens.map((c) => `<li><strong>${t(c.glifo)}</strong>${c.nome ? ` (${t(c.nome)})` : ""}: ${t(c.som)}.${c.dica ? ` ${t(c.dica)}` : ""}${c.exemplo ? ` Exemplo: <span lang="${a.lang}">${t(c.exemplo.txt)}</span> (${esc(c.exemplo.leitura)}), ${esc(c.exemplo.pt)}.` : ""}</li>`).join("")}</ul>`);
    else if (b.t === "palavras") p.push(`${b.titulo ? `<h3>${t(b.titulo)}</h3>` : ""}<ul>${b.itens.map((w) => `<li><span lang="${a.lang}">${t(w.txt)}</span> (${esc(w.leitura)}): ${esc(w.pt)}</li>`).join("")}</ul>`);
    else if (b.t === "tabela") p.push(`${b.titulo ? `<h3>${t(b.titulo)}</h3>` : ""}<table><thead><tr>${b.cabecalho.map((c) => `<th>${t(c)}</th>`).join("")}</tr></thead><tbody>${b.linhas.map((l) => `<tr>${l.map((c) => `<td>${t(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
  }
  p.push(`<h2>Teste rápido</h2><ol>${a.exercicios.map((e) => `<li>${t(e.enunciado)}${e.txt ? ` <span lang="${a.lang}">${t(e.txt)}</span>` : ""}</li>`).join("")}</ol>`);
  if (a.id === 'ru') p.push(`<h2>200 palavras em russo para o dia a dia</h2><p>Uma seleção de palavras úteis com tradução em português.</p><ul>${palavrasDoGuia(a).map((w) => `<li><span lang="ru">${t(w.txt)}</span> — ${esc(w.pt)}</li>`).join('')}</ul>`);
  return p.join("");
}

export const minutosTotais = () => ALFABETOS.reduce((s, a) => s + a.minutos, 0);
