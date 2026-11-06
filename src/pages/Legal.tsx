import { BotaoPreferencias } from '../components/AnalyticsConsent';
import { APK } from '../plataforma';
import { Link } from 'react-router-dom';
import { Navegacao } from '../components/Navegacao';
import { usePageTitle } from '../lib/usePageTitle';
import { EMAIL_OFICIAL } from '../config/site';
import { PRECO_ANUAL, PRECO_MENSAL, PRECO_TRIMESTRAL, PRECO_TRIMESTRAL_PIX } from '../config/planos';
import { LOCALE, urlEm, useT } from '../i18n';

const ATUALIZADO = '21 de outubro de 2026';

function PrivacidadePt() {
  return (
    <>
      <h1 className="pagina-h1">Política de privacidade</h1>
      <p className="resultado">Última atualização: {ATUALIZADO}</p>
      <div className="texto-legal">
        <p>Esta política explica quais dados a Linvuu coleta, para quê, e quais são os seus direitos, conforme a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018). Contato do responsável: <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
        <h2>Quais dados coletamos</h2>
        <ul>
          <li><strong>Conta:</strong> nome, e-mail e senha. A senha é guardada pelo serviço de autenticação do Google (Firebase Authentication); a Linvuu não tem acesso a ela em texto.</li>
          <li><strong>Progresso:</strong> sessões concluídas, guardadas na sua conta. Parte do progresso também fica salva no seu navegador.</li>
          <li><strong>Newsletter:</strong> o e-mail que você informar, somente se você marcar a caixa de consentimento.</li>
          <li><strong>Pagamento:</strong> se você assinar, os dados do cartão são digitados direto no Stripe, que processa o pagamento. A Linvuu não vê nem guarda o número do cartão; guardamos apenas o vínculo entre a sua conta e a assinatura (identificador do cliente no Stripe) e o status dela.</li>
          <li><strong>Dados técnicos:</strong> registros do servidor (como endereço IP e tipo de navegador), necessários para o site funcionar e se manter seguro.</li>
        </ul>
        <p>Com sua autorização separada nas Preferências de análise, usamos PostHog para medir navegação, início de aulas e conclusões. Um identificador aleatório fica neste aparelho; não o vinculamos à conta nem enviamos nome, e-mail, respostas, URLs completas ou dados de pagamento. Gravações de tela estão desligadas. Os eventos são processados pelo PostHog Cloud, podendo haver transferência internacional. Você pode recusar ou retirar a autorização nas Preferências de análise; isso interrompe novos envios e remove o identificador local, mas não apaga automaticamente eventos já recebidos. Para solicitar exclusão, contate-nos antes de retirar a autorização para permitir a localização do identificador.</p>
        <p><BotaoPreferencias /></p>
        <p><strong>Publicidade opcional:</strong> com sua autorização específica nas Preferências de publicidade, usamos os pixels da Meta e do TikTok para medir visitas a páginas selecionadas, interações de sessão e inícios de checkout e criar públicos para anúncios. As empresas podem receber endereço da página, dados técnicos e cookies; a Meta também pode receber detalhes da página ou de produtos, conforme suas políticas, inclusive com transferência internacional. Você pode recusar ou retirar essa autorização nas preferências do site; isso interrompe novos eventos, mas não elimina automaticamente dados já recebidos pelas plataformas.</p>
        <p><strong>Medição do aprendizado (opcional):</strong> se você aceitar o aviso que aparece nos exercícios, guardamos um identificador aleatório neste navegador e registramos, nos nossos servidores, quais exercícios você acertou ou errou e quando concluiu uma sessão. Não registramos nome, e-mail nem as suas respostas, e esse identificador não é ligado à sua conta. Usamos só para melhorar as aulas e saber se os alunos evoluem. Se recusar, nada é registrado. Para parar ou apagar, escreva para o contato abaixo informando o dia aproximado de uso; sem o identificador não conseguimos localizar os seus registros, por isso, ao recusar, o identificador é apagado do navegador.</p>
        <h2>Para que usamos</h2>
        <ul>
          <li>Criar e manter a sua conta, salvar o seu progresso e processar a sua assinatura (execução do serviço que você pediu).</li>
          <li>Enviar novidades da Linvuu (consentimento; você pode cancelar a qualquer momento).</li>
          <li>Proteger o site contra abuso e corrigir falhas (legítimo interesse).</li>
        </ul>
        <h2>Com quem compartilhamos</h2>
        <p>Usamos fornecedores para operar o site: Google (Firebase: autenticação e banco de dados), Stripe (pagamentos) e o provedor de hospedagem do site (Render). Eles tratam os dados em nosso nome. Não vendemos os seus dados.</p>
        <p>O áudio das aulas vem de arquivos de voz sintética guardados no próprio site; onde ainda não há arquivo, usa-se a voz do seu navegador, que depende do seu aparelho.</p>
        <h2>Por quanto tempo guardamos</h2>
        <p>Enquanto a sua conta existir ou até você pedir a exclusão. Dados de newsletter ficam até você cancelar.</p>
        <h2>Os seus direitos</h2>
        <p>Você pode pedir confirmação de que tratamos seus dados, acesso, correção, exclusão, portabilidade e informações sobre o compartilhamento, além de retirar o consentimento. Escreva para <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</p>
        <h2>Menores de idade</h2>
        <p>Se você tem menos de 18 anos, use o site com o conhecimento de um responsável.</p>
        <h2>Mudanças</h2>
        <p>Podemos atualizar esta política. A data no topo mostra a versão mais recente.</p>
      </div>
    </>
  );
}

