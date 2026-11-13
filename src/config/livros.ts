// Vitrine da Coleção Linvuu (capas dos livros, Volume 1, níveis A1–A2).
// Para cadastrar: gere a capa com scripts/capa.mjs, gere a versão --vitrine 1 e salve em .webp com 600 e 900 px de largura (sufixos -600 e -900) e coloque em public/livros/.
import { livroMeta } from '../lib/livros';

export interface Livro { titulo: string; subtitulo?: string; capa?: string; link?: string; preco?: string }

// Livros com capítulos de amostra abertos (content/livros/<id>/): a capa leva à página do livro; os demais, ao curso.
const livro = (id: string, titulo: string): Livro => ({
  titulo,
  subtitulo: 'Volume 1 · Níveis A1–A2',
  capa: `/livros/${id}-a1-a2-v1-600.webp`,
  link: livroMeta(id) ? `/livros/${id}` : `/curso/${id}`,
});

export const LIVROS: Livro[] = [
  livro('en', 'Inglês'),
  livro('es', 'Espanhol'),
  livro('de', 'Alemão'),
  livro('fr', 'Francês'),
  livro('it', 'Italiano'),
  livro('ru', 'Russo'),
  { ...livro('br', 'Português para estrangeiros'), link: '/curso/br' },
];
