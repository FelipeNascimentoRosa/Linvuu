// Textos das páginas institucionais "Contato" e "Ex-alunos da Udemy".
// Ficam aqui para a página React e o HTML entregue ao Google (metaRota.ts) dizerem exatamente o mesmo.
// Regra do projeto (docs/MARKETING.md): só fatos verificáveis, sem número de vaidade, sem promessa de fluência.
// O texto de "Por que estudar com a Linvuu?" saiu daqui para src/lib/porQue.ts quando a página passou a existir
// também em inglês (09/11/2026), pelo mesmo motivo do /sobre: uma língua por domínio, texto próprio em cada uma.

export const CONTATO = {
  titulo: 'Contato',
  descricao: 'Como falar com a Linvuu: dúvidas sobre os cursos, os livros e o seu acesso, por e-mail e pelo LinkedIn dos autores.',
  lead: 'Dúvidas sobre os cursos, os livros ou o seu acesso? Escolha o canal que for mais fácil para você.',
} as const;

export const EX_ALUNOS = {
  titulo: 'Ex-alunos da Udemy: continue o russo na Linvuu',
  descricao: 'Estudou russo comigo na Udemy? Continue na Linvuu: livro de russo A1–A2 em português, dois capítulos grátis e uma condição especial para ex-alunos.',
  lead: 'Se você fez um dos meus cursos de russo na Udemy, a Linvuu é o próximo passo: o mesmo método, agora com o livro de russo em português, áudio em cada frase e exercícios com correção.',
  mensagemWhatsapp: 'Olá! Fui aluno(a) de russo na Udemy e quero a condição especial para ex-alunos da Linvuu.',
  beneficios: [
    'O livro de russo A1–A2 em português, do alfabeto às primeiras conversas.',
    'O curso de russo em 78 aulas e 312 sessões curtas, com áudio em cada frase.',
    'Gramática de russo explicada em português, tópico por tópico, com tabelas e erros comuns.',
    'As duas primeiras aulas e dois capítulos do livro grátis, sem cartão.',
  ],
  passos: [
    'Crie sua conta grátis na Linvuu.',
    'Mande uma mensagem pelo WhatsApp com um print que mostre o seu curso de russo na Udemy (a tela do curso ou o certificado).',
    'Depois da confirmação, você recebe o código da condição especial e o livro completo.',
  ],
  aviso: 'Não envie dados de cartão, senha ou documentos: o print do curso é suficiente.',
  perguntas: [
    { p: 'Quanto custa a condição especial?', r: 'É um desconto grande, só para ex-alunos. O valor e a validade são informados na confirmação.' },
    { p: 'Preciso ter terminado o curso da Udemy?', r: 'Não. Basta ter estudado russo comigo na Udemy.' },
    { p: 'Posso testar antes de decidir?', r: 'Pode. As duas primeiras aulas e dois capítulos do livro são grátis.' },
  ],
} as const;
