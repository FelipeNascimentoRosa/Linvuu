/** Lista fechada dos botões que podem ser medidos (lote 6).
 *  Nada de rótulo traduzido, texto livre ou URL: só estes identificadores, iguais nos dois idiomas, aceitos pelo
 *  evento `cta_clicked` e pelo contador do servidor. O mesmo arquivo é lido pelo cliente e por `server/ctas.ts`:
 *  uma lista só, sem cópia que possa divergir. Botão novo entra aqui antes de receber `data-cta`. */
export const CTAS = [
  'home_continuar',
  'home_comecar',
  'home_escolher_idioma',
  'home_curso',
  'home_plano',
  'curso_continuar',
  'curso_comecar',
  'paywall_mensal',
  'paywall_trimestral_pix',
  'paywall_trimestral',
  'paywall_anual',
  'paywall_criar',
  'paywall_entrar',
  'assinatura_mensal',
  'assinatura_trimestral_pix',
  'assinatura_trimestral',
  'assinatura_anual',
  'assinatura_continuar',
  'assinatura_gerenciar',
  'revisao_web',
] as const;
export type Cta = (typeof CTAS)[number];
export const ctaValido = (v: unknown): v is Cta => typeof v === 'string' && (CTAS as readonly string[]).includes(v);
