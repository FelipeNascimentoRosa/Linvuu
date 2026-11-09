// Login com Google dentro do app Android: o plugin nativo (LinvuuGooglePlugin.java) devolve o ID token do Google,
// e o Firebase Web troca esse token pela sessão. O popup do Firebase não abre dentro do WebView.
import { registerPlugin } from '@capacitor/core';

/** ID do cliente OAuth "Web" do projeto Firebase `linvuu` (público; é o mesmo que o Firebase usa no login com Google). */
export const GOOGLE_WEB_CLIENT_ID = '982052790317-olg307km3igd0e1isqcm3nbj94dnvnh9.apps.googleusercontent.com';

interface LinvuuGoogle { entrar(o: { clientId: string }): Promise<{ idToken: string }>; sair(): Promise<void> }
const nativo = registerPlugin<LinvuuGoogle>('LinvuuGoogle');

export async function idTokenGoogle(): Promise<string> {
  let idToken = '';
  try { ({ idToken } = await nativo.entrar({ clientId: GOOGLE_WEB_CLIENT_ID })); }
  catch (e) {
    // Mesmos códigos de erro do Firebase, para a tela de login mostrar a mensagem no idioma do app.
    const c = (e as { code?: string })?.code;
    throw Object.assign(new Error('google-nativo'), { code: c === 'CANCELADO' ? 'auth/popup-closed-by-user' : `google-nativo/${(c ?? 'falha').toLowerCase()}` });
  }
  if (!idToken) throw new Error('Sem token do Google');
  return idToken;
}
export const sairGoogleNativo = () => nativo.sair().catch(() => undefined);
