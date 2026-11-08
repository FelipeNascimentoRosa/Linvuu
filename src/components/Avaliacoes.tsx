import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { carregarAuth } from '../lib/firebase';
import { api } from '../lib/api';
import { AULAS_MIN, NOTA_MAX, TEXTO_MAX, type AvaliacaoPublica, type Relacao } from '../config/avaliacoes';
import { comPrefixo, useT } from '../i18n';
import './avaliacoes.css';

interface Resposta { itens: AvaliacaoPublica[]; total: number; media: number | null; contadas: number }

const Estrelas = ({ n, rotulo }: { n: number; rotulo: string }) => (
  <span className="av-estrelas" role="img" aria-label={rotulo}>{'★'.repeat(n)}<span aria-hidden="true">{'☆'.repeat(NOTA_MAX - n)}</span></span>
);

/** Avaliações de alunos (só as aprovadas) e formulário para quem concluiu as aulas gratuitas. Mesmo componente nos dois domínios. */
export function Avaliacoes() {
  const a = useT().avaliacoes;
  const { usuario } = useAuth();
  const [dados, setDados] = useState<Resposta | null>(null);
  const [nota, setNota] = useState(0);
  const [texto, setTexto] = useState('');
  const [nome, setNome] = useState('');
  const [relacao, setRelacao] = useState<Relacao>('nenhuma');
  const [aceite, setAceite] = useState(false);
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
      const r = await fetch(api('/api/avaliacoes'), { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ nota, texto, nome, relacao, aceite, ref_extra_av: isca }) });
      if (r.status === 204) { setEstado('ok'); return; }
      const j = await r.json().catch(() => ({} as { codigo?: string }));
      setEstado(j.codigo === 'duplicada' ? 'duplicada' : j.codigo === 'poucas-aulas' ? 'poucas' : r.status === 400 ? 'invalido' : 'erro');
    } catch { setEstado('erro'); }
  };

  const itens = dados?.itens ?? [];
  const msg = { ok: a.obrigado, duplicada: a.jaEnviou, poucas: a.fazerAulas(AULAS_MIN), invalido: a.invalido, erro: a.erro } as const;
  return (
    <section className="avaliacoes" aria-label={a.rotulo} id="avaliacoes">
      <p className="av-kicker">{a.kicker}</p>
      <h2>{a.titulo}</h2>
      {dados && dados.media !== null && dados.contadas > 0 && <p className="av-resumo"><Estrelas n={Math.round(dados.media)} rotulo={a.estrelas(Math.round(dados.media))} /> <strong>{a.media(dados.media.toLocaleString(), dados.contadas)}</strong></p>}
      {itens.length === 0 ? <p className="av-vazio">{a.vazio}</p> : (
        <ul className="av-lista">
          {itens.map((i, k) => (
            <li key={`${i.nome}-${i.em}-${k}`} className="av-card">
              <Estrelas n={i.nota} rotulo={a.estrelas(i.nota)} />
              <p className="av-texto">{i.texto}</p>
              <p className="av-autor"><strong>{i.nome}</strong> · {a.aulas(i.aulas)}{i.relacao === 'conhece-professor' && <span className="av-selo">{a.conhece}</span>}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="av-form-caixa">
        <h3>{a.avalie}</h3>
        <p className="av-intro">{a.avalieIntro(AULAS_MIN)}</p>
        {!usuario ? <p><Link to={comPrefixo(`/cadastro?proximo=${encodeURIComponent('/assinatura#avaliacoes')}`)}>{a.entrar}</Link></p> : estado === 'ok' || estado === 'duplicada' ? <p role="status">{msg[estado]}</p> : (
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
