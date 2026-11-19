/** Esquemas puros do estudo local. Não são autorização nem prova de desempenho. */
export type Pratica={acertos:number;total:number;em:string;versao?:2;assinatura?:string};
export type Tentativa={tipo:'tentativa';versao:1;assinatura:string;indice:number;escolha:string|null;ordem:number[];texto:string;resultado:'ok'|'erro'|'livre'|null;respostas:Record<number,boolean>;finalizada:boolean;em:string};
const objeto=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const inteiro=(v:unknown,max=500)=>Number.isInteger(v)&&Number(v)>=0&&Number(v)<=max;
const data=(v:unknown)=>typeof v==='string'&&Number.isFinite(Date.parse(v));
const assinaturaValida=(v:unknown)=>typeof v==='string'&&/^ex2:[0-9a-f]{32}:\d{1,3}$/.test(v);
export function validarPratica(v:unknown):v is Pratica{return objeto(v)&&inteiro(v.total)&&Number(v.total)>0&&inteiro(v.acertos,Number(v.total))&&data(v.em)&&(v.versao===undefined||(v.versao===2&&assinaturaValida(v.assinatura)));}
export function validarTentativa(v:unknown):v is Tentativa{return objeto(v)&&v.tipo==='tentativa'&&v.versao===1&&assinaturaValida(v.assinatura)&&inteiro(v.indice,499)&&(v.escolha===null||typeof v.escolha==='string'&&v.escolha.length<=8000)&&Array.isArray(v.ordem)&&v.ordem.length<=500&&v.ordem.every(x=>inteiro(x,499))&&new Set(v.ordem).size===v.ordem.length&&typeof v.texto==='string'&&v.texto.length<=8000&&[null,'ok','erro','livre'].includes(v.resultado as null)&&objeto(v.respostas)&&Object.keys(v.respostas).length<=500&&Object.entries(v.respostas).every(([k,r])=>/^(0|[1-9]\d{0,2})$/.test(k)&&Number(k)<500&&typeof r==='boolean')&&typeof v.finalizada==='boolean'&&data(v.em);}
/** Fingerprint determinístico de todo o conteúdo, com quatro acumuladores independentes.
 * Serve para invalidar tentativas após edição; não é um hash de segurança. */
export function assinaturaExercicios(itens:readonly unknown[]):string{
 const texto=JSON.stringify(itens);let a=0x811c9dc5,b=0x9e3779b9,c=0x85ebca6b,d=0xc2b2ae35;
 for(let i=0;i<texto.length;i++){const x=texto.charCodeAt(i);a=Math.imul(a^x,0x01000193);b=Math.imul(b^x,0x85ebca6b);c=Math.imul(c^x,0xc2b2ae35);d=Math.imul(d^x,0x27d4eb2f);}
 return `ex2:${[a,b,c,d].map(x=>(x>>>0).toString(16).padStart(8,'0')).join('')}:${itens.length}`;
}