function TermosPt() {
  return (
    <>
      <h1 className="pagina-h1">Termos de uso</h1>
      <p className="resultado">Última atualização: 5 de novembro de 2026</p>
      <div className="texto-legal">
        <p>Ao usar o site da Linvuu ou criar uma conta, você concorda com estes termos. Dúvidas: <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
        <h2>O que a Linvuu oferece</h2>
        <p>Cursos de idiomas, em texto, áudio e exercícios. Algumas aulas estão em produção ou em revisão e podem mudar. Cada aula mostra o seu status.</p>
        <h2>Resultados</h2>
        <p>A Linvuu entrega um método e um conteúdo para você estudar. Seu avanço depende do tempo que você dedica e da prática fora do site.</p>
        <h2>Sua conta</h2>
        <p>Você é responsável por manter a senha em segurança e por usar dados verdadeiros no cadastro. Podemos suspender contas usadas para fraude ou abuso.</p>
        <h2>Uso do conteúdo</h2>
        <p>Os textos, áudios, exercícios, o design e a marca Linvuu pertencem à Linvuu. <strong>Todos os direitos reservados à Linvuu.</strong> Você pode estudar para uso pessoal. Não é permitido copiar, revender ou redistribuir o conteúdo sem autorização por escrito.</p>
        <h2>Plano pago e reembolso</h2>
        {!APK && (<p>As duas primeiras aulas de cada curso são grátis. Para continuar, há uma assinatura mensal de {PRECO_MENSAL}, cobrada todo mês até você cancelar. O preço e a forma de pagamento aparecem antes da compra.</p>)}
        {!APK && (<p><strong>Pacotes de pagamento único:</strong> 3 meses por {PRECO_TRIMESTRAL_PIX} no Pix (30% de desconto) ou {PRECO_TRIMESTRAL} no cartão ou boleto; 12 meses por {PRECO_ANUAL}. Os pacotes não se renovam sozinhos. O período começa quando o pagamento é confirmado (Pix e boleto podem levar algum tempo) e, se você comprar um novo pacote antes do fim do atual, o novo período começa quando o atual termina. Quem tem a assinatura mensal ativa não compra pacote por cima dela: primeiro cancela a assinatura.</p>)}
        <p><strong>Reembolso de 7 dias:</strong> você pode pedir o reembolso integral em até 7 dias depois do pagamento de qualquer plano (mensal ou pacote), sem dar motivo, escrevendo para <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>. Esse prazo também é o direito de arrependimento previsto no Código de Defesa do Consumidor para compras feitas pela internet.</p>
        <p><strong>Cancelamento da assinatura mensal:</strong> você cancela quando quiser, sem multa. O acesso continua até o fim do período já pago, e não há nova cobrança depois disso.</p>
        <h2>Disponibilidade</h2>
        <p>Trabalhamos para manter o site no ar, mas ele pode ficar indisponível para manutenção ou por falhas fora do nosso controle.</p>
        <h2>Mudanças e foro</h2>
        <p>Podemos atualizar estes termos; a data no topo mostra a versão mais recente. Aplica-se a lei brasileira, e o consumidor pode propor ação no foro do seu domicílio.</p>
        <p>Veja também a <Link to="/privacidade">Política de privacidade</Link>.</p>
      </div>
    </>
  );
}

