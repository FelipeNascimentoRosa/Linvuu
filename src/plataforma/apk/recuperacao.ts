/** Journal exclusivo do APK. Revisões ordenam cópias; null registra exclusão. */
import { validarPratica, validarTentativa } from '../../lib/revisao/estudoModelo';
import { validarRevisao } from '../../lib/revisao/revisaoModelo';
import { validarEspacado } from '../../lib/revisao/espacadoModelo';
export const CHAVE_JOURNAL = 'linvuu:armazenamento:v2';
export const chavePersistente = (k: string) => k.length <= 512 && (/^linvuu:(progresso:v1|progresso-pendente:v1|dias-concluidos:v1)(:uid:[^:]+)?$/.test(k) || /^linvuu:pratica-apk:v1:[^:]+:.+$/.test(k) || /^linvuu:(tema-app|leitura-app|sons|locale)$/.test(k));
export interface Entrada { revisao: number; valor: string | null; pendente?: boolean }
export interface Journal { versao: 2; contador: number; entradas: Record<string, Entrada> }
export const vazio = (): Journal => ({ versao: 2, contador: 0, entradas: Object.create(null) });
const objeto = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const data = (v: unknown) => typeof v === 'string' && Number.isFinite(Date.parse(v));
/** Não cria esquemas novos para o conteúdo: valida os formatos que os leitores já usam. */
export function valorValido(k: string, raw: string | null): boolean {
 if (!chavePersistente(k)) return false;
 if (raw === null) return true;
 try {
  if (k.includes('dias-concluidos:')) { const v=JSON.parse(raw); return Array.isArray(v)&&v.every(x=>typeof x==='string'&&/^[a-z]{2,3}:[1-9]\d*$/.test(x)); }
  if (k.includes('progresso-pendente:')) { const v=JSON.parse(raw); return objeto(v)&&Object.entries(v).every(([id,p])=>/^[a-z]{2,3}:[1-9]\d*$/.test(id)&&objeto(p)&&typeof p.feito==='boolean'&&typeof p.versao==='string'); }
  if (k.includes('pratica-apk:')) { const p=JSON.parse(raw);return k.endsWith(':revisao-erros') ? validarRevisao(p) : k.endsWith(':espacado') ? validarEspacado(p) : k.endsWith(':tentativa') ? validarTentativa(p) : validarPratica(p); }
  if (k.includes('progresso:')) { const v=JSON.parse(raw);return objeto(v)&&Object.entries(v).every(([id,p])=>/^[a-z]{2,3}:[1-9]\d*:.+$/.test(id)&&objeto(p)&&Number.isInteger(p.bloco)&&Number(p.bloco)>=0&&typeof p.completa==='boolean'&&data(p.em)); }
  return raw.length <= 512; // preferências: formatos textuais existentes
 } catch { return false; }
}
export function lerJournal(raw: string | null): Journal | null {
 if (raw===null) return null;
 try {
  const v=JSON.parse(raw);
  if(!objeto(v)||v.versao!==2||!Number.isSafeInteger(v.contador)||Number(v.contador)<0||!objeto(v.entradas))return null;
  const j=vazio();j.contador=Number(v.contador);
  for(const [k,e] of Object.entries(v.entradas)) {
   if(!objeto(e)||!Number.isSafeInteger(e.revisao)||Number(e.revisao)<0||Number(e.revisao)>j.contador||!(e.valor===null||typeof e.valor==='string')||!valorValido(k,e.valor))return null;
   j.entradas[k]={revisao:Number(e.revisao),valor:e.valor,pendente:e.pendente===true};
  }
  return j;
 }catch{return null;}
}
export function serializar(j: Journal, nativo=false) {
 const entradas=Object.fromEntries(Object.entries(j.entradas).map(([k,e])=>[k,nativo?{revisao:e.revisao,valor:e.valor}:e]));
 const raw=JSON.stringify({...j,entradas});
 if(raw.length>900_000)throw Error('journal-excede-limite');
 return raw;
}
export function alterar(j: Journal,k: string,v: string|null) {
 if(!valorValido(k,v)||j.contador>=Number.MAX_SAFE_INTEGER-100000)throw Error('progresso-invalido');
 return {...j,contador:j.contador+1,entradas:{...j.entradas,[k]:{revisao:j.contador+1,valor:v,pendente:true}}} satisfies Journal;
}
/** Pendência local é uma intenção ainda não confirmada; nunca unir listas cegamente. */
export function reconciliar(local: Journal, remoto: Journal): Journal {
 const j=vazio();j.contador=Math.max(local.contador,remoto.contador);
 if(j.contador>=Number.MAX_SAFE_INTEGER-100000)throw Error('revisao-invalida');
 for(const k of new Set([...Object.keys(local.entradas),...Object.keys(remoto.entradas)])) {
  const l=local.entradas[k],r=remoto.entradas[k];
  if(l?.pendente)j.entradas[k]={...l,revisao:++j.contador};
  else j.entradas[k]={...(!l?r:!r||l.revisao>=r.revisao?l:r)};
 }
 return j;
}
