import { ehCloudflare, ipDoVisitante } from '../server/seguranca';
const t=(n:string,ok:boolean)=>{console.log(ok?'ok   ':'FALHA',n); if(!ok) process.exitCode=1;};
t('cf 172.69.1.1',ehCloudflare('172.69.1.1')); t('cf 104.16.5.5',ehCloudflare('104.16.5.5')); t('cf v6',ehCloudflare('2606:4700:10::1'));
t('não cf 8.8.8.8',!ehCloudflare('8.8.8.8')); t('não cf 104.32.0.1',!ehCloudflare('104.32.0.1')); t('mapeado',ehCloudflare('::ffff:172.64.0.9'));
const r=(ip:string,h?:string)=>({ip,headers:h?{'cf-connecting-ip':h}:{}} as any);
t('usa CF-Connecting-IP vindo da borda',ipDoVisitante(r('172.69.1.1','200.1.2.3'))==='200.1.2.3');
t('ignora cabeçalho forjado',ipDoVisitante(r('8.8.8.8','200.1.2.3'))==='8.8.8.8');
t('sem cabeçalho usa req.ip',ipDoVisitante(r('172.69.1.1'))==='172.69.1.1');
t('cabeçalho inválido ignorado',ipDoVisitante(r('172.69.1.1','x y'))==='172.69.1.1');

// Vercel: a função só recebe pedidos pela edge; o IP de quem se ligou à edge vem em
// x-vercel-forwarded-for. Sem isto, o peer seria sempre a edge e o limite por IP
// deixava de distinguir visitantes.
process.env.VERCEL = '1';
const rv=(vf?:string,cf?:string,real?:string,ip?:string)=>({ip:ip??'',headers:{...(vf?{'x-vercel-forwarded-for':vf}:{}),...(cf?{'cf-connecting-ip':cf}:{}),...(real?{'x-real-ip':real}:{})}} as any);
t('vercel sem proxy: IP do visitante',ipDoVisitante(rv('200.1.2.3'))==='200.1.2.3');
t('vercel com proxy: CF-Connecting-IP vindo da borda',ipDoVisitante(rv('172.69.1.1','200.1.2.3'))==='200.1.2.3');
t('vercel com proxy: CF forjado ignorado',ipDoVisitante(rv('8.8.8.8','200.1.2.3'))==='8.8.8.8');
t('vercel: x-real-ip quando não há CF',ipDoVisitante(rv(undefined,undefined,'200.1.2.3','10.0.0.1'))==='200.1.2.3');
t('vercel: primeiro valor do x-vercel-forwarded-for',ipDoVisitante(rv('200.1.2.3, 10.0.0.2'))==='200.1.2.3');
delete process.env.VERCEL;