function PrivacyEn() {
  return (
    <>
      <h1 className="pagina-h1">Privacy policy</h1>
      <p className="resultado">Last updated: 8 October 2026</p>
      <div className="texto-legal">
        <p>This policy explains what data Linvuu collects, why, and what your rights are under Brazil's General Data Protection Law (LGPD, Law 13.709/2018). Contact: <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
        <h2>What we collect</h2>
        <ul>
          <li><strong>Account:</strong> name, e-mail and password. The password is stored by Google's authentication service (Firebase Authentication); Linvuu never sees it in plain text.</li>
          <li><strong>Progress:</strong> completed sessions, stored in your account. Part of your progress is also saved in your browser.</li>
          <li><strong>Newsletter:</strong> the e-mail you give us, only if you tick the consent box.</li>
          <li><strong>Payment:</strong> if you subscribe, you type your card details directly into Stripe, which processes the payment. Linvuu never sees or stores your card number; we only keep the link between your account and your subscription (the Stripe customer ID) and its status.</li>
          <li><strong>Technical data:</strong> server logs (such as IP address and browser type), needed to keep the site working and secure.</li>
        </ul>
        <p>With separate permission in Analytics preferences, we use PostHog to measure navigation, lesson starts and completions using a random device identifier, without linking it to your account or sending names, emails, answers, full URLs or payment data. Screen recording is disabled. PostHog Cloud processes these events, which may involve international transfers. You can decline or withdraw permission in Analytics preferences; withdrawal stops new sends and removes the local identifier, but does not automatically delete previously received events. Contact us before withdrawing to help locate your identifier if requesting deletion.</p>
        <p><BotaoPreferencias /></p>
        <p><strong>Optional advertising:</strong> with your separate permission in Advertising preferences, we use the Meta and TikTok pixels to measure selected page visits, session interactions and checkout starts and create advertising audiences. The companies may receive page addresses, technical data and cookies; Meta may also receive page or product details under their policies, including international transfers. You can decline or withdraw permission in the site preferences; this stops new events but does not automatically erase data already received by the platforms.</p>
        <p><strong>Learning measurement (optional):</strong> if you accept the notice shown in the exercises, we store a random identifier in this browser and record on our servers which exercises you got right or wrong and when you finished a session. We do not record your name, e-mail or your answers, and the identifier is not linked to your account. We use it only to improve the lessons and to see whether students progress. If you decline, nothing is recorded, and the identifier is removed from your browser.</p>
        <h2>What we use it for</h2>
        <ul>
          <li>Creating and keeping your account, saving your progress and processing your subscription (performing the service you asked for).</li>
          <li>Sending Linvuu news (consent; you can unsubscribe at any time).</li>
          <li>Protecting the site against abuse and fixing errors (legitimate interest).</li>
        </ul>
        <h2>Who we share it with</h2>
        <p>We use providers to run the site: Google (Firebase: authentication and database), Stripe (payments) and our hosting provider (Render). They process data on our behalf. We do not sell your data.</p>
        <h2>How long we keep it</h2>
        <p>As long as your account exists or until you ask us to delete it. Newsletter data is kept until you unsubscribe.</p>
        <h2>Your rights</h2>
        <p>You can ask us to confirm that we process your data, and to access, correct, delete or port it, ask who we share it with, and withdraw your consent. Write to <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>. You may also complain to Brazil's data protection authority (ANPD) or to the authority of your country.</p>
        <h2>Minors</h2>
        <p>If you are under 18, use the site with the knowledge of a parent or guardian.</p>
        <h2>Changes</h2>
        <p>We may update this policy. The date at the top shows the latest version.</p>
      </div>
    </>
  );
}

