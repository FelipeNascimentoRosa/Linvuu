// Botão de exclusão de conta dentro do app e do site, para quem está logado (dois toques, sem janela do sistema).
// Sem login, a pessoa continua com o pedido por e-mail da própria página.
import { useState } from 'react';
import { LOCALE } from '../i18n';
import { useAuth } from '../lib/AuthContext';
import { pedirExclusaoDaConta } from '../lib/pedirExclusao';

const T = {
  'pt-BR': { titulo: 'Excluir minha conta agora', texto: 'Com a sua conta aberta, o pedido é enviado daqui, sem e-mail. O acesso é desativado imediatamente.', botao: 'Excluir minha conta', confirmar: 'Sim, excluir minha conta', cancelar: 'Cancelar', aviso: 'Isso encerra o seu acesso. Os dados da conta são apagados de vez depois de 6 meses de conservação legal, como descrito nesta página.', ocupado: 'Enviando o pedido…', feito: 'Pedido recebido. Seu acesso foi desativado e os dados serão apagados definitivamente depois de 6 meses.', erro: 'Não foi possível enviar o pedido agora. Tente de novo ou use o e-mail abaixo.', semLogin: 'Sua sessão expirou. Entre de novo para pedir a exclusão, ou use o e-mail abaixo.' },
  en: { titulo: 'Delete my account now', texto: 'While you are signed in, the request is sent from here, with no email. Access is turned off immediately.', botao: 'Delete my account', confirmar: 'Yes, delete my account', cancelar: 'Cancel', aviso: 'This ends your access. Account data is permanently erased after a 6-month legal retention period, as described on this page.', ocupado: 'Sending the request…', feito: 'Request received. Your access is turned off and your data will be permanently erased after 6 months.', erro: 'We could not send the request now. Try again or use the email below.', semLogin: 'Your session expired. Sign in again to request deletion, or use the email below.' },
} as const;

type Etapa = 'inicio' | 'confirmar' | 'ocupado' | 'feito' | 'erro' | 'sem-login';

export function ExclusaoDireta({ origem }: { origem: 'app' | 'site' }) {
  const t = T[LOCALE.codigo], { usuario } = useAuth();
  const [etapa, setEtapa] = useState<Etapa>('inicio');
  if (!usuario && etapa !== 'feito') return null;
  const enviar = async () => {
    setEtapa('ocupado');
    const r = await pedirExclusaoDaConta(origem);
    setEtapa(r === 'ok' ? 'feito' : r === 'sem-login' ? 'sem-login' : 'erro');
  };
  const msg = etapa === 'feito' ? t.feito : etapa === 'erro' ? t.erro : etapa === 'sem-login' ? t.semLogin : etapa === 'ocupado' ? t.ocupado : '';
  return (
    <div className="exclusao-direta" role="group" aria-labelledby="exclusao-direta-titulo">
      <h3 id="exclusao-direta-titulo">{t.titulo}</h3>
      {etapa !== 'feito' && <p>{t.texto}</p>}
      {(etapa === 'inicio' || etapa === 'erro' || etapa === 'sem-login') && <button type="button" className="btn btn-ghost" onClick={() => setEtapa('confirmar')}>{t.botao}</button>}
      {etapa === 'confirmar' && <><p>{t.aviso}</p><button type="button" className="btn btn-primary" onClick={() => void enviar()}>{t.confirmar}</button> <button type="button" className="btn btn-ghost" onClick={() => setEtapa('inicio')}>{t.cancelar}</button></>}
      <p role="status" aria-live="polite">{msg}</p>
    </div>
  );
}
