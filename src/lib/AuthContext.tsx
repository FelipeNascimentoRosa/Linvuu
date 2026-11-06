import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { authConfigurado, carregarAuth } from './firebase';
import { garantirPerfil } from './perfil';
import { comPrefixo } from '../i18n';
import { definirUsuarioProgresso } from './progresso';
import { limparAudioPrivado } from './audio';
import { analytics } from './analytics';

export interface Usuario { uid: string; nome: string; email: string; foto: string | null }

interface Ctx {
  usuario: Usuario | null;
  carregando: boolean;
  configurado: boolean;
  entrarComGoogle: () => Promise<void>;
  entrarComEmail: (email: string, senha: string) => Promise<void>;
  criarConta: (nome: string, email: string, senha: string) => Promise<void>;
  recuperarSenha: (email: string) => Promise<void>;
  sair: () => Promise<void>;
}

const AuthCtx = createContext<Ctx | null>(null);
export const useAuth = () => {
  const c = useContext(AuthCtx);
  if (!c) throw new Error('useAuth fora do AuthProvider');
  return c;
};

const paraUsuario = (u: import('firebase/auth').User): Usuario => ({
  uid: u.uid, nome: u.displayName || (u.email ?? '').split('@')[0], email: u.email ?? '', foto: u.photoURL,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(authConfigurado);
  // Durante o cadastro, o perfil é criado com o nome digitado (e não com o que o Auth tem naquele instante).
  const criandoConta = useRef(false);

  useEffect(() => {
    if (!authConfigurado) return;
    let cancelado = false;
    let parar = () => {};
    carregarAuth().then(({ auth, m }) => {
      if (cancelado) return;
      parar = m.onAuthStateChanged(auth, (u) => {
        definirUsuarioProgresso(u?.uid ?? null);
        limparAudioPrivado();
        setUsuario(u ? paraUsuario(u) : null);
        setCarregando(false);
        // Quem já tinha conta mas ficou sem perfil (ex.: falha de rede no cadastro) ganha o perfil no próximo acesso.
        if (u && !criandoConta.current) void garantirPerfil(u.uid, paraUsuario(u).nome, u.email ?? '');
      });
    }).catch(() => setCarregando(false));
    return () => { cancelado = true; parar(); };
  }, []);

  const valor = useMemo<Ctx>(() => ({
    usuario, carregando, configurado: authConfigurado,
    entrarComGoogle: async () => {
      const { auth, m } = await carregarAuth();
      const r = await m.signInWithPopup(auth, new m.GoogleAuthProvider());
      if (m.getAdditionalUserInfo(r)?.isNewUser) void analytics.capture('signup_completed', { page: 'signup' });
    },
    entrarComEmail: async (email, senha) => {
      const { auth, m } = await carregarAuth();
      await m.signInWithEmailAndPassword(auth, email.trim(), senha);
    },
    criarConta: async (nome, email, senha) => {
      const { auth, m } = await carregarAuth();
      criandoConta.current = true;
      let cred;
      try {
        cred = await m.createUserWithEmailAndPassword(auth, email.trim(), senha);
        if (nome.trim()) await m.updateProfile(cred.user, { displayName: nome.trim() });
      } catch (e) {
        criandoConta.current = false;
        throw e;
      }
      setUsuario(paraUsuario(cred.user));
      void analytics.capture('signup_completed', { page: 'signup' });
      // Em segundo plano: se o Firestore demorar ou recusar, a conta já está criada e o perfil é refeito no próximo login.
      void garantirPerfil(cred.user.uid, paraUsuario(cred.user).nome, cred.user.email ?? email.trim())
        .finally(() => { criandoConta.current = false; });
    },
    recuperarSenha: async (email) => {
      const { auth, m } = await carregarAuth();
      // depois de criar a nova senha, o link do e-mail traz a pessoa de volta para «Entrar», no idioma em que ela estava
      await m.sendPasswordResetEmail(auth, email.trim(), { url: `${window.location.origin}${comPrefixo('/entrar')}` }).catch((e) => {
        // domínio fora da lista autorizada do Firebase: manda o e-mail sem o link de volta
        if ((e as { code?: string })?.code === 'auth/user-not-found') return;
        if (/continue-uri/.test((e as { code?: string })?.code ?? '')) return m.sendPasswordResetEmail(auth, email.trim()).catch((erro) => { if ((erro as { code?: string })?.code !== 'auth/user-not-found') throw erro; });
        throw e;
      });
    },
    sair: async () => {
      const { auth, m } = await carregarAuth();
      await m.signOut(auth);
    },
  }), [usuario, carregando]);

  return <AuthCtx.Provider value={valor}>{children}</AuthCtx.Provider>;
}
