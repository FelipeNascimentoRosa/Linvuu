// Plano da Linvuu. Cada aula tem 4 sessões; as 2 primeiras aulas de cada curso são grátis.
// Preços canónicos: docs/PRECOS-DEFINIDOS.md — mudar um valor aqui exige atualizar esse documento no mesmo PR.
export const AULAS_GRATIS = 2;
export const SESSOES_POR_AULA = 4;
export const SESSOES_GRATIS = AULAS_GRATIS * SESSOES_POR_AULA;
export const PRECO_MENSAL = import.meta.env?.VITE_ALVO === 'apk' ? '' : 'R$ 139';
export const gratis = (dia: number) => dia <= SESSOES_GRATIS;
export const PRECO_TRIMESTRAL = import.meta.env?.VITE_ALVO === 'apk' ? '' : 'R$ 417';
export const PRECO_TRIMESTRAL_PIX = import.meta.env?.VITE_ALVO === 'apk' ? '' : 'R$ 291,90'; // 30% de desconto, só no Pix
export const PRECO_ANUAL = import.meta.env?.VITE_ALVO === 'apk' ? '' : 'R$ 999'; // 12 meses, pagamento único
export const PRECO_ANUAL_MES = import.meta.env?.VITE_ALVO === 'apk' ? '' : 'R$ 83,25'; // equivalência mensal do anual (999 / 12); só apresentação, o total continua em destaque
export const PRECO_TRIMESTRAL_PIX_MES = import.meta.env?.VITE_ALVO === 'apk' ? '' : 'R$ 97,30'; // equivalência mensal do trimestral no Pix (291,90 / 3); só apresentação