function TermsEn() {
  return (
    <>
      <h1 className="pagina-h1">Terms of use</h1>
      <p className="resultado">Last updated: 5 November 2026</p>
      <div className="texto-legal">
        <p>By using the Linvuu site or creating an account you agree to these terms. Questions: <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
        <h2>What Linvuu offers</h2>
        <p>Language courses in text, audio and exercises. Some lessons are in production or under review and may change; each lesson shows its status.</p>
        <h2>Results</h2>
        <p>Linvuu gives you a method and content to study. Your progress depends on the time you put in and on practice outside the site.</p>
        <h2>Your account</h2>
        <p>You are responsible for keeping your password safe and for giving true information when you sign up. We may suspend accounts used for fraud or abuse.</p>
        <h2>Use of the content</h2>
        <p>The texts, audio, exercises, design and the Linvuu brand belong to Linvuu. <strong>All rights reserved.</strong> You may study for personal use. You may not copy, resell or redistribute the content without written permission.</p>
        <h2>Paid plan and refunds</h2>
        {!APK && (<p>The first two lessons of every course are free. To continue there is a monthly subscription of {PRECO_MENSAL} (Brazilian reais), charged every month until you cancel. The price and payment method are shown before you buy; your card issuer converts the currency and may charge its own fees.</p>)}
        {!APK && (<p><strong>One-time packages:</strong> 3 months for {PRECO_TRIMESTRAL} by card or boleto ({PRECO_TRIMESTRAL_PIX} with Pix, Brazil only); 12 months for {PRECO_ANUAL}. Packages do not renew automatically. The period starts when the payment is confirmed and, if you buy a new package before the current one ends, the new period starts when the current one ends. While a monthly subscription is active you cannot buy a package on top of it; cancel the subscription first.</p>)}
        <p><strong>7-day refund:</strong> you can ask for a full refund within 7 days of paying for any plan (monthly or package), without giving a reason, by writing to <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
        <p><strong>Cancelling the monthly subscription:</strong> cancel whenever you like, with no fee. Access continues until the end of the period already paid and there are no further charges.</p>
        <h2>Availability</h2>
        <p>We work to keep the site online, but it may be unavailable for maintenance or because of failures beyond our control.</p>
        <h2>Changes and jurisdiction</h2>
        <p>We may update these terms; the date at the top shows the latest version. Brazilian law applies, without prejudice to the consumer rights of your country of residence.</p>
        <p>See also the <Link to="/privacidade">Privacy policy</Link>.</p>
      </div>
    </>
  );
}

