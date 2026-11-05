// Leitura dos capítulos e sumários no navegador (o Vite separa cada capítulo em um arquivo pequeno, baixado só quando alguém abre a página).
import { normalizarNiveis, type CapituloLivro, type ItemSumario } from './livros';

const capitulos = import.meta.glob('../../content/livros/*/cap-0[12].json', { import: 'default' }) as Record<string, () => Promise<CapituloLivro>>;
const sumarios = import.meta.glob('../../content/livros/*/sumario.json', { import: 'default' }) as Record<string, () => Promise<ItemSumario[]>>;

export const carregarCapitulo = async (id: string, n: number): Promise<CapituloLivro | null> => {
  const f = capitulos[`../../content/livros/${id}/cap-${String(n).padStart(2, '0')}.json`];
  // normalizarNiveis: o React emite o mesmo sumário de títulos do HTML pré-renderizado (sem saltos de nível).
  return f ? f().then(normalizarNiveis) : null;
};
export const carregarSumario = async (id: string): Promise<ItemSumario[]> => {
  const f = sumarios[`../../content/livros/${id}/sumario.json`];
  return f ? f() : [];
};
/** Capítulos de amostra existentes para o idioma (ex.: [1, 2]). */
export const capitulosDeAmostra = (id: string): number[] =>
  Object.keys(capitulos).map((k) => k.match(new RegExp(`/livros/${id}/cap-(\\d+)\\.json$`))?.[1]).filter(Boolean).map(Number).sort((a, b) => a - b);
