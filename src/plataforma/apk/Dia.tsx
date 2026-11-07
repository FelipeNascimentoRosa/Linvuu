import { useAuth } from '../../lib/AuthContext';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Aula, carregarAula, coberturaDoCurso, getCurso, statusDoCurso } from '../../lib/content';
import { useAssinatura } from '../../lib/acesso';
import { gratis } from '../../config/planos';
import { usePageTitle } from '../../lib/usePageTitle';
import { Sessao } from './Sessao';
import { ReportarProblema } from '../../components/ReportarProblema';
import NaoEncontrada from '../../pages/NaoEncontrada';
import DiaLegado from '../../pages/Dia';
import { AcessoLimitado } from './AcessoLimitado';
import { textos } from '../../lib/textos';
import { LOCALE } from '../../i18n';
import { experiencia } from './experiencia';
import { appTextos } from './textos';
export default function Dia(){
 const {id,n}=useParams(),curso=getCurso(id),dia=Number(n),x=experiencia(),a=appTextos(),ass=useAssinatura();
 const {usuario}=useAuth();
 const total=statusDoCurso(id??'')?.total??0;
 const valido=!!curso&&Number.isInteger(dia)&&dia>0&&dia<=total;
 const bloqueado=!gratis(dia)&&!ass.ativa&&!import.meta.env.DEV;
 const decidindo=!gratis(dia)&&ass.carregando&&!import.meta.env.DEV;
 const [aula,setAula]=useState<(Aula&{semTraducao?:string})|null>(null),[erro,setErro]=useState(false),[tentativa,setTentativa]=useState(0);
 useEffect(()=>{
  let vivo=true;setAula(null);setErro(false);
  if(valido&&!bloqueado&&!decidindo&&coberturaDoCurso(curso!.id).traduzidas>0)carregarAula(curso!.id,dia).then(v=>{if(vivo)setAula(v);}).catch(()=>{if(vivo)setErro(true);});
  return ()=>{vivo=false;};
 },[id,dia,valido,bloqueado,decidindo,tentativa]);
 usePageTitle(aula?.titulo,undefined,[]);
 if(!valido)return <NaoEncontrada/>;
 const T=textos(curso!.id);
 if(!coberturaDoCurso(curso!.id).traduzidas)return <div className="pagina"><h1>{curso!.nome}</h1><p>{a.preparacao}</p><Link to="/cursos">{x.explorar}</Link></div>;
 if(aula&&!aula.sessao)return <DiaLegado/>;
 return <div className="pagina app-aula">
  <Link className="app-aula-voltar" to={`/curso/${curso!.id}`}><span aria-hidden="true">← </span>{({'pt-BR':'Percurso de ',en:''} as const)[LOCALE.codigo]}{curso!.nome}{LOCALE.codigo==='en'?' path':''}</Link>
  {decidindo&&<p className="app-carregando" role="status">{T.carregando}</p>}
  {bloqueado&&!decidindo&&<AcessoLimitado idioma={curso!.id} curso={curso!.nome} indisponivel={ass.indisponivel}/>}
  {erro&&<div className="app-erro" role="alert"><h1>{T.semAula}</h1><button type="button" className="btn btn-primary" onClick={()=>setTentativa(v=>v+1)}>{a.tentarNovamente}</button></div>}
  {!aula&&!erro&&!bloqueado&&!decidindo&&<p className="app-carregando" role="status">{T.carregando}</p>}
  {aula?.sessao&&<><header className="app-aula-topo"><p className="app-kicker"><span className="app-aula-insignia" aria-hidden="true">{curso!.id==='br'?'PT':curso!.id.toUpperCase()}</span>{curso!.nome} · {T.rotuloDia(dia)}</p><h1>{aula.aula&&aula.titulo.startsWith(aula.aula.titulo+': ')?aula.titulo.slice(aula.aula.titulo.length+2):aula.titulo}</h1><details><summary>{x.objetivo}</summary><p>{aula.aula?.objetivo??aula.objetivo}</p></details></header>
   {aula.semTraducao&&<p className="nota">{T.semTraducao(aula.semTraducao)}</p>}
   <Sessao key={`${curso!.id}:${dia}:${usuario?.uid??'visitante'}`} compacta nomeIdioma={curso!.nome} explicacao={aula.semTraducao??LOCALE.explicacao} sessao={aula.sessao} idioma={curso!.id} aula={aula.aula?.numero??dia} dia={dia} proximo={dia<total?`/curso/${curso!.id}/dia/${dia+1}`:undefined}/>
   <ReportarProblema key={`${curso!.id}:${dia}`} idioma={curso!.id} dia={dia}/>
  </>}
 </div>;
}
