import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { carregarAuth } from '../lib/firebase';
import { api } from '../lib/api';
import { AULAS_RUSSO } from '../config/aulas-russo';
import { AULAS_MIN, NOTA_MAX, TEXTO_MAX, type AvaliacaoPublica, type Relacao } from '../config/avaliacoes';
import { comPrefixo, useT } from '../i18n';
import './avaliacoes.css';

interface Resposta { itens: AvaliacaoPublica[]; total: number; media: number | null; contadas: number }

const iniciais = (nome: string) => nome.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('');

const Estrelas = ({ n, rotulo }: { n: number; rotulo: string }) => (
  <span className="av-estrelas" role="img" aria-label={rotulo}>{'★'.repeat(n)}<span aria-hidden="true">{'☆'.repeat(NOTA_MAX - n)}</span></span>
);

/** Avaliações de alunos (só as aprovadas) e formulário para quem concluiu as aulas gratuitas. Mesmo componente nos dois domínios. */
export function Avaliacoes() {
  const a = useT().avaliacoes;
  const { usuario } = useAuth();
  const { pathname } = useLocation();
  const [dados, setDados] = useState<Resposta | null>(null);
  const [nota, setNota] = useState(0);
  const [texto, setTexto] = useState('');
  const [nome, setNome] = useState('');
  const [relacao, setRelacao] = useState<Relacao>('nenhuma');
  const [aceite, setAceite] = useState(false);
  const [comFoto, setComFoto] = useState(true);
  const [isca, setIsca] = useState('');
  const [estado, setEstado] = useState<'livre' | 'enviando' | 'ok' | 'duplicada' | 'poucas' | 'invalido' | 'erro'>('livre');

  useEffect(() => {
    let vivo = true;
    fetch(api('/api/avaliacoes')).then((r) => (r.ok ? r.json() : null)).then((j) => { if (vivo && j) setDados(j as Resposta); }).catch(() => undefined);
    return () => { vivo = false; };
  }, []);
  useEffect(() => { if (usuario && !nome) setNome(usuario.nome); }, [usuario, nome]);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setEstado('enviando');
    try {
      const { auth } = await carregarAuth();
      const token = await auth.currentUser?.getIdToken();
      const r = await fetch(api('/api/avaliacoes'), { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ nota, texto, nome, relacao, aceite, foto: !!usuario?.foto && comFoto, ref_extra_av: isca }) });
      if (r.status === 204) { setEstado('ok'); return; }
      const j = await r.json().catch(() => ({} as { codigo?: string }));
      setEstado(j.codigo === 'duplicada' ? 'duplicada' : j.codigo === 'poucas-aulas' ? 'poucas' : r.status === 400 ? 'invalido' : 'erro');
    } catch { setEstado('erro'); }
  };

  const itens = dados?.itens ?? [];
  // Sem avaliação aprovada na Linvuu, a prova vem de avaliações reais da Udemy (só em português, idioma original, com a fonte escrita).
  const udemy = a.udemy ? AULAS_RUSSO['pt-BR'] : null;
  const relatos = itens.length === 0 && udemy?.relatos ? udemy.relatos : [];
  const temLista = itens.length > 0 || relatos.length > 0;
  const msg = { ok: a.obrigado, duplicada: a.jaEnviou, poucas: a.fazerAulas(AULAS_MIN), invalido: a.invalido, erro: a.erro } as const;
  return (
    <section className="avaliacoes" aria-label={a.rotulo} id="avaliacoes">
      {temLista && <><p className="av-kicker">{a.kicker}</p><h2>{relatos.length > 0 ? udemy!.relatosTitulo : a.titulo}</h2></>}
      {dados && dados.media !== null && dados.contadas > 0 && <p className="av-resumo"><Estrelas n={Math.round(dados.media)} rotulo={a.estrelas(Math.round(dados.media))} /> <strong>{a.media(dados.media.toLocaleString(), dados.contadas)}</strong></p>}
      {relatos.length > 0 && (
        <>
          <ul className="av-lista">
            {relatos.map((r) => (
              <li key={r.nome} className="av-card">
                <Estrelas n={NOTA_MAX} rotulo={a.estrelas(NOTA_MAX)} />
                <p className="av-texto">“{r.texto}”</p>
                <p className="av-autor"><strong>{r.nome}</strong></p>
              </li>
            ))}
          </ul>
          <p className="av-fonte"><small>{udemy!.relatosFonte}</small></p>
        </>
      )}
      {itens.length > 0 && (
        <ul className="av-lista">
          {itens.map((i, k) => (
            <li key={`${i.nome}-${i.em}-${k}`} className="av-card">
              <div className="av-topo">
                {i.foto ? <img className="av-foto" src={i.foto} alt="" width="48" height="48" loading="lazy" referrerPolicy="no-referrer" /> : <span className="av-foto av-iniciais" aria-hidden="true">{iniciais(i.nome)}</span>}
                <div><p className="av-autor"><strong>{i.nome}</strong></p><p className="av-meta">{a.aulas(i.aulas)}{i.relacao === 'conhece-professor' && <span className="av-selo">{a.conhece}</span>}</p></div>
              </div>
              <Estrelas n={i.nota} rotulo={a.estrelas(i.nota)} />
              <p className="av-texto">{i.texto}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="av-form-caixa">
        {temLista ? <h3>{a.avalie}</h3> : <h2>{a.avalie}</h2>}
        <p className="av-intro">{a.avalieIntro(AULAS_MIN)}</p>
        {!usuario ? <p><Link className="btn btn-primary" to={comPrefixo(`/entrar?proximo=${encodeURIComponent(`${pathname}#avaliacoes`)}`)}>{a.entrar}</Link></p> : estado === 'ok' || estado === 'duplicada' ? <p role="status">{msg[estado]}</p> : (
          <form onSubmit={enviar} className="av-form">
            <fieldset className="av-nota"><legend>{a.campoNota}</legend>
              {Array.from({ length: NOTA_MAX }, (_, k) => k + 1).map((n) => (
                <label key={n} className={nota >= n ? 'on' : ''}><input type="radio" name="nota" value={n} checked={nota === n} onChange={() => setNota(n)} required /><span aria-hidden="true">★</span><span className="sr-only">{a.estrelas(n)}</span></label>
              ))}
            </fieldset>
            <label>{a.campoTexto}<textarea value={texto} onChange={(e) => setTexto(e.target.value)} minLength={20} maxLength={TEXTO_MAX} rows={4} required /></label>
            <label>{a.campoNome}<input type="text" value={nome} onChange={(e) => setNome(e.target.value)} minLength={2} maxLength={60} required /></label>
            <fieldset className="av-relacao"><legend>{a.campoRelacao}</legend>
              <label><input type="radio" name="relacao" checked={relacao === 'nenhuma'} onChange={() => setRelacao('nenhuma')} /> {a.relNenhuma}</label>
              <label><input type="radio" name="relacao" checked={relacao === 'conhece-professor'} onChange={() => setRelacao('conhece-professor')} /> {a.relConhece}</label>
            </fieldset>
            {usuario?.foto && <label className="av-aceite av-com-foto"><input type="checkbox" checked={comFoto} onChange={(e) => setComFoto(e.target.checked)} /> <img className="av-foto" src={usuario.foto} alt="" width="32" height="32" referrerPolicy="no-referrer" /> {a.foto}</label>}
            <label className="av-aceite"><input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} required /> {a.aceite}</label>
            <input type="text" name="ref_extra_av" value={isca} onChange={(e) => setIsca(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="av-isca" />
            {estado !== 'livre' && estado !== 'enviando' && <p className="erro" role="alert">{msg[estado]}</p>}
            <button type="submit" className="btn btn-primary" disabled={estado === 'enviando' || nota < 1 || !aceite}>{estado === 'enviando' ? a.enviando : a.enviar}</button>
          </form>
        )}
      </div>
    </section>
  );
}
