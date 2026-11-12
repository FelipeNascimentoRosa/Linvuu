import { perfilAtual } from '../i18n/locales.ts';
/** E-mail de contato por domínio: o .com.br (e o APK) atende em contato@linvuu.com.br; o .com em contato@linvuu.com. Função, porque o perfil é decidido por requisição no servidor. */
export const emailOficial = (): string => (perfilAtual() === 'global' ? 'contato@linvuu.com' : 'contato@linvuu.com.br');
export const SITE_URL = 'https://linvuu.com.br';
/** Domínio internacional: inglês na raiz. O .com.br fica com o público brasileiro. O espanhol não é língua de interface. */
export const SITE_GLOBAL_URL = 'https://linvuu.com';
export const NOME_SITE = 'Linvuu';
