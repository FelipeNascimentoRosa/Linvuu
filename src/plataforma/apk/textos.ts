import { LOCALE } from '../../i18n';
const textos = {
  'pt-BR': {
    preparacao: 'Em preparação neste idioma', semAcesso: 'Esta conta ainda não tem acesso a este conteúdo.', tentarNovamente: 'Tentar novamente',
    compras: 'Este conteúdo faz parte do módulo avançado e não está habilitado para o seu perfil atual.', comprasPlay: 'Para liberar todas as sessões, assine pelo Google Play na tela Conta.', gratis: 'As duas primeiras aulas (8 sessões) de cada curso são gratuitas.', inicio: 'O que vamos estudar hoje?', bloqueado: 'Entre na sua conta para consultar seu acesso.',
    ajustes: 'Ajustes', voltar: 'Voltar', estudo: 'Seu espaço de estudo', catalogo: 'Cursos com explicações neste idioma', progresso: 'Sessões concluídas',
    avisoIdiomas: 'O idioma da interface não garante que todas as aulas estejam adaptadas. A cobertura disponível é informada em cada curso.',
    semRede: 'Sem conexão. As sessões gratuitas (1 a 8) continuam funcionando neste aparelho, com exercícios e correção. Áudio, conta e sessões de assinante precisam de internet.',
    semCursos: 'Ainda não há aulas adaptadas para este idioma de explicação.', erroSair: 'Não foi possível sair. Tente novamente.',
    trocarIdioma: 'Mudar o idioma recarrega a tela. Respostas ainda não concluídas podem ser perdidas. Continuar?',
    cobertura: (n: number, total: number) => n >= total ? `${n} aulas com explicações adaptadas.` : `${n} de ${total} aulas com explicações adaptadas.`,
    concluidas: (n: number, total: number) => `${n} de ${total} sessões concluídas`,
  },
  en: {
    preparacao: 'Not yet adapted to this language', semAcesso: 'This account does not have access to this content yet.', tentarNovamente: 'Try again',
    compras: 'This content is part of the advanced module and is not enabled for your current profile.', comprasPlay: 'To unlock every session, subscribe with Google Play on the Account screen.', gratis: 'The first two lessons (8 sessions) of every course are free.', inicio: 'What shall we study today?', bloqueado: 'Sign in to check your access.',
    ajustes: 'Settings', voltar: 'Back', estudo: 'Your study space', catalogo: 'Courses with explanations in this language', progresso: 'Completed sessions',
    avisoIdiomas: 'The interface language does not mean every lesson has been adapted. Each course shows its available coverage.',
    semRede: 'You are offline. The free sessions (1 to 8) keep working on this device, with exercises and marking. Audio, your account and subscriber sessions need the internet.',
    semCursos: 'There are no adapted lessons in this explanation language yet.', erroSair: 'Could not sign out. Please try again.',
    trocarIdioma: 'Changing language reloads this screen. Unfinished answers may be lost. Continue?',
    cobertura: (n: number, total: number) => n >= total ? `${n} lessons with adapted explanations.` : `${n} of ${total} lessons have adapted explanations.`,
    concluidas: (n: number, total: number) => `${n} of ${total} sessions completed`,
  },
};
export const appTextos = () => textos[LOCALE.codigo];