function PrivacidadEs() {
  return (
    <>
      <h1 className="pagina-h1">Política de privacidad</h1>
      <p className="resultado">Última actualización: 8 de octubre de 2026</p>
      <div className="texto-legal">
        <p>Esta política explica qué datos recoge Linvuu, para qué y cuáles son tus derechos según la Ley General de Protección de Datos de Brasil (LGPD, Ley 13.709/2018). Contacto: <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
        <h2>Qué datos recogemos</h2>
        <ul>
          <li><strong>Cuenta:</strong> nombre, correo electrónico y contraseña. La contraseña la guarda el servicio de autenticación de Google (Firebase Authentication); Linvuu nunca la ve en texto.</li>
          <li><strong>Progreso:</strong> sesiones completadas, guardadas en tu cuenta. Parte del progreso también se guarda en tu navegador.</li>
          <li><strong>Boletín:</strong> el correo que nos des, solo si marcas la casilla de consentimiento.</li>
          <li><strong>Pago:</strong> si te suscribes, escribes los datos de la tarjeta directamente en Stripe, que procesa el pago. Linvuu no ve ni guarda el número de tu tarjeta; solo guardamos el vínculo entre tu cuenta y tu suscripción (el identificador de cliente en Stripe) y su estado.</li>
          <li><strong>Datos técnicos:</strong> registros del servidor (como la dirección IP y el tipo de navegador), necesarios para que el sitio funcione y sea seguro.</li>
        </ul>
        <p>Con autorización separada en Preferencias de análisis, usamos PostHog para medir navegación, inicios y finalizaciones de clases con un identificador aleatorio del dispositivo. No se vincula a tu cuenta ni enviamos nombres, correos, respuestas, URLs completas o datos de pago. No grabamos la pantalla. PostHog Cloud procesa estos eventos y puede haber transferencias internacionales. Puedes rechazar o retirar el permiso en Preferencias de análisis; esto detiene nuevos envíos y elimina el identificador local, pero no borra automáticamente eventos ya recibidos. Para solicitar eliminación, contacta antes de retirar el permiso para poder localizar el identificador.</p>
        <p><BotaoPreferencias /></p>
        <p><strong>Publicidad opcional:</strong> con tu autorización específica en Preferencias de publicidad, usamos los píxeles de Meta y TikTok para medir visitas a páginas seleccionadas, interacciones de sesión e inicios de pago y crear públicos publicitarios. Las empresas pueden recibir direcciones de páginas, datos técnicos y cookies; Meta también puede recibir detalles de páginas o productos según sus políticas, incluso mediante transferencias internacionales. Puedes rechazar o retirar tu autorización en las preferencias del sitio; esto detiene nuevos eventos, pero no elimina automáticamente los datos que recibieron las plataformas.</p>
        <p><strong>Medición del aprendizaje (opcional):</strong> si aceptas el aviso que aparece en los ejercicios, guardamos un identificador aleatorio en este navegador y registramos en nuestros servidores qué ejercicios aciertas o fallas y cuándo terminas una sesión. No registramos tu nombre, correo ni tus respuestas, y el identificador no se vincula a tu cuenta. Lo usamos solo para mejorar las clases y saber si los alumnos progresan. Si lo rechazas, no se registra nada y el identificador se borra del navegador.</p>
        <h2>Para qué los usamos</h2>
        <ul>
          <li>Crear y mantener tu cuenta, guardar tu progreso y procesar tu suscripción (prestar el servicio que pediste).</li>
          <li>Enviarte novedades de Linvuu (consentimiento; puedes darte de baja cuando quieras).</li>
          <li>Proteger el sitio contra abusos y corregir fallos (interés legítimo).</li>
        </ul>
        <h2>Con quién los compartimos</h2>
        <p>Usamos proveedores para operar el sitio: Google (Firebase: autenticación y base de datos), Stripe (pagos) y nuestro proveedor de alojamiento (Render). Tratan los datos en nuestro nombre. No vendemos tus datos.</p>
        <h2>Cuánto tiempo los guardamos</h2>
        <p>Mientras exista tu cuenta o hasta que pidas eliminarla. Los datos del boletín se guardan hasta que te des de baja.</p>
        <h2>Tus derechos</h2>
        <p>Puedes pedir la confirmación de que tratamos tus datos, el acceso, la corrección, la eliminación y la portabilidad, saber con quién los compartimos y retirar tu consentimiento. Escribe a <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>. También puedes reclamar ante la autoridad brasileña de protección de datos (ANPD) o ante la de tu país.</p>
        <h2>Menores de edad</h2>
        <p>Si tienes menos de 18 años, usa el sitio con el conocimiento de tu madre, padre o tutor.</p>
        <h2>Cambios</h2>
        <p>Podemos actualizar esta política. La fecha de arriba indica la versión más reciente.</p>
      </div>
    </>
  );
}

