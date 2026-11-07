import { useReforco } from './useReforco';
import { LOCALE } from '../../i18n';
import { gratis } from '../../config/planos';
import { useAssinatura } from '../../lib/acesso';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DIAS, coberturaDoCurso, diaDoCurso, getCurso, gruposDoCurso, NIVEL_LABEL, statusDoCurso } from '../../lib/content';
import { pontoDeRetomada, useDiasFeitos } from '../../lib/retomar';
import { usePageTitle } from '../../lib/usePageTitle';
import NaoEncontrada from '../../pages/NaoEncontrada';
import { appTextos } from './textos';
import { experiencia, saudacoes } from './experiencia';
export default function Curso(){
 const {id}=useParams(),curso=getCurso(id),x=experiencia(),a=appTextos();
 const assinatura=useAssinatura();
 const reforco=useReforco(curso?.id);
 const feitos=useDiasFeitos(curso?.id),[limite,setLimite]=useState(8);
 const ret=curso?pontoDeRetomada(curso.id):undefined;
 const grupos=curso?gruposDoCurso(curso.id):[];
 const grupoAtual=grupos.findIndex(g=>ret && ret.dia>=g.dias[0]&&ret.dia<=g.dias[1]);
 useEffect(()=>setLimite(Math.max(8,grupoAtual+2)),[id,grupoAtual]);
 usePageTitle(curso?.nome);
 if(!curso||!ret)return <NaoEncontrada/>;
 const cob=coberturaDoCurso(curso.id),stats=statusDoCurso(curso.id);
 if(!cob.traduzidas)return <div className="pagina app-percurso"><h1>{curso.nome}</h1><p>{a.preparacao}</p><Link className="btn" to="/cursos">{x.explorar}</Link></div>;
 return <div className="pagina app-percurso">
  <header className="app-percurso-topo"><p className="app-kicker">{x.percurso}</p><div className="app-percurso-nome"><h1>{curso.nome}</h1><span className="app-percurso-selo" aria-hidden="true">{curso.id==='br'?'PT':curso.id.toUpperCase()}</span></div><p className="app-percurso-saudacao" lang={curso.id==='br'?'pt-BR':curso.id}>{saudacoes[curso.id]}</p><p>{a.concluidas(ret.feitos,ret.total)}</p><progress max={ret.total} value={ret.feitos} aria-label={a.progresso}/>{!gratis(ret.dia)&&!assinatura.ativa ? <Link className="btn btn-primary" to={reforco.link ?? `/curso/${curso.id}/dia/1`}>{reforco.itens[0] ? reforco.t.acao : ({'pt-BR':'Revisar as sessões gratuitas',en:'Review the free sessions',es:'Repasar las sesiones gratuitas'} as const)[LOCALE.codigo]} →</Link> : <Link className="btn btn-primary" to={`/curso/${curso.id}/dia/${ret.dia}`}>{feitos.size?x.continuar:x.comecar} →</Link>}</header>
  {cob.traduzidas<cob.total&&<p className="nota">{a.cobertura(cob.traduzidas,cob.total)}</p>}
  <div className="app-mapa-cabecalho"><h2>{x.mapa}</h2><span>{grupos.length} {({ 'pt-BR':'unidades', en:'units'} as const)[LOCALE.codigo]}</span></div>
  <div className="app-unidades">{grupos.slice(0,limite).map((g,i)=>{
   const dias=Array.from({length:g.dias[1]-g.dias[0]+1},(_,k)=>g.dias[0]+k),n=dias.filter(d=>feitos.has(d)).length;
   return <details key={g.aula} className={`app-unidade ${i===grupoAtual?'app-unidade-atual':''}`} open={i===grupoAtual}><summary><span className="app-unidade-num" aria-hidden="true">{n===dias.length?'✓':g.aula}</span><span><small>{x.unidade} {g.aula} · {NIVEL_LABEL[g.nivel??'a1']??g.nivel}</small><strong>{g.titulo}</strong><small>{i===grupoAtual?x.atual:`${n}/${dias.length} ${x.concluidas}`}</small></span><span aria-hidden="true">⌄</span></summary><ol className="app-sessoes">{dias.map(d=>{
    const incluida=gratis(d)||assinatura.ativa; const publicada=stats?.status[d-1]==='publicada';const tituloCompleto=diaDoCurso(curso.id,DIAS[d-1]??{dia:d,fase:1,nivel:'a1',titulo:'',objetivo:''}).titulo; const titulo=tituloCompleto.startsWith(g.titulo+': ')?tituloCompleto.slice(g.titulo.length+2):tituloCompleto;
    return <li key={d}>{publicada&&incluida?<Link to={`/curso/${curso.id}/dia/${d}`} aria-current={d===ret.dia?'step':undefined}><span className="app-sessao-num" aria-hidden="true">{feitos.has(d)?'✓':d}</span><span><strong>{titulo}</strong><small>{feitos.has(d)?x.revisar:d===ret.dia?x.atual:x.disponivel}</small></span><span aria-hidden="true">{feitos.has(d)?'↻':'→'}</span></Link>:<div className="app-sessao-pendente"><span>{d}</span><span>{titulo}<small>{publicada ? x.incluida : x.preparar}</small></span></div>}</li>;
   })}</ol></details>;
  })}</div>
  {limite<grupos.length&&<button type="button" className="btn btn-ghost app-ver-mais" onClick={()=>setLimite(n=>n+8)}>{x.verMais}</button>}
 </div>;
}
