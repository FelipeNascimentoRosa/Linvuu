import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CURSOS_ATIVOS, coberturaDoCurso, IDIOMAS_GRAMATICA } from '../../lib/content';
import { pontoDeRetomada, useDiasFeitos, useRetomadaGeral } from '../../lib/retomar';
import { appTextos } from './textos';
import { OndaDeVoz, IconeEstudo } from './Visuais';
import { experiencia, saudacoes } from './experiencia';
import { LOCALE } from '../../i18n';
import { useAssinatura } from '../../lib/acesso';
import { SESSOES_GRATIS } from '../../config/planos';
import './home-lote2.css';
import { useReforco } from './useReforco';

const detalhes = {
 'pt-BR': { selecao: 'Escolha seu idioma de estudo', passo: 'Próximo passo', marca: 'Boas-vindas à Linvuu', titulo: 'O mundo tem muito a dizer.', texto: 'Entre na conversa.', progresso: 'do percurso concluído', completa: 'Percurso concluído. Continue praticando.', rever: 'Rever o percurso', reverGratis: 'Revisar as sessões gratuitas', fimGratis: 'Você concluiu as sessões gratuitas deste idioma. Reforce o que aprendeu.' },
 en: { selecao: 'Choose your learning language', passo: 'Next step', marca: 'Welcome to Linvuu', titulo: 'The world has so much to say.', texto: 'Join the conversation.', progresso: 'of your path completed', completa: 'Path completed. Keep practising.', rever: 'Review your path', reverGratis: 'Review the free sessions', fimGratis: 'You completed the free sessions in this language. Practise what you learned.' },
 };

export default function Home() {
 const x=experiencia(), a=appTextos(), anterior=useRetomadaGeral(), d=detalhes[LOCALE.codigo];
 const assinatura=useAssinatura();
 const cursos=CURSOS_ATIVOS.filter(c=>coberturaDoCurso(c.id).traduzidas>0);
 const [escolha,setEscolha]=useState(cursos[0]?.id);
 useEffect(()=>{if(anterior && cursos.some(c=>c.id===anterior.idioma))setEscolha(anterior.idioma);},[anterior?.idioma]);
 const curso=cursos.find(c=>c.id===escolha)??cursos[0];
 const feitos=useDiasFeitos(curso?.id);
 const ret=curso?pontoDeRetomada(curso.id):undefined;
 const revisaoGratuita=!!ret && !assinatura.ativa && ret.dia>SESSOES_GRATIS;
 const reforco=useReforco(curso?.id);
 if(!curso||!ret)return <div className="pagina app-home"><h1>{x.hoje}</h1><p>{a.semCursos}</p></div>;
 return <div className="pagina app-home app-dashboard">
  <header className="app-boasvindas"><p className="app-kicker"><span className="app-ponto" aria-hidden="true" />{x.rotina}</p><h1>{x.hoje}<span className="app-ponto-titulo" aria-hidden="true">.</span></h1><p>{x.saudacao}</p></header>
  <p className="app-home-selecao" id="app-home-selecao">{d.selecao}</p>
  <p className="app-idiomas-ajuda" id="app-idiomas-ajuda">{{'pt-BR':'Deslize para ver mais idiomas →',en:'Swipe to see more languages →'}[LOCALE.codigo]}</p>
  <div className="app-idiomas" role="group" aria-labelledby="app-home-selecao" aria-describedby="app-idiomas-ajuda">{cursos.map(c=><button type="button" key={c.id} aria-pressed={c.id===curso.id} onClick={()=>setEscolha(c.id)}><span aria-hidden="true">{c.id==='br'?'PT':c.id.toUpperCase()}</span>{c.nome}</button>)}</div>
  <section className="app-missao" aria-labelledby="app-missao-titulo">
   <div className="app-missao-meta"><span className="app-missao-etiqueta">{x.foco}</span><span>{curso.nome}</span></div>
   <OndaDeVoz /><p className="app-saudacao" lang={curso.id==='br'?'pt-BR':curso.id}>{saudacoes[curso.id]}</p>
   <p className="app-missao-sessao">{revisaoGratuita ? x.revisar : ({'pt-BR':'Sessão',en:'Session'} as const)[LOCALE.codigo]} {revisaoGratuita ? 1 : ret.dia} <span aria-hidden="true">/</span> {ret.total}</p><h2 id="app-missao-titulo">{revisaoGratuita ? d.reverGratis : ret.titulo}</h2>
   {(revisaoGratuita || ret.feitos>=ret.total) && <p className="app-missao-detalhe">{revisaoGratuita ? d.fimGratis : d.completa}</p>}
   <Link className="app-acao-principal" to={revisaoGratuita ? `/curso/${curso.id}/dia/1` : ret.feitos>=ret.total ? `/curso/${curso.id}` : `/curso/${curso.id}/dia/${ret.dia}`}><span aria-hidden="true">▶</span>{revisaoGratuita ? d.reverGratis : ret.feitos>=ret.total ? d.rever : anterior?.idioma===curso.id||feitos.size?x.continuar:x.comecar}<span aria-hidden="true">→</span></Link>
  </section>
  {reforco.itens.length>0&&<section className="app-reforco" aria-labelledby="app-reforco-titulo">
   <p className="app-kicker">{reforco.t.rotulo}</p>
   <h2 id="app-reforco-titulo">{reforco.t.titulo(reforco.total)}</h2>
   <p>{reforco.texto}</p>
   <Link className="btn btn-primary" to={reforco.link!}>{reforco.t.acao}</Link>
  </section>}
  <section className="app-avanco" aria-labelledby="app-avanco-titulo"><div className="app-avanco-topo"><span><span className="app-kicker">{x.resumo}</span><h2 id="app-avanco-titulo">{a.concluidas(ret.feitos,ret.total)}</h2></span></div><progress max={ret.total} value={ret.feitos} aria-label={a.progresso} /><p>{x.sinal}</p>{!reforco.itens.length&&reforco.proxima&&<p className="app-reforco-proxima">{reforco.proxima}</p>}</section>
  <div className="app-ferramentas">
   <Link className="app-atalho app-atalho-percurso" to={`/curso/${curso.id}`}><span className="app-atalho-icone"><IconeEstudo tipo="percurso" /></span><span><strong>{x.percurso}</strong><small>{curso.nome} · {ret.total} {x.sessoes}</small></span><span className="app-seta" aria-hidden="true">↗</span></Link>
   {IDIOMAS_GRAMATICA.includes(curso.id) && <Link className="app-atalho" to={`/gramatica/${curso.id}`}><span className="app-atalho-icone"><IconeEstudo tipo="livro" /></span><span><strong>{x.consultar}</strong><small>{x.apoio}</small></span><span className="app-seta" aria-hidden="true">↗</span></Link>}
  </div>
  <details className="app-home-identidade">
   <summary>{d.marca}<span aria-hidden="true">＋</span></summary>
   <div className="app-home-universo">
    <div className="app-home-marca" aria-hidden="true"><img src="/brand/linvuu-app-monograma.svg" alt="" width="72" height="72" /></div>
    <p className="app-kicker">Linvuu</p><h2>{d.titulo}</h2><p><em>{d.texto}</em></p>
   </div>
  </details>
 </div>;
}