function TerminosEs() {
  return (
    <>
      <h1 className="pagina-h1">Términos de uso</h1>
      <p className="resultado">Última actualización: 5 de noviembre de 2026</p>
      <div className="texto-legal">
        <p>Al usar el sitio de Linvuu o crear una cuenta, aceptas estos términos. Dudas: <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
        <h2>Qué ofrece Linvuu</h2>
        <p>Cursos de idiomas en texto, audio y ejercicios. Algunas lecciones están en producción o en revisión y pueden cambiar; cada lección muestra su estado.</p>
        <h2>Resultados</h2>
        <p>Linvuu te da un método y un contenido para estudiar. Tu avance depende del tiempo que dediques y de la práctica fuera del sitio.</p>
        <h2>Tu cuenta</h2>
        <p>Eres responsable de mantener segura tu contraseña y de usar datos verdaderos al registrarte. Podemos suspender cuentas usadas para fraude o abuso.</p>
        <h2>Uso del contenido</h2>
        <p>Los textos, audios, ejercicios, el diseño y la marca Linvuu pertenecen a Linvuu. <strong>Todos los derechos reservados.</strong> Puedes estudiar para uso personal. No está permitido copiar, revender ni redistribuir el contenido sin autorización por escrito.</p>
        <h2>Plan de pago y reembolso</h2>
        {!APK && (<p>Las dos primeras lecciones de cada curso son gratis. Para continuar hay una suscripción mensual de {PRECO_MENSAL} (reales brasileños), cobrada cada mes hasta que canceles. El precio y la forma de pago aparecen antes de la compra; el emisor de tu tarjeta hace la conversión y puede cobrar sus propias comisiones.</p>)}
        {!APK && (<p><strong>Paquetes de pago único:</strong> 3 meses por {PRECO_TRIMESTRAL} con tarjeta o boleto ({PRECO_TRIMESTRAL_PIX} con Pix, solo en Brasil); 12 meses por {PRECO_ANUAL}. Los paquetes no se renuevan automáticamente. El periodo empieza cuando se confirma el pago y, si compras un paquete nuevo antes de que termine el actual, el nuevo periodo empieza cuando termina el actual. Con una suscripción mensual activa no puedes comprar un paquete encima; primero cancela la suscripción.</p>)}
        <p><strong>Reembolso en 7 días:</strong> puedes pedir el reembolso completo en los 7 días siguientes al pago de cualquier plan (mensual o paquete), sin dar explicaciones, escribiendo a <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
        <p><strong>Cancelación de la suscripción mensual:</strong> cancelas cuando quieras, sin penalización. El acceso continúa hasta el final del periodo ya pagado y no hay nuevos cobros.</p>
        <h2>Disponibilidad</h2>
        <p>Trabajamos para mantener el sitio en línea, pero puede no estar disponible por mantenimiento o por fallos ajenos a nosotros.</p>
        <h2>Cambios y jurisdicción</h2>
        <p>Podemos actualizar estos términos; la fecha de arriba indica la versión más reciente. Se aplica la ley brasileña, sin perjuicio de los derechos del consumidor de tu país de residencia.</p>
        <p>Consulta también la <Link to="/privacidade">Política de privacidad</Link>.</p>
      </div>
    </>
  );
}

const TEXTOS = {
  'pt-BR': { privacidade: PrivacidadePt, termos: TermosPt },
  en: { privacidade: PrivacyEn, termos: TermsEn },
  es: { privacidade: PrivacidadEs, termos: TerminosEs },
};

export function Legal({ tipo }: { tipo: 'privacidade' | 'termos' }) {
  const t = useT();
  const titulo = tipo === 'privacidade' ? t.legal.privacidade : t.legal.termos;
  usePageTitle(titulo, tipo === 'privacidade' ? t.legal.descPriv : t.legal.descTermos);
  const Texto = TEXTOS[LOCALE.codigo][tipo];
  return (
    <div className="pagina">
      <Navegacao pai="/" trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: titulo }]} />
      {t.legal.aviso && <p className="nota">{t.legal.aviso} <a href={urlEm('pt-BR')} hrefLang="pt-BR" lang="pt-BR">Versão em português</a></p>}
      <Texto />
    </div>
  );
}

