/** Conteúdo que ainda não existe para o público do domínio. Não transfere o visitante. */
export function indisponivelNoDominio(perfil: 'br' | 'global', caminho: string): boolean {
  const p = caminho.replace(/\/+$/, '') || '/';
  if (/\.[a-z0-9]{2,5}$/i.test(p)) return false;
  if (/^\/es(?:\/|$)/.test(p) || (perfil === 'br' && /^\/en(?:\/|$)/.test(p))) return true;
  if (perfil === 'br') return /^\/(?:curso\/br|gramatica\/br|livros\/br)(?:\/|$)/.test(p) || p === '/portugues' || p === '/brazilian-portuguese';
  return /^\/(?:livros\/(?!br(?:\/|$))[^/]+|materiais-gratuitos\/.+|gramatica\/[a-z]{2}\/[a-z0-9-]+|ex-alunos-udemy|livro\/gramatica-ru|(?:curso|gramatica)\/en)(?:\/|$)/.test(p);
}
