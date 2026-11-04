import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Botao, BotaoLink } from './Button';
import { useAuth } from '../lib/AuthContext';
import { abrir } from '../lib/assinatura';
import { textos } from '../lib/textos';
import { AULAS_GRATIS, PRECO_ANUAL, PRECO_MENSAL, PRECO_TRIMESTRAL, PRECO_TRIMESTRAL_PIX } from '../config/planos';
import type { Plano } from '../lib/assinatura';

export function Paywall({ curso, indisponivel, idioma }: { curso: string; indisponivel?: boolean; idioma?: string }) {
  const T = textos(idioma);
  const { usuario } = useAuth();
  const { pathname } = useLocation(); // caminho sem o prefixo de idioma (/en, /es)
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState('');
  const assinar = async (plano: Plano) => {
    setOcupado(true); setErro('');
    try { await abrir('checkout', plano); } catch (e) { setErro((e as Error).message); setOcupado(false); }
  };
  return (
    <section className="bloqueio-aula" aria-labelledby="pw-t">
      <h2 id="pw-t">{T.paywallT(AULAS_GRATIS, curso)}</h2>
      <p>{T.paywallP(PRECO_MENSAL)}</p>
      {indisponivel && <p className="erro" role="alert">{T.paywallErro}</p>}
      {usuario ? (
        <>
          <div className="lv-hero-botoes">
            <Botao variante="primary" onClick={() => assinar('mensal')} disabled={ocupado}>{ocupado ? T.abrindo : T.assinar(PRECO_MENSAL)}</Botao>
            <Botao variante="primary" onClick={() => assinar('trimestral-pix')} disabled={ocupado}>{T.trimPix(PRECO_TRIMESTRAL_PIX)}</Botao>
          </div>
          <div className="lv-hero-botoes">
            <Botao variante="ghost" onClick={() => assinar('trimestral')} disabled={ocupado}>{T.tres(PRECO_TRIMESTRAL)}</Botao>
            <Botao variante="ghost" onClick={() => assinar('anual')} disabled={ocupado}>{T.anual(PRECO_ANUAL)}</Botao>
          </div>
        </>
      ) : (
        <div className="lv-hero-botoes">
          <BotaoLink to={`/cadastro?proximo=${encodeURIComponent(pathname)}`} variante="primary">{T.criar}</BotaoLink>
          <BotaoLink to={`/entrar?proximo=${encodeURIComponent(pathname)}`} variante="ghost">{T.jaTenho}</BotaoLink>
        </div>
      )}
      {erro && <p className="erro" role="alert">{erro}</p>}
      <p className="nota"><Link to="/termos">{T.termos}</Link></p>
    </section>
  );
}
