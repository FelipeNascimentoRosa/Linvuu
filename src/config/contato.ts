// Canais de contato da Linvuu. Os ícones do rodapé e a página /contato leem tudo daqui.
// Para ativar o WhatsApp, preencha só WHATSAPP_NUMERO (dígitos, com país e DDD, sem + nem espaços: 5511999999999).
// Para ter um ícone de LinkedIn da empresa, preencha LINKEDIN_EMPRESA; sem ele, o ícone leva à página /contato,
// onde estão os perfis dos dois autores.
import { emailOficial, SITE_URL, SITE_GLOBAL_URL } from './site.ts';

export const WHATSAPP_NUMERO = '5512996332770';
export const WHATSAPP_MENSAGEM = 'Olá! Vim pelo site da Linvuu e queria tirar uma dúvida.';
export const WHATSAPP_MENSAGEM_EN = 'Hello! I came from the Linvuu website and I have a question.';
export const LINKEDIN_EMPRESA = '';

export type IdContato = 'site' | 'email' | 'whatsapp' | 'linkedin';
export interface Contato { id: IdContato; nome: string; rotulo: string; href: string; externo: boolean }

export const whatsappUrl = (mensagem: string = WHATSAPP_MENSAGEM): string => (WHATSAPP_NUMERO ? `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}` : '');

/** Só entram os canais que existem de verdade: nada de ícone que leva a lugar nenhum.
 *  Os rótulos seguem o idioma do domínio: no `.com` nada de «Falar pelo WhatsApp» em português. */
export function contatos(codigo: 'pt-BR' | 'en' = 'pt-BR'): Contato[] {
  const en = codigo === 'en';
  const lista: Contato[] = [
    // Cada domínio aponta para si mesmo (D2: o .com mostrava linvuu.com.br como «Website»).
    { id: 'site', nome: en ? 'Website' : 'Site', rotulo: (en ? SITE_GLOBAL_URL : SITE_URL).replace('https://', ''), href: en ? SITE_GLOBAL_URL : SITE_URL, externo: false },
    { id: 'email', nome: 'E-mail', rotulo: emailOficial(), href: `mailto:${emailOficial()}`, externo: false },
  ];
  if (WHATSAPP_NUMERO) lista.push({ id: 'whatsapp', nome: 'WhatsApp', rotulo: en ? 'Message on WhatsApp' : 'Falar pelo WhatsApp', href: whatsappUrl(en ? WHATSAPP_MENSAGEM_EN : WHATSAPP_MENSAGEM), externo: true });
  lista.push(LINKEDIN_EMPRESA
    ? { id: 'linkedin', nome: 'LinkedIn', rotulo: en ? 'Linvuu on LinkedIn' : 'Linvuu no LinkedIn', href: LINKEDIN_EMPRESA, externo: true }
    : { id: 'linkedin', nome: 'LinkedIn', rotulo: en ? 'Authors’ profiles' : 'Perfis dos autores', href: '/contato#linkedin', externo: false });
  return lista;
}
