import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { googleAtivo, mensagemDeErro } from '../lib/firebase';
import { emailOficial } from '../config/site';
import { usePageTitle } from '../lib/usePageTitle';
import { useT } from '../i18n';

const GoogleG = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.5 5.8c4.4-4.1 7-10.1 7-17.5z" />
    <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

export default function Conta({ modo }: { modo: 'entrar' | 'cadastro' }) {
  const cadastro = modo === 'cadastro';
  const t = useT();
  const c = t.conta;
  usePageTitle(cadastro ? c.cadastroT : c.entrarT, undefined, [], true);
  const { usuario, configurado, entrarComGoogle, entrarComEmail, criarConta, recuperarSenha } = useAuth();
  const nav = useNavigate();
  const [params] = useSearchParams();
  // Só caminhos internos (evita redirecionar para outro site com ?proximo=//site-falso.com).
  const pedido = params.get('proximo') ?? '';
  const destino = /^\/(?![\/\\])/.test(pedido) ? pedido : '/';
  const emailInput = useRef<HTMLInputElement>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => { if (usuario) nav(destino, { replace: true }); }, [usuario, destino, nav]);

  const executar = async (fn: () => Promise<void>) => {
    setErro(''); setAviso(''); setOcupado(true);
    try { await fn(); } catch (e) { setErro(mensagemDeErro(e)); } finally { setOcupado(false); }
  };
  const enviar = (e: FormEvent) => {
    e.preventDefault();
    executar(() => (cadastro ? criarConta(nome, email, senha) : entrarComEmail(email, senha)));
  };
  const esqueci = () => {
    setAviso('');
    if (!email.trim()) { setErro(c.digiteEmail); emailInput.current?.focus(); return; }
    if (!emailInput.current?.reportValidity()) return;
    executar(async () => { await recuperarSenha(email); setAviso(c.linkEnviado); });
  };
  const outra = cadastro ? '/entrar' : '/cadastro';

  return (
    <div className="conta">
      <div className="conta-card">
        <h1>{cadastro ? c.criarH : c.entrarH}</h1>
        <p className="conta-sub">{cadastro ? c.criarSub : c.entrarSub}</p>

        {!configurado && (
          <p className="conta-aviso" role="status">{c.semLogin}</p>
        )}

        {googleAtivo && (
          <>
            <button type="button" className="btn btn-google" disabled={!configurado || ocupado} onClick={() => executar(entrarComGoogle)}>
              <GoogleG /> {c.google}
            </button>
            <div className="conta-ou"><span>{c.ou}</span></div>
          </>
        )}

        <form onSubmit={enviar} aria-busy={ocupado}>
          {cadastro && (
            <div className="search-field">
              <label htmlFor="c-nome">{c.nome}</label>
              <input id="c-nome" autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} required maxLength={100} disabled={!configurado || ocupado} />
            </div>
          )}
          <div className="search-field">
            <label htmlFor="c-email">{c.email}</label>
            <input id="c-email" ref={emailInput} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={!configurado || ocupado} />
          </div>
          <div className="search-field">
            <label htmlFor="c-senha">{c.senha}</label>
            <input id="c-senha" type="password" autoComplete={cadastro ? 'new-password' : 'current-password'} minLength={6} value={senha} onChange={(e) => setSenha(e.target.value)} required disabled={!configurado || ocupado} />
            {cadastro && <small>{c.minimo}</small>}
          </div>
          {erro && <p className="conta-erro" role="alert">{erro}</p>}
          {aviso && <p className="conta-ok" role="status">{aviso}</p>}
          <button type="submit" className="btn btn-primary btn-cheio" disabled={!configurado || ocupado}>{ocupado ? t.geral.aguarde : cadastro ? c.criarBtn : c.entrarBtn}</button>
          {!cadastro && <button type="button" className="link conta-esqueci" onClick={esqueci} disabled={!configurado || ocupado}>{c.esqueci}</button>}
        </form>

        {cadastro && <p className="conta-aceite">{c.aceite[0]} <Link to="/termos">{c.aceite[1]}</Link> {c.aceite[2]} <Link to="/privacidade">{c.aceite[3]}</Link>.</p>}
        <p className="conta-troca">{cadastro ? c.jaTem : c.naoTem} <Link to={`${outra}${destino !== '/' ? `?proximo=${encodeURIComponent(destino)}` : ''}`}>{cadastro ? c.entrarBtn : c.cadastreGratis}</Link></p>
        <p className="conta-ajuda">{c.ajuda} <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a></p>
      </div>
    </div>
  );
}
