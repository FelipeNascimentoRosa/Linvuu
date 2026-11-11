// Dados completos e estruturados da Rodada Extra 7 (Dia 006.5 / Kapitel 0: Sobrevivência Linguística)
// As 150 Palavras e Expressões Mais Usadas no Alemão Cotidiano

export interface LessonMetadata {
  round: string;
  day: string;
  chapter: string;
  focus: string;
  totalHours: string;
}

export const LESSON_07_METADATA: LessonMetadata = {
  round: 'Rodada Extra 7',
  day: 'Dia 006.5',
  chapter: 'Kapitel 0: Sobrevivência Linguística',
  focus: 'As 150 Palavras e Expressões Mais Usadas no Alemão Cotidiano (Partículas Modais, Reações, Diálogos & Sobrevivência Prática)',
  totalHours: '3 Horas (Bloco 1: 60 min | Bloco 2: 60 min | Bloco 3: 60 min)',
};

// 1.1 As 15 Partículas Modais Mais Usadas
export interface ModalParticleItem {
  particula: string;
  funcao: string;
  exemplo: string;
  traducao: string;
  nota?: string;
}

export const MODAL_PARTICLES: ModalParticleItem[] = [
  {
    particula: 'doch',
    funcao: 'Reforço, impaciência, sugestão persuasiva',
    exemplo: 'Komm doch mit!',
    traducao: 'Vem logo comigo! / Vem comigo, vai!',
    nota: 'Suaviza imperativos ou refuta negações prévias com força afirmativa.',
  },
  {
    particula: 'mal',
    funcao: 'Atenuação, casualidade, informalidade',
    exemplo: 'Schau mal!',
    traducao: 'Olha só! / Dá uma olhada!',
    nota: 'Forma reduzida de "einmal". Remove a rispidez de pedidos e ordens diretas.',
  },
  {
    particula: 'ja',
    funcao: 'Ênfase, surpresa, conhecimento compartilhado',
    exemplo: 'Das ist ja toll!',
    traducao: 'Isso é realmente ótimo! / Não sabia que era tão bom!',
    nota: 'Indica que o falante acabou de constatar um fato evidente ou surpreendente.',
  },
  {
    particula: 'denn',
    funcao: 'Curiosidade genuína, interesse em perguntas',
    exemplo: 'Was machst du denn?',
    traducao: 'O que você está fazendo, afinal?',
    nota: 'Usado exclusivamente em perguntas para demonstrar envolvimento emocional caloroso.',
  },
  {
    particula: 'eigentlich',
    funcao: 'Realmente, no fundo, a bem da verdade',
    exemplo: 'Was willst du eigentlich?',
    traducao: 'O que você quer, na verdade?',
    nota: 'Introduz a questão fundamental subjacente a um assunto.',
  },
  {
    particula: 'vielleicht',
    funcao: 'Surpresa, ironia ou conjectura enfática',
    exemplo: 'Das ist vielleicht schön!',
    traducao: 'Isso é talvez bonito! (Que coisa bonita! / Irônico)',
    nota: 'Quando tonalizado, expressa espanto ou indignação com requinte coloquial.',
  },
  {
    particula: 'wohl',
    funcao: 'Suposição provável, quase certeza',
    exemplo: 'Er ist wohl krank.',
    traducao: 'Ele provavelmente está doente. / Deve estar doente.',
    nota: 'Indica presunção baseada em indícios fortes sem confirmação absoluta.',
  },
  {
    particula: 'schon',
    funcao: 'Garantia de tranquilidade, encorajamento',
    exemplo: 'Das wird schon klappen.',
    traducao: 'Isso vai dar certo. / Fique tranquilo, dará certo.',
    nota: 'Transmite alívio, assegurando que o desfecho será favorável.',
  },
  {
    particula: 'eben',
    funcao: 'Resignação incontornável, conformidade com a realidade',
    exemplo: 'Das ist eben so.',
    traducao: 'É assim mesmo. / Fazer o quê, é a vida.',
    nota: 'Sinônimo culto de "halt", expressando aceitação dos fatos.',
  },
  {
    particula: 'halt',
    funcao: 'Resignação cotidiana, casualidade fatalista',
    exemplo: 'Dann warte halt.',
    traducao: 'Então espera, ué. / Paciência, então espera.',
    nota: 'Muito comum na Alemanha centro-sul e Áustria em tom conversacional descontraído.',
  },
  {
    particula: 'bloß',
    funcao: 'Advertência enfática, limite estrito',
    exemplo: 'Mach das bloß nicht!',
    traducao: 'Não faça isso de jeito nenhum! / Cuidado para não fazer isso!',
    nota: 'Intensifica ordens negativas ou expressa desespero reflexivo ("Wo ist bloß mein Schlüssel?").',
  },
  {
    particula: 'etwa',
    funcao: 'Suspeita com surpresa (muitas vezes negativa)',
    exemplo: 'Hast du etwa Angst?',
    traducao: 'Você por acaso está com medo? / Não me diga que está com medo?!',
    nota: 'Espera secretamente uma resposta negativa ou expressa espanto desaprovador.',
  },
  {
    particula: 'überhaupt',
    funcao: 'Generalização radical, abrangência total',
    exemplo: 'Was willst du überhaupt?',
    traducao: 'O que você quer, afinal de contas?',
    nota: 'Com negações ("überhaupt nicht"), significa "de modo algum / absolutamente nada".',
  },
  {
    particula: 'ruhig',
    funcao: 'Permissão afetuosa, encorajamento sem reservas',
    exemplo: 'Du kannst ruhig fragen.',
    traducao: 'Você pode perguntar sem medo. / Fique à vontade para perguntar.',
    nota: 'Elimina o receio do interlocutor em incomodar.',
  },
  {
    particula: 'einfach',
    funcao: 'Descomplicação resoluta, simplicidade direta',
    exemplo: 'Mach es einfach!',
    traducao: 'Simplesmente faça! / Não pense tanto, apenas faça!',
    nota: 'Reduz a fricção de decisão apontando para a ação imediata.',
  },
];

// Exemplos Comparativos: Com vs. Sem Partícula
export interface ParticleComparisonItem {
  semParticula: string;
  comParticula: string;
  traducao: string;
  nuance: string;
}

export const PARTICLE_COMPARISONS: ParticleComparisonItem[] = [
  {
    semParticula: 'Komm mit!',
    comParticula: 'Komm doch mit!',
    traducao: 'Vem comigo!',
    nuance: 'Transforma uma ordem imperativa seca num convite caloroso e persuasivo.',
  },
  {
    semParticula: 'Schau!',
    comParticula: 'Schau mal!',
    traducao: 'Olha só!',
    nuance: 'De "olhe" (comando) para "dá uma olhada aqui rapidinho" (casual).',
  },
  {
    semParticula: 'Das ist toll!',
    comParticula: 'Das ist ja toll!',
    traducao: 'Isso é ótimo!',
    nuance: 'Acrescenta o brilho da surpresa autêntica e do entusiasmo espontâneo.',
  },
  {
    semParticula: 'Was machst du?',
    comParticula: 'Was machst du denn?',
    traducao: 'O que você está fazendo?',
    nuance: 'Elimina o tom de interrogatório policial, tornando a pergunta afetuosa.',
  },
  {
    semParticula: 'Das ist so.',
    comParticula: 'Das ist eben so.',
    traducao: 'É assim mesmo.',
    nuance: 'Transmite resignação filosófica diante do imutável.',
  },
  {
    semParticula: 'Warte!',
    comParticula: 'Warte halt!',
    traducao: 'Espera aí, ué!',
    nuance: 'Expressa ligeira impaciência ou solução óbvia cotidiana.',
  },
  {
    semParticula: 'Mach das nicht!',
    comParticula: 'Mach das bloß nicht!',
    traducao: 'Não faça isso de forma alguma!',
    nuance: 'Alerta grave de risco iminente ou advertência séria.',
  },
  {
    semParticula: 'Hast du Angst?',
    comParticula: 'Hast du etwa Angst?',
    traducao: 'Você por acaso está com medo?',
    nuance: 'Insinua surpresa provocadora diante da hipótese de covardia.',
  },
];

// 1.2 Palavras de Concordância (Zustimmung)
export interface AgreementItem {
  palavra: string;
  traducao: string;
  contexto: string;
  exemplo: string;
}

export const AGREEMENT_WORDS: AgreementItem[] = [
  { palavra: 'Ja', traducao: 'Sim', contexto: 'Neutro', exemplo: 'Ja, das stimmt.' },
  { palavra: 'Klar', traducao: 'Claro', contexto: 'Informal', exemplo: 'Klar, mache ich!' },
  { palavra: 'Natürlich', traducao: 'Naturalmente', contexto: 'Neutro / Educado', exemplo: 'Natürlich helfe ich dir.' },
  { palavra: 'Genau', traducao: 'Exatamente', contexto: 'Neutro', exemplo: 'Genau, das ist richtig.' },
  { palavra: 'Stimmt', traducao: 'É verdade / Concordo', contexto: 'Neutro', exemplo: 'Stimmt, du hast recht.' },
  { palavra: 'Richtig', traducao: 'Correto', contexto: 'Neutro', exemplo: 'Richtig, das ist so.' },
  { palavra: 'Eben', traducao: 'Exatamente (isso mesmo)', contexto: 'Informal / Resignado', exemplo: 'Eben, das sage ich ja.' },
  { palavra: 'Jawohl', traducao: 'Sim, senhor! / Com certeza!', contexto: 'Militar / Formal / Enfático', exemplo: 'Jawohl, Chef!' },
  { palavra: 'Auf jeden Fall', traducao: 'De qualquer forma / Com certeza', contexto: 'Neutro', exemplo: 'Auf jeden Fall komme ich.' },
  { palavra: 'Auf alle Fälle', traducao: 'De todo modo / Sem dúvida', contexto: 'Neutro', exemplo: 'Auf alle Fälle rufe ich an.' },
  { palavra: 'Sicher', traducao: 'Certamente / Seguro', contexto: 'Neutro', exemplo: 'Sicher, das mache ich.' },
  { palavra: 'Sicherlich', traducao: 'Certamente / Indubitavelmente', contexto: 'Formal', exemplo: 'Sicherlich haben Sie recht.' },
  { palavra: 'Gewiss', traducao: 'Por certo / Decerto', contexto: 'Formal / Literário', exemplo: 'Gewiss, das ist wahr.' },
  { palavra: 'Absolut', traducao: 'Absolutamente', contexto: 'Enfático', exemplo: 'Absolut, das stimmt!' },
  { palavra: 'Total', traducao: 'Totalmente', contexto: 'Informal', exemplo: 'Total, das ist super!' },
  { palavra: 'Auf gar keinen Fall', traducao: 'De jeito nenhum (negação enfática)', contexto: 'Enfático', exemplo: 'Auf gar keinen Fall mache ich das!' },
];

// 1.2 Palavras de Discordância (Ablehnung)
export interface DisagreementItem {
  palavra: string;
  traducao: string;
  contexto: string;
  exemplo: string;
}

export const DISAGREEMENT_WORDS: DisagreementItem[] = [
  { palavra: 'Nein', traducao: 'Não', contexto: 'Neutro', exemplo: 'Nein, danke.' },
  { palavra: 'Nee', traducao: 'Não (informal)', contexto: 'Informal / Coloquial', exemplo: 'Nee, echt nicht.' },
  { palavra: 'Nicht', traducao: 'Não (negação de verbos/adjetivos)', contexto: 'Neutro', exemplo: 'Das ist nicht richtig.' },
  { palavra: 'Kein', traducao: 'Nenhum / Não (negação de substantivo)', contexto: 'Neutro', exemplo: 'Ich habe keine Zeit.' },
  { palavra: 'Überhaupt nicht', traducao: 'De jeito nenhum / De modo algum', contexto: 'Enfático', exemplo: 'Das gefällt mir überhaupt nicht.' },
  { palavra: 'Gar nicht', traducao: 'De modo algum / Absolutamente nada', contexto: 'Enfático', exemplo: 'Das ist gar nicht lustig.' },
  { palavra: 'Auf keinen Fall', traducao: 'De jeito nenhum / Em hipótese alguma', contexto: 'Enfático', exemplo: 'Auf keinen Fall!' },
  { palavra: 'Im Gegenteil', traducao: 'Pelo contrário', contexto: 'Neutro / Argumentativo', exemplo: 'Im Gegenteil, das ist falsch.' },
  { palavra: 'Quatsch', traducao: 'Bobagem! / Tolice!', contexto: 'Informal', exemplo: 'Quatsch, das stimmt nicht.' },
  { palavra: 'Unsinn', traducao: 'Absurdo / Sem sentido', contexto: 'Neutro', exemplo: 'Unsinn, das ist nicht wahr.' },
  { palavra: 'Blödsinn', traducao: 'Besteira / Asneira', contexto: 'Informal', exemplo: 'Blödsinn, das glaube ich nicht.' },
  { palavra: 'Leider', traducao: 'Infelizmente', contexto: 'Neutro', exemplo: 'Leider kann ich nicht.' },
  { palavra: 'Schade', traducao: 'Que pena', contexto: 'Neutro', exemplo: 'Schade, dass du nicht kommst.' },
  { palavra: 'Tut mir leid', traducao: 'Sinto muito', contexto: 'Neutro', exemplo: 'Tut mir leid, das geht nicht.' },
  { palavra: 'Es geht nicht', traducao: 'Não dá / Não é possível', contexto: 'Neutro', exemplo: 'Es geht leider nicht.' },
];

// 1.3 Palavras de Dúvida e Incerteza
export interface DoubtItem {
  palavra: string;
  traducao: string;
  exemplo: string;
  traducaoExemplo: string;
}

export const DOUBT_WORDS: DoubtItem[] = [
  { palavra: 'Vielleicht', traducao: 'Talvez', exemplo: 'Vielleicht kommt er.', traducaoExemplo: 'Talvez ele venha.' },
  { palavra: 'Möglicherweise', traducao: 'Possivelmente', exemplo: 'Möglicherweise regnet es.', traducaoExemplo: 'Possivelmente chova.' },
  { palavra: 'Eventuell', traducao: 'Eventualmente', exemplo: 'Eventuell habe ich Zeit.', traducaoExemplo: 'Eventualmente tenho tempo.' },
  { palavra: 'Wahrscheinlich', traducao: 'Provavelmente', exemplo: 'Wahrscheinlich ist er krank.', traducaoExemplo: 'Provavelmente ele está doente.' },
  { palavra: 'Vermutlich', traducao: 'Presumivelmente', exemplo: 'Vermutlich kommt sie später.', traducaoExemplo: 'Presumivelmente ela vem mais tarde.' },
  { palavra: 'Angeblich', traducao: 'Supostamente', exemplo: 'Angeblich ist er reich.', traducaoExemplo: 'Supostamente ele é rico.' },
  { palavra: 'Scheinbar', traducao: 'Aparentemente (aparência enganosa)', exemplo: 'Scheinbar ist alles okay.', traducaoExemplo: 'Aparentemente está tudo bem.' },
  { palavra: 'Offenbar', traducao: 'Evidentemente / A olhos vistos', exemplo: 'Offenbar hat er es vergessen.', traducaoExemplo: 'Evidentemente ele esqueceu.' },
  { palavra: 'Anscheinend', traducao: 'Aparentemente / Pelo visto', exemplo: 'Anscheinend ist niemand da.', traducaoExemplo: 'Aparentemente ninguém está lá.' },
  { palavra: 'Ich weiß nicht', traducao: 'Eu não sei', exemplo: 'Ich weiß nicht, ob das stimmt.', traducaoExemplo: 'Eu não sei se isso é verdade.' },
  { palavra: 'Keine Ahnung', traducao: 'Não faço ideia', exemplo: 'Keine Ahnung, was er will.', traducaoExemplo: 'Não faço ideia do que ele quer.' },
  { palavra: 'Ich bin mir nicht sicher', traducao: 'Não tenho certeza', exemplo: 'Ich bin mir nicht sicher.', traducaoExemplo: 'Não tenho certeza.' },
  { palavra: 'Ich glaube', traducao: 'Eu acredito / Acho que sim', exemplo: 'Ich glaube, er kommt.', traducaoExemplo: 'Eu acredito que ele vem.' },
  { palavra: 'Ich denke', traducao: 'Eu penso', exemplo: 'Ich denke, das ist richtig.', traducaoExemplo: 'Eu penso que está correto.' },
  { palavra: 'Ich meine', traducao: 'Eu acho / Meu entendimento é', exemplo: 'Ich meine, wir sollten gehen.', traducaoExemplo: 'Eu acho que deveríamos ir.' },
  { palavra: 'Ich finde', traducao: 'Eu acho / Minha avaliação é', exemplo: 'Ich finde das gut.', traducaoExemplo: 'Eu acho isso bom.' },
  { palavra: 'Meiner Meinung nach', traducao: 'Na minha opinião', exemplo: 'Meiner Meinung nach ist das falsch.', traducaoExemplo: 'Na minha opinião, isso está errado.' },
];

// 1.4 Palavras de Quantidade e Intensidade
export interface QuantityItem {
  palavra: string;
  traducao: string;
  exemplo: string;
  traducaoExemplo: string;
}

export const QUANTITY_WORDS: QuantityItem[] = [
  { palavra: 'Sehr', traducao: 'Muito', exemplo: 'Das ist sehr gut.', traducaoExemplo: 'Isso é muito bom.' },
  { palavra: 'Ziemlich', traducao: 'Bastante', exemplo: 'Das ist ziemlich teuer.', traducaoExemplo: 'Isso é bastante caro.' },
  { palavra: 'Recht', traducao: 'Bem / Bastante', exemplo: 'Das ist recht gut.', traducaoExemplo: 'Isso é bem bom.' },
  { palavra: 'Ganz', traducao: 'Bem / Inteiramente', exemplo: 'Das ist ganz gut.', traducaoExemplo: 'Isso é bem bom.' },
  { palavra: 'Total', traducao: 'Totalmente', exemplo: 'Das ist total super.', traducaoExemplo: 'Isso é totalmente ótimo.' },
  { palavra: 'Absolut', traducao: 'Absolutamente', exemplo: 'Das ist absolut richtig.', traducaoExemplo: 'Isso é absolutamente correto.' },
  { palavra: 'Völlig', traducao: 'Completamente', exemplo: 'Das ist völlig falsch.', traducaoExemplo: 'Isso é completamente errado.' },
  { palavra: 'Komplett', traducao: 'Completamente', exemplo: 'Das ist komplett neu.', traducaoExemplo: 'Isso é completamente novo.' },
  { palavra: 'Fast', traducao: 'Quase', exemplo: 'Ich bin fast fertig.', traducaoExemplo: 'Estou quase pronto.' },
  { palavra: 'Beinahe', traducao: 'Quase (por pouco)', exemplo: 'Beinahe hätte ich es vergessen.', traducaoExemplo: 'Quase esqueci.' },
  { palavra: 'Kaum', traducao: 'Dificilmente / Mal', exemplo: 'Ich kann kaum sehen.', traducaoExemplo: 'Dificilmente consigo ver.' },
  { palavra: 'Nur', traducao: 'Apenas / Só', exemplo: 'Ich habe nur fünf Euro.', traducaoExemplo: 'Tenho apenas cinco euros.' },
  { palavra: 'Bloß', traducao: 'Apenas / Só', exemplo: 'Ich habe bloß fünf Euro.', traducaoExemplo: 'Tenho apenas cinco euros.' },
  { palavra: 'Allein', traducao: 'Sozinho / Só isso', exemplo: 'Allein das ist schon viel.', traducaoExemplo: 'Só isso já é muito.' },
  { palavra: 'Ein bisschen', traducao: 'Um pouco', exemplo: 'Ich spreche ein bisschen Deutsch.', traducaoExemplo: 'Falo um pouco de alemão.' },
  { palavra: 'Ein wenig', traducao: 'Um pouco', exemplo: 'Ein wenig müde bin ich schon.', traducaoExemplo: 'Um pouco cansado eu estou.' },
  { palavra: 'Etwas', traducao: 'Algo / Um pouco', exemplo: 'Ich brauche etwas Zeit.', traducaoExemplo: 'Preciso de um pouco de tempo.' },
  { palavra: 'Genug', traducao: 'Suficiente', exemplo: 'Das ist genug.', traducaoExemplo: 'Isso é suficiente.' },
  { palavra: 'Zuviel', traducao: 'Demais (excessivo)', exemplo: 'Das ist zuviel.', traducaoExemplo: 'Isso é demais.' },
  { palavra: 'Zu', traducao: 'Demasiado', exemplo: 'Das ist zu teuer.', traducaoExemplo: 'Isso é caro demais.' },
];

// 1.5 Palavras de Tempo e Sequência
export interface TimeSequenceItem {
  palavra: string;
  traducao: string;
  exemplo: string;
  traducaoExemplo: string;
}

export const TIME_SEQUENCE_WORDS: TimeSequenceItem[] = [
  { palavra: 'Jetzt', traducao: 'Agora', exemplo: 'Jetzt gehe ich.', traducaoExemplo: 'Agora eu vou.' },
  { palavra: 'Gleich', traducao: 'Já / Logo em seguida', exemplo: 'Ich komme gleich.', traducaoExemplo: 'Já vou.' },
  { palavra: 'Sofort', traducao: 'Imediatamente', exemplo: 'Komm sofort!', traducaoExemplo: 'Venha imediatamente!' },
  { palavra: 'Später', traducao: 'Mais tarde', exemplo: 'Bis später!', traducaoExemplo: 'Até mais tarde!' },
  { palavra: 'Nachher', traducao: 'Depois (ainda hoje)', exemplo: 'Nachher rufe ich an.', traducaoExemplo: 'Depois eu ligo.' },
  { palavra: 'Dann', traducao: 'Então / Em seguida', exemplo: 'Dann gehen wir.', traducaoExemplo: 'Então vamos.' },
  { palavra: 'Danach', traducao: 'Depois disso', exemplo: 'Danach essen wir.', traducaoExemplo: 'Depois disso comemos.' },
  { palavra: 'Vorher', traducao: 'Antes disso', exemplo: 'Vorher muss ich arbeiten.', traducaoExemplo: 'Antes preciso trabalhar.' },
  { palavra: 'Früher', traducao: 'Antigamente / Mais cedo', exemplo: 'Früher war alles besser.', traducaoExemplo: 'Antigamente tudo era melhor.' },
  { palavra: 'Heute', traducao: 'Hoje', exemplo: 'Heute ist Montag.', traducaoExemplo: 'Hoje é segunda-feira.' },
  { palavra: 'Gestern', traducao: 'Ontem', exemplo: 'Gestern war ich müde.', traducaoExemplo: 'Ontem eu estava cansado.' },
  { palavra: 'Morgen', traducao: 'Amanhã', exemplo: 'Morgen fahre ich nach Berlin.', traducaoExemplo: 'Amanhã vou para Berlim.' },
  { palavra: 'Übermorgen', traducao: 'Depois de amanhã', exemplo: 'Übermorgen habe ich Zeit.', traducaoExemplo: 'Depois de amanhã tenho tempo.' },
  { palavra: 'Vorgestern', traducao: 'Anteontem', exemplo: 'Vorgestern war ich krank.', traducaoExemplo: 'Anteontem eu estava doente.' },
  { palavra: 'Immer', traducao: 'Sempre', exemplo: 'Ich bin immer müde.', traducaoExemplo: 'Estou sempre cansado.' },
  { palavra: 'Oft', traducao: 'Frequentemente', exemplo: 'Ich gehe oft ins Kino.', traducaoExemplo: 'Vou frequentemente ao cinema.' },
  { palavra: 'Manchmal', traducao: 'Às vezes', exemplo: 'Manchmal bin ich traurig.', traducaoExemplo: 'Às vezes estou triste.' },
  { palavra: 'Selten', traducao: 'Raramente', exemplo: 'Ich trinke selten Alkohol.', traducaoExemplo: 'Raramente bebo álcool.' },
  { palavra: 'Nie', traducao: 'Nunca', exemplo: 'Ich war nie in Berlin.', traducaoExemplo: 'Nunca estive em Berlim.' },
  { palavra: 'Niemals', traducao: 'Nunca (enfático)', exemplo: 'Niemals!', traducaoExemplo: 'Nunca!' },
  { palavra: 'Wieder', traducao: 'De novo / Novamente', exemplo: 'Komm wieder!', traducaoExemplo: 'Volte de novo!' },
  { palavra: 'Schon', traducao: 'Já', exemplo: 'Ich bin schon da.', traducaoExemplo: 'Já estou aqui.' },
  { palavra: 'Noch', traducao: 'Ainda', exemplo: 'Ich bin noch müde.', traducaoExemplo: 'Ainda estou cansado.' },
  { palavra: 'Noch nicht', traducao: 'Ainda não', exemplo: 'Ich bin noch nicht fertig.', traducaoExemplo: 'Ainda não estou pronto.' },
  { palavra: 'Erst', traducao: 'Só / Apenas (tempo)', exemplo: 'Ich bin erst um 8 Uhr gekommen.', traducaoExemplo: 'Só cheguei às 8h.' },
  { palavra: 'Endlich', traducao: 'Finalmente', exemplo: 'Endlich bist du da!', traducaoExemplo: 'Finalmente você chegou!' },
  { palavra: 'Plötzlich', traducao: 'De repente', exemplo: 'Plötzlich hat es geregnet.', traducaoExemplo: 'De repente choveu.' },
  { palavra: 'Auf einmal', traducao: 'De uma vez / De repente', exemplo: 'Auf einmal war er weg.', traducaoExemplo: 'De repente ele sumiu.' },
];

// 1.6 Palavras de Cortesia e Educação
export interface PolitenessItem {
  expressao: string;
  traducao: string;
  contexto: string;
  exemplo: string;
}

export const POLITENESS_WORDS: PolitenessItem[] = [
  { expressao: 'Bitte', traducao: 'Por favor / De nada', contexto: 'Neutro', exemplo: 'Bitte sehr.' },
  { expressao: 'Danke', traducao: 'Obrigado', contexto: 'Neutro', exemplo: 'Danke schön.' },
  { expressao: 'Vielen Dank', traducao: 'Muito obrigado', contexto: 'Formal', exemplo: 'Vielen Dank für Ihre Hilfe.' },
  { expressao: 'Danke schön', traducao: 'Muito obrigado', contexto: 'Neutro', exemplo: 'Danke schön!' },
  { expressao: 'Danke sehr', traducao: 'Muito obrigado', contexto: 'Formal', exemplo: 'Danke sehr!' },
  { expressao: 'Herzlichen Dank', traducao: 'Agradecimento sincero', contexto: 'Formal', exemplo: 'Herzlichen Dank!' },
  { expressao: 'Entschuldigung', traducao: 'Desculpe', contexto: 'Neutro', exemplo: 'Entschuldigung, wo ist der Bahnhof?' },
  { expressao: 'Entschuldigen Sie', traducao: 'Desculpe (formal)', contexto: 'Formal', exemplo: 'Entschuldigen Sie bitte!' },
  { expressao: 'Verzeihung', traducao: 'Perdão', contexto: 'Formal', exemplo: 'Verzeihung, ich habe Sie nicht verstanden.' },
  { expressao: 'Tut mir leid', traducao: 'Sinto muito', contexto: 'Neutro', exemplo: 'Tut mir leid, das geht nicht.' },
  { expressao: 'Es tut mir leid', traducao: 'Sinto muito', contexto: 'Neutro', exemplo: 'Es tut mir leid, ich kann nicht kommen.' },
  { expressao: 'Kein Problem', traducao: 'Sem problema', contexto: 'Informal', exemplo: 'Kein Problem, ich mache das.' },
  { expressao: 'Macht nichts', traducao: 'Não faz mal / Não tem problema', contexto: 'Informal', exemplo: 'Macht nichts, das passiert.' },
  { expressao: 'Nichts zu danken', traducao: 'Não há de quê', contexto: 'Neutro', exemplo: 'Nichts zu danken!' },
  { expressao: 'Gern geschehen', traducao: 'De nada / Foi um prazer', contexto: 'Neutro', exemplo: 'Gern geschehen!' },
  { expressao: 'Bitte schön', traducao: 'Por favor / De nada', contexto: 'Neutro', exemplo: 'Bitte schön!' },
  { expressao: 'Bitte sehr', traducao: 'Por favor / De nada', contexto: 'Formal', exemplo: 'Bitte sehr!' },
  { expressao: 'Wie bitte?', traducao: 'Como, por favor?', contexto: 'Neutro', exemplo: 'Wie bitte? Ich habe das nicht verstanden.' },
  { expressao: 'Was bitte?', traducao: 'O quê? (espanto)', contexto: 'Informal', exemplo: 'Was bitte? Das ist nicht wahr!' },
  { expressao: 'Entschuldigen Sie die Störung', traducao: 'Desculpe o incômodo', contexto: 'Formal', exemplo: 'Entschuldigen Sie die Störung.' },
];

// 1.7 Palavras de Surpresa e Reação
export interface ReactionItem {
  expressao: string;
  traducao: string;
  contexto: string;
  exemplo: string;
}

export const REACTION_WORDS: ReactionItem[] = [
  { expressao: 'Echt?', traducao: 'Sério?', contexto: 'Informal', exemplo: 'Echt? Das wusste ich nicht.' },
  { expressao: 'Wirklich?', traducao: 'Mesmo?', contexto: 'Neutro', exemplo: 'Wirklich? Das ist ja toll!' },
  { expressao: 'Tatsächlich?', traducao: 'De fato?', contexto: 'Formal', exemplo: 'Tatsächlich? Das überrascht mich.' },
  { expressao: 'Unglaublich!', traducao: 'Inacreditável!', contexto: 'Neutro', exemplo: 'Unglaublich! Das kann nicht sein.' },
  { expressao: 'Kaum zu glauben!', traducao: 'Difícil de acreditar!', contexto: 'Neutro', exemplo: 'Kaum zu glauben!' },
  { expressao: 'Ach so!', traducao: 'Ah, entendi! / Ah, é?!', contexto: 'Neutro', exemplo: 'Ach so, jetzt verstehe ich.' },
  { expressao: 'Aha!', traducao: 'Ah! / Estou vendo!', contexto: 'Neutro', exemplo: 'Aha, das ist interessant.' },
  { expressao: 'Na ja', traducao: 'Bem... / Mais ou menos', contexto: 'Informal', exemplo: 'Na ja, das ist so eine Sache.' },
  { expressao: 'Na klar!', traducao: 'Claro!', contexto: 'Informal', exemplo: 'Na klar, mache ich!' },
  { expressao: 'Na und?', traducao: 'E daí?', contexto: 'Informal', exemplo: 'Na und? Das ist mir egal.' },
  { expressao: 'Was?', traducao: 'O quê?', contexto: 'Informal', exemplo: 'Was? Das ist nicht möglich!' },
  { expressao: 'Wie?', traducao: 'Como?', contexto: 'Informal', exemplo: 'Wie? Ich habe nichts gehört.' },
  { expressao: 'Wieso?', traducao: 'Por quê? (motivo)', contexto: 'Neutro', exemplo: 'Wieso? Das verstehe ich nicht.' },
  { expressao: 'Warum?', traducao: 'Por que? (causa)', contexto: 'Neutro', exemplo: 'Warum? Das ist doch klar.' },
  { expressao: 'Weshalb?', traducao: 'Por qual razão?', contexto: 'Formal', exemplo: 'Weshalb? Das ist unklar.' },
  { expressao: 'Wozu?', traducao: 'Para quê? (finalidade)', contexto: 'Neutro', exemplo: 'Wozu? Das ist nicht nötig.' },
  { expressao: 'Oh!', traducao: 'Oh!', contexto: 'Neutro', exemplo: 'Oh, das ist schön!' },
  { expressao: 'Oh je!', traducao: 'Ai, ai! / Que lástima!', contexto: 'Informal', exemplo: 'Oh je, das ist ein Problem.' },
  { expressao: 'Mensch!', traducao: 'Cara! / Nossa!', contexto: 'Informal', exemplo: 'Mensch, das ist ja toll!' },
  { expressao: 'Mensch Meier!', traducao: 'Minha nossa!', contexto: 'Informal', exemplo: 'Mensch Meier, das ist unglaublich!' },
  { expressao: 'Donnerwetter!', traducao: 'Puxa vida! / Que coisa!', contexto: 'Informal', exemplo: 'Donnerwetter, das ist stark!' },
  { expressao: 'Mein Gott!', traducao: 'Meu Deus!', contexto: 'Neutro', exemplo: 'Mein Gott, das ist schlimm!' },
];

// 1.8 Palavras de Despedida e Saudação
export interface GreetingFarewellItem {
  expressao: string;
  traducao: string;
  contexto: string;
  exemplo: string;
}

export const GREETING_FAREWELL_WORDS: GreetingFarewellItem[] = [
  { expressao: 'Hallo!', traducao: 'Olá!', contexto: 'Informal', exemplo: "Hallo, wie geht's?" },
  { expressao: 'Guten Morgen!', traducao: 'Bom dia! (até ~11h)', contexto: 'Formal', exemplo: 'Guten Morgen, Frau Müller!' },
  { expressao: 'Guten Tag!', traducao: 'Bom dia / Boa tarde!', contexto: 'Formal', exemplo: 'Guten Tag, Herr Schmidt!' },
  { expressao: 'Guten Abend!', traducao: 'Boa noite! (ao chegar)', contexto: 'Formal', exemplo: 'Guten Abend, meine Damen!' },
  { expressao: 'Gute Nacht!', traducao: 'Boa noite! (ao dormir/despedir)', contexto: 'Neutro', exemplo: 'Gute Nacht, schlaf gut!' },
  { expressao: 'Grüß Gott!', traducao: 'Deus te saúde! (Baviera/Áustria)', contexto: 'Regional', exemplo: "Grüß Gott, wie geht's?" },
  { expressao: 'Grüezi!', traducao: 'Olá! (Suíça alemã)', contexto: 'Regional', exemplo: 'Grüezi mitenand!' },
  { expressao: 'Tschüss!', traducao: 'Tchau!', contexto: 'Informal', exemplo: 'Tschüss, bis morgen!' },
  { expressao: 'Tschau!', traducao: 'Tchau!', contexto: 'Informal', exemplo: "Tschau, mach's gut!" },
  { expressao: 'Ciao!', traducao: 'Tchau!', contexto: 'Informal', exemplo: 'Ciao, bis später!' },
  { expressao: 'Auf Wiedersehen!', traducao: 'Até logo! / Adeus', contexto: 'Formal', exemplo: 'Auf Wiedersehen, Herr Müller!' },
  { expressao: 'Auf Wiederschauen!', traducao: 'Até logo! (Baviera/Áustria)', contexto: 'Regional', exemplo: 'Auf Wiederschauen!' },
  { expressao: 'Bis später!', traducao: 'Até mais tarde!', contexto: 'Neutro', exemplo: 'Bis später, ich rufe an!' },
  { expressao: 'Bis dann!', traducao: 'Até logo! / Até mais!', contexto: 'Informal', exemplo: "Bis dann, mach's gut!" },
  { expressao: 'Bis bald!', traducao: 'Até breve!', contexto: 'Neutro', exemplo: 'Bis bald, hoffentlich!' },
  { expressao: 'Bis morgen!', traducao: 'Até amanhã!', contexto: 'Neutro', exemplo: 'Bis morgen, schlaf gut!' },
  { expressao: 'Bis nächste Woche!', traducao: 'Até semana que vem!', contexto: 'Neutro', exemplo: 'Bis nächste Woche!' },
  { expressao: "Mach's gut!", traducao: 'Cuide-se! / Tudo de bom!', contexto: 'Informal', exemplo: "Mach's gut, bis bald!" },
  { expressao: "Hab' einen schönen Tag!", traducao: 'Tenha um bom dia!', contexto: 'Neutro', exemplo: "Hab' einen schönen Tag!" },
  { expressao: 'Schönes Wochenende!', traducao: 'Bom fim de semana!', contexto: 'Neutro', exemplo: 'Schönes Wochenende!' },
  { expressao: 'Gute Reise!', traducao: 'Boa viagem!', contexto: 'Neutro', exemplo: 'Gute Reise, komm gut an!' },
  { expressao: 'Schlaf gut!', traducao: 'Durma bem!', contexto: 'Neutro', exemplo: 'Schlaf gut, bis morgen!' },
  { expressao: 'Alles Gute!', traducao: 'Tudo de bom!', contexto: 'Neutro', exemplo: 'Alles Gute zum Geburtstag!' },
  { expressao: 'Viel Glück!', traducao: 'Boa sorte!', contexto: 'Neutro', exemplo: 'Viel Glück bei der Prüfung!' },
  { expressao: 'Viel Erfolg!', traducao: 'Muito sucesso!', contexto: 'Neutro', exemplo: 'Viel Erfolg bei der Arbeit!' },
  { expressao: 'Herzlichen Glückwunsch!', traducao: 'Meus parabéns!', contexto: 'Formal', exemplo: 'Herzlichen Glückwunsch zur Hochzeit!' },
  { expressao: 'Gute Besserung!', traducao: 'As melhoras!', contexto: 'Neutro', exemplo: 'Gute Besserung, werd schnell gesund!' },
];

// 1.9 Palavras de Opinião e Argumentação
export interface OpinionItem {
  expressao: string;
  traducao: string;
  exemplo: string;
  traducaoExemplo: string;
}

export const OPINION_WORDS: OpinionItem[] = [
  { expressao: 'Ich denke, dass...', traducao: 'Eu penso que...', exemplo: 'Ich denke, dass das richtig ist.', traducaoExemplo: 'Eu penso que isso está correto.' },
  { expressao: 'Ich glaube, dass...', traducao: 'Eu acredito que...', exemplo: 'Ich glaube, dass er kommt.', traducaoExemplo: 'Eu acredito que ele vem.' },
  { expressao: 'Ich finde, dass...', traducao: 'Eu acho que...', exemplo: 'Ich finde, dass das gut ist.', traducaoExemplo: 'Eu acho que isso é bom.' },
  { expressao: 'Ich meine, dass...', traducao: 'Eu acho / considero que...', exemplo: 'Ich meine, dass wir gehen sollten.', traducaoExemplo: 'Eu acho que deveríamos ir.' },
  { expressao: 'Meiner Meinung nach...', traducao: 'Na minha opinião...', exemplo: 'Meiner Meinung nach ist das falsch.', traducaoExemplo: 'Na minha opinião, isso está errado.' },
  { expressao: 'Ich bin der Meinung, dass...', traducao: 'Sou da opinião que...', exemplo: 'Ich bin der Meinung, dass das wichtig ist.', traducaoExemplo: 'Eu sou da opinião que isso é importante.' },
  { expressao: 'Auf der einen Seite... auf der anderen Seite...', traducao: 'Por um lado... por outro lado...', exemplo: 'Auf der einen Seite ist es gut, auf der anderen Seite ist es teuer.', traducaoExemplo: 'Por um lado é bom, por outro lado é caro.' },
  { expressao: 'Einerseits... andererseits...', traducao: 'Por um lado... por outro lado...', exemplo: 'Einerseits ist es praktisch, andererseits ist es hässlich.', traducaoExemplo: 'Por um lado é prático, por outro lado é feio.' },
  { expressao: 'Zum Beispiel', traducao: 'Por exemplo', exemplo: 'Zum Beispiel Berlin ist eine tolle Stadt.', traducaoExemplo: 'Por exemplo, Berlim é uma cidade ótima.' },
  { expressao: 'Das heißt', traducao: 'Ou seja / Isto significa', exemplo: 'Das heißt, wir müssen warten.', traducaoExemplo: 'Ou seja, temos que esperar.' },
  { expressao: 'Mit anderen Worten', traducao: 'Em outras palavras', exemplo: 'Mit anderen Worten, es ist kompliziert.', traducaoExemplo: 'Em outras palavras, é complicado.' },
  { expressao: 'Im Gegenteil', traducao: 'Pelo contrário', exemplo: 'Im Gegenteil, das ist sehr wichtig.', traducaoExemplo: 'Pelo contrário, isso é muito importante.' },
  { expressao: 'Im Allgemeinen', traducao: 'Em geral', exemplo: 'Im Allgemeinen ist das richtig.', traducaoExemplo: 'Em geral, isso está correto.' },
  { expressao: 'Normalerweise', traducao: 'Normalmente', exemplo: 'Normalerweise komme ich um 8 Uhr.', traducaoExemplo: 'Normalmente chego às 8h.' },
  { expressao: 'In der Regel', traducao: 'Via de regra / Em regra', exemplo: 'In der Regel ist das so.', traducaoExemplo: 'Em regra, é assim.' },
  { expressao: 'Wie gesagt', traducao: 'Como disse / Como já dito', exemplo: 'Wie gesagt, ich habe keine Zeit.', traducaoExemplo: 'Como dito, não tenho tempo.' },
  { expressao: 'Wie du weißt', traducao: 'Como você sabe', exemplo: 'Wie du weißt, bin ich müde.', traducaoExemplo: 'Como você sabe, estou cansado.' },
  { expressao: 'Ehrlich gesagt', traducao: 'Para ser sincero / Honestamente', exemplo: 'Ehrlich gesagt, das gefällt mir nicht.', traducaoExemplo: 'Honestamente, isso não me agrada.' },
  { expressao: 'Offen gesagt', traducao: 'Falando abertamente', exemplo: 'Offen gesagt, das ist Unsinn.', traducaoExemplo: 'Franqueza, isso é bobagem.' },
  { expressao: 'Kurz gesagt', traducao: 'Em resumo / Em poucas palavras', exemplo: 'Kurz gesagt, es geht nicht.', traducaoExemplo: 'Resumindo, não dá.' },
];

// 1.10 Palavras de Ação e Comando (Imperativo)
export interface ActionCommandItem {
  informal: string;
  formal: string;
  traducao: string;
  exemplo: string;
}

export const ACTION_COMMANDS: ActionCommandItem[] = [
  { informal: 'Komm!', formal: 'Kommen Sie!', traducao: 'Venha!', exemplo: 'Komm her! / Kommen Sie bitte!' },
  { informal: 'Geh!', formal: 'Gehen Sie!', traducao: 'Vá!', exemplo: 'Geh weg! / Gehen Sie bitte!' },
  { informal: 'Warte!', formal: 'Warten Sie!', traducao: 'Espere!', exemplo: 'Warte mal! / Warten Sie bitte!' },
  { informal: 'Schau!', formal: 'Schauen Sie!', traducao: 'Olhe!', exemplo: 'Schau mal! / Schauen Sie bitte!' },
  { informal: 'Hör!', formal: 'Hören Sie!', traducao: 'Ouça!', exemplo: 'Hör mal! / Hören Sie bitte!' },
  { informal: 'Gib!', formal: 'Geben Sie!', traducao: 'Dê!', exemplo: 'Gib mir das! / Geben Sie mir das bitte!' },
  { informal: 'Nimm!', formal: 'Nehmen Sie!', traducao: 'Pegue!', exemplo: 'Nimm das! / Nehmen Sie bitte!' },
  { informal: 'Mach!', formal: 'Machen Sie!', traducao: 'Faça!', exemplo: 'Mach schnell! / Machen Sie bitte!' },
  { informal: 'Lass!', formal: 'Lassen Sie!', traducao: 'Deixe!', exemplo: 'Lass das! / Lassen Sie das bitte!' },
  { informal: 'Hilf!', formal: 'Helfen Sie!', traducao: 'Ajude!', exemplo: 'Hilf mir! / Helfen Sie mir bitte!' },
  { informal: 'Sag!', formal: 'Sagen Sie!', traducao: 'Diga!', exemplo: 'Sag mal! / Sagen Sie bitte!' },
  { informal: 'Zeig!', formal: 'Zeigen Sie!', traducao: 'Mostre!', exemplo: 'Zeig mir das! / Zeigen Sie mir das bitte!' },
];

// 2.1 As 50 Frases Mais Usadas em Conversas Cotidianas
export interface EverydayPhrase {
  categoria: 'Saudação e Apresentação' | 'Cortesia e Educação' | 'Opinião e Reação' | 'Despedida';
  alemao: string;
  traducao: string;
  contexto: string;
}

export const EVERYDAY_PHRASES_50: EverydayPhrase[] = [
  // Saudação e Apresentação
  { categoria: 'Saudação e Apresentação', alemao: 'Hallo!', traducao: 'Olá!', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Guten Morgen!', traducao: 'Bom dia!', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Guten Tag!', traducao: 'Bom dia / Boa tarde!', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Guten Abend!', traducao: 'Boa noite!', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: "Wie geht's?", traducao: 'Como vai?', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Wie geht es Ihnen?', traducao: 'Como vai o senhor/a senhora?', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: "Mir geht's gut.", traducao: 'Estou bem.', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Danke, gut.', traducao: 'Obrigado, bem.', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Und dir?', traducao: 'E você?', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Und Ihnen?', traducao: 'E o senhor/a senhora?', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Wie heißt du?', traducao: 'Como você se chama?', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Wie heißen Sie?', traducao: 'Como o senhor/a senhora se chama?', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Ich heiße Ana.', traducao: 'Eu me chamo Ana.', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Mein Name ist Peter.', traducao: 'Meu nome é Peter.', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Freut mich!', traducao: 'Prazer!', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Sehr erfreut!', traducao: 'Muito prazer!', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Woher kommst du?', traducao: 'De onde você vem?', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Woher kommen Sie?', traducao: 'De onde o senhor/a senhora vem?', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Ich komme aus Brasilien.', traducao: 'Eu venho do Brasil.', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Wo wohnst du?', traducao: 'Onde você mora?', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Wo wohnen Sie?', traducao: 'Onde o senhor/a senhora mora?', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Ich wohne in Berlin.', traducao: 'Eu moro em Berlim.', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Wie alt bist du?', traducao: 'Quantos anos você tem?', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Wie alt sind Sie?', traducao: 'Quantos anos o senhor/a senhora tem?', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Ich bin 30 Jahre alt.', traducao: 'Eu tenho 30 anos.', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Was machst du beruflich?', traducao: 'O que você faz profissionalmente?', contexto: 'Informal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Was machen Sie beruflich?', traducao: 'O que o senhor/a senhora faz?', contexto: 'Formal' },
  { categoria: 'Saudação e Apresentação', alemao: 'Ich bin Lehrerin.', traducao: 'Eu sou professora.', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Ich arbeite als Ingenieur.', traducao: 'Eu trabalho como engenheiro.', contexto: 'Neutro' },
  { categoria: 'Saudação e Apresentação', alemao: 'Ich studiere Medizin.', traducao: 'Eu estudo medicina.', contexto: 'Neutro' },

  // Cortesia e Educação
  { categoria: 'Cortesia e Educação', alemao: 'Bitte.', traducao: 'Por favor.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Danke.', traducao: 'Obrigado.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Danke schön.', traducao: 'Muito obrigado.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Vielen Dank.', traducao: 'Muito obrigado.', contexto: 'Formal' },
  { categoria: 'Cortesia e Educação', alemao: 'Bitte sehr.', traducao: 'De nada / Às suas ordens.', contexto: 'Formal' },
  { categoria: 'Cortesia e Educação', alemao: 'Gern geschehen.', traducao: 'De nada / Foi um prazer.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Entschuldigung.', traducao: 'Desculpe.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Entschuldigen Sie bitte.', traducao: 'Desculpe, por favor.', contexto: 'Formal' },
  { categoria: 'Cortesia e Educação', alemao: 'Tut mir leid.', traducao: 'Sinto muito.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Es tut mir leid.', traducao: 'Sinto muito.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Kein Problem.', traducao: 'Sem problema.', contexto: 'Informal' },
  { categoria: 'Cortesia e Educação', alemao: 'Macht nichts.', traducao: 'Não faz mal.', contexto: 'Informal' },
  { categoria: 'Cortesia e Educação', alemao: 'Wie bitte?', traducao: 'Como, por favor?', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Was bitte?', traducao: 'O quê?', contexto: 'Informal' },
  { categoria: 'Cortesia e Educação', alemao: 'Können Sie das wiederholen?', traducao: 'Pode repetir isso?', contexto: 'Formal' },
  { categoria: 'Cortesia e Educação', alemao: 'Sprechen Sie bitte langsamer.', traducao: 'Fale mais devagar, por favor.', contexto: 'Formal' },
  { categoria: 'Cortesia e Educação', alemao: 'Ich verstehe nicht.', traducao: 'Eu não entendo.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Ich habe eine Frage.', traducao: 'Eu tenho uma pergunta.', contexto: 'Neutro' },
  { categoria: 'Cortesia e Educação', alemao: 'Darf ich Sie etwas fragen?', traducao: 'Posso lhe perguntar algo?', contexto: 'Formal' },

  // Opinião e Reação
  { categoria: 'Opinião e Reação', alemao: 'Ich denke, das ist gut.', traducao: 'Eu penso que isso é bom.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Ich glaube schon.', traducao: 'Eu acredito que sim.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Ich finde das prima.', traducao: 'Eu acho isso ótimo.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Meiner Meinung nach ist das richtig.', traducao: 'Na minha opinião, está correto.', contexto: 'Formal' },
  { categoria: 'Opinião e Reação', alemao: 'Das stimmt.', traducao: 'É verdade.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Das ist richtig.', traducao: 'Está correto.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Das ist falsch.', traducao: 'Está errado.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Genau!', traducao: 'Exatamente!', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Eben!', traducao: 'Exatamente isso!', contexto: 'Informal' },
  { categoria: 'Opinião e Reação', alemao: 'Klar!', traducao: 'Claro!', contexto: 'Informal' },
  { categoria: 'Opinião e Reação', alemao: 'Natürlich!', traducao: 'Naturalmente!', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Sicher!', traducao: 'Certamente!', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Auf keinen Fall!', traducao: 'De jeito nenhum!', contexto: 'Enfático' },
  { categoria: 'Opinião e Reação', alemao: 'Überhaupt nicht!', traducao: 'De modo algum!', contexto: 'Enfático' },
  { categoria: 'Opinião e Reação', alemao: 'Quatsch!', traducao: 'Bobagem!', contexto: 'Informal' },
  { categoria: 'Opinião e Reação', alemao: 'Unsinn!', traducao: 'Absurdo!', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Echt?', traducao: 'Sério?', contexto: 'Informal' },
  { categoria: 'Opinião e Reação', alemao: 'Wirklich?', traducao: 'Mesmo?', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Unglaublich!', traducao: 'Inacreditável!', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Ach so!', traducao: 'Ah, entendi!', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Na ja...', traducao: 'Bem...', contexto: 'Informal' },
  { categoria: 'Opinião e Reação', alemao: 'Na und?', traducao: 'E daí?', contexto: 'Informal' },
  { categoria: 'Opinião e Reação', alemao: 'Wieso denn?', traducao: 'Por que afinal?', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Keine Ahnung.', traducao: 'Não faço ideia.', contexto: 'Informal' },
  { categoria: 'Opinião e Reação', alemao: 'Ich weiß nicht.', traducao: 'Eu não sei.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Ich bin mir nicht sicher.', traducao: 'Não tenho certeza.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Vielleicht.', traducao: 'Talvez.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Wahrscheinlich.', traducao: 'Provavelmente.', contexto: 'Neutro' },
  { categoria: 'Opinião e Reação', alemao: 'Auf jeden Fall.', traducao: 'De qualquer forma.', contexto: 'Neutro' },

  // Despedida
  { categoria: 'Despedida', alemao: 'Tschüss!', traducao: 'Tchau!', contexto: 'Informal' },
  { categoria: 'Despedida', alemao: 'Ciao!', traducao: 'Tchau!', contexto: 'Informal' },
  { categoria: 'Despedida', alemao: 'Auf Wiedersehen!', traducao: 'Até logo!', contexto: 'Formal' },
  { categoria: 'Despedida', alemao: 'Bis später!', traducao: 'Até mais tarde!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Bis dann!', traducao: 'Até logo!', contexto: 'Informal' },
  { categoria: 'Despedida', alemao: 'Bis bald!', traducao: 'Até breve!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Bis morgen!', traducao: 'Até amanhã!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: "Mach's gut!", traducao: 'Cuide-se!', contexto: 'Informal' },
  { categoria: 'Despedida', alemao: 'Schönen Tag noch!', traducao: 'Tenha um bom dia!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Schönes Wochenende!', traducao: 'Bom fim de semana!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Gute Reise!', traducao: 'Boa viagem!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Schlaf gut!', traducao: 'Durma bem!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Alles Gute!', traducao: 'Tudo de bom!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Viel Glück!', traducao: 'Boa sorte!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Viel Erfolg!', traducao: 'Muito sucesso!', contexto: 'Neutro' },
  { categoria: 'Despedida', alemao: 'Herzlichen Glückwunsch!', traducao: 'Parabéns!', contexto: 'Formal' },
  { categoria: 'Despedida', alemao: 'Gute Besserung!', traducao: 'Melhoras!', contexto: 'Neutro' },
];

// 2.2 Tabela Lexical Primária (42 Termos Canônicos)
export interface PrimaryLexicalTerm {
  termo: string;
  classe: string;
  traducao: string;
  fraseModelo: string;
}

export const PRIMARY_LEXICAL_TABLE_7: PrimaryLexicalTerm[] = [
  { termo: 'ja', classe: 'Partícula/Advérbio', traducao: 'sim', fraseModelo: 'Ja, das stimmt.' },
  { termo: 'nein', classe: 'Partícula/Advérbio', traducao: 'não', fraseModelo: 'Nein, danke.' },
  { termo: 'doch', classe: 'Partícula modal', traducao: '(reforço persuasivo)', fraseModelo: 'Komm doch mit!' },
  { termo: 'mal', classe: 'Partícula modal', traducao: '(atenuação casual)', fraseModelo: 'Schau mal!' },
  { termo: 'denn', classe: 'Partícula modal', traducao: '(curiosidade)', fraseModelo: 'Was machst du denn?' },
  { termo: 'eigentlich', classe: 'Advérbio', traducao: 'na verdade / no fundo', fraseModelo: 'Was willst du eigentlich?' },
  { termo: 'vielleicht', classe: 'Advérbio', traducao: 'talvez', fraseModelo: 'Vielleicht kommt er.' },
  { termo: 'wahrscheinlich', classe: 'Advérbio', traducao: 'provavelmente', fraseModelo: 'Wahrscheinlich ist er krank.' },
  { termo: 'sicher', classe: 'Advérbio', traducao: 'certamente / seguro', fraseModelo: 'Sicher, das mache ich.' },
  { termo: 'natürlich', classe: 'Advérbio', traducao: 'naturalmente', fraseModelo: 'Natürlich helfe ich dir.' },
  { termo: 'klar', classe: 'Advérbio', traducao: 'claro / com certeza', fraseModelo: 'Klar, mache ich!' },
  { termo: 'genau', classe: 'Advérbio', traducao: 'exatamente', fraseModelo: 'Genau, das ist richtig.' },
  { termo: 'eben', classe: 'Partícula modal', traducao: 'exatamente / é assim mesmo', fraseModelo: 'Eben, das sage ich ja.' },
  { termo: 'halt', classe: 'Partícula modal', traducao: 'ué / paciência', fraseModelo: 'Dann warte halt.' },
  { termo: 'bloß', classe: 'Partícula modal', traducao: 'de jeito nenhum / apenas', fraseModelo: 'Mach das bloß nicht!' },
  { termo: 'etwa', classe: 'Partícula modal', traducao: 'por acaso', fraseModelo: 'Hast du etwa Angst?' },
  { termo: 'überhaupt', classe: 'Advérbio', traducao: 'afinal / de modo algum', fraseModelo: 'Das gefällt mir überhaupt nicht.' },
  { termo: 'quatsch', classe: 'Substantivo (der)', traducao: 'bobagem', fraseModelo: 'Quatsch, das stimmt nicht.' },
  { termo: 'unsinn', classe: 'Substantivo (der)', traducao: 'absurdo', fraseModelo: 'Unsinn, das ist nicht wahr.' },
  { termo: 'schade', classe: 'Adjetivo / Predicado', traducao: 'que pena', fraseModelo: 'Schade, dass du nicht kommst.' },
  { termo: 'leider', classe: 'Advérbio', traducao: 'infelizmente', fraseModelo: 'Leider kann ich nicht.' },
  { termo: 'bitte', classe: 'Partícula', traducao: 'por favor / de nada', fraseModelo: 'Bitte sehr.' },
  { termo: 'danke', classe: 'Partícula', traducao: 'obrigado', fraseModelo: 'Danke schön.' },
  { termo: 'entschuldigung', classe: 'Substantivo (die)', traducao: 'desculpe / desculpa', fraseModelo: 'Entschuldigung, wo ist der Bahnhof?' },
  { termo: 'tut mir leid', classe: 'Expressão verbal', traducao: 'sinto muito', fraseModelo: 'Tut mir leid, das geht nicht.' },
  { termo: 'kein problem', classe: 'Expressão', traducao: 'sem problema', fraseModelo: 'Kein Problem, ich mache das.' },
  { termo: 'macht nichts', classe: 'Expressão verbal', traducao: 'não faz mal', fraseModelo: 'Macht nichts, das passiert.' },
  { termo: 'echt', classe: 'Advérbio', traducao: 'sério / autêntico', fraseModelo: 'Echt? Das wusste ich nicht.' },
  { termo: 'wirklich', classe: 'Advérbio', traducao: 'mesmo / realmente', fraseModelo: 'Wirklich? Das ist ja toll!' },
  { termo: 'unglaublich', classe: 'Adjetivo', traducao: 'inacreditável', fraseModelo: 'Unglaublich! Das kann nicht sein.' },
  { termo: 'ach so', classe: 'Interjeição', traducao: 'ah, entendi', fraseModelo: 'Ach so, jetzt verstehe ich.' },
  { termo: 'na ja', classe: 'Expressão', traducao: 'bem... / é...', fraseModelo: 'Na ja, das ist so eine Sache.' },
  { termo: 'na und', classe: 'Expressão', traducao: 'e daí', fraseModelo: 'Na und? Das ist mir egal.' },
  { termo: 'wieso', classe: 'Advérbio interrogativo', traducao: 'por quê', fraseModelo: 'Wieso? Das verstehe ich nicht.' },
  { termo: 'warum', classe: 'Advérbio interrogativo', traducao: 'por que', fraseModelo: 'Warum? Das ist doch klar.' },
  { termo: 'keine ahnung', classe: 'Expressão nominal', traducao: 'não faço ideia', fraseModelo: 'Keine Ahnung, was er will.' },
  { termo: 'ich weiß nicht', classe: 'Expressão verbal', traducao: 'eu não sei', fraseModelo: 'Ich weiß nicht, ob das stimmt.' },
  { termo: 'auf jeden fall', classe: 'Locução adverbial', traducao: 'de qualquer forma', fraseModelo: 'Auf jeden Fall komme ich.' },
  { termo: 'tschüss', classe: 'Interjeição', traducao: 'tchau', fraseModelo: 'Tschüss, bis morgen!' },
  { termo: 'auf wiedersehen', classe: 'Fórmula de despedida', traducao: 'até logo (formal)', fraseModelo: 'Auf Wiedersehen, Herr Müller!' },
  { termo: 'bis später', classe: 'Expressão temporal', traducao: 'até mais tarde', fraseModelo: 'Bis später, ich rufe an!' },
  { termo: 'mach\'s gut', classe: 'Fórmula coloquial', traducao: 'cuide-se / tudo de bom', fraseModelo: "Mach's gut, bis bald!" },
];

// 2.3 Registro Coloquial e Autêntico (Umgangssprache) (29 Expressões)
export interface ColloquialExpression {
  expressao: string;
  traducao: string;
  contexto: string;
}

export const COLLOQUIAL_EXPRESSIONS_7: ColloquialExpression[] = [
  { expressao: 'Na?', traducao: 'E aí? / Tudo bem?', contexto: 'Saudação informal ultra-curta' },
  { expressao: 'Was geht?', traducao: 'O que há? / Qual é a boa?', contexto: 'Saudação informal entre jovens' },
  { expressao: 'Alles klar?', traducao: 'Tudo certo? / Tudo em ordem?', contexto: 'Saudação informal onipresente' },
  { expressao: 'Läuft bei dir?', traducao: 'As coisas vão bem pra você?', contexto: 'Gíria juvenil descontraída' },
  { expressao: 'Kein Stress!', traducao: 'Sem estresse! / Fica calmo!', contexto: 'Apaziguamento informal' },
  { expressao: 'Passt schon!', traducao: 'Tá bom assim! / Deixa pra lá!', contexto: 'Acordo informal pragmático' },
  { expressao: 'Echt?', traducao: 'Sério? / Jura?', contexto: 'Surpresa cotidiana' },
  { expressao: 'Krass!', traducao: 'Doideira! / Bizarro! / Sensacional!', contexto: 'Gíria de intensidade juvenil' },
  { expressao: 'Bock haben', traducao: 'Estar a fim de fazer algo', contexto: '"Ich habe Bock" = Estou super a fim' },
  { expressao: 'Schnauze!', traducao: 'Cala o bico! / Cala a boca!', contexto: 'Muito rude (evitar usar)' },
  { expressao: 'Mist!', traducao: 'Droga! / Poxa vida!', contexto: 'Frustração moderada inofensiva' },
  { expressao: 'Scheiße!', traducao: 'Merda!', contexto: 'Palavrão comum (evitar em público)' },
  { expressao: 'Verdammt!', traducao: 'Maldito! / Droga!', contexto: 'Irritação enfática' },
  { expressao: 'Herrje!', traducao: 'Minha nossa!', contexto: 'Espanto tradicional afável' },
  { expressao: 'Mensch!', traducao: 'Cara! / Poxa vida!', contexto: 'Exclamação muito frequente' },
  { expressao: 'Mensch Meier!', traducao: 'Nossa Senhora! / Caramba!', contexto: 'Surpresa ingênua descontraída' },
  { expressao: 'Donnerwetter!', traducao: 'Puxa vida! / Que estrondo!', contexto: 'Espanto positivo ou repreensão' },
  { expressao: 'Mein Gott!', traducao: 'Meu Deus!', contexto: 'Reação emotiva universal' },
  { expressao: 'Oh je!', traducao: 'Ai, ai, ai! / Que situação!', contexto: 'Constatação de problema' },
  { expressao: 'Ach du liebe Zeit!', traducao: 'Ai meu Deus do céu!', contexto: 'Espanto com atraso ou absurdo' },
  { expressao: 'Halt die Ohren steif!', traducao: 'Mantenha-se firme! / Ânimo!', contexto: 'Encorajamento amigável' },
  { expressao: 'Daumen drücken!', traducao: 'Torcer por alguém', contexto: 'Gesto cultural de segurar os polegares' },
  { expressao: 'Ich drücke dir die Daumen!', traducao: 'Estou torcendo por você!', contexto: 'Desejo sincero de sorte' },
  { expressao: 'Hals- und Beinbruch!', traducao: 'Boa sorte! (literalmente: quebre o pescoço e a perna)', contexto: 'Tradição supersticiosa teatral' },
  { expressao: 'Toi, toi, toi!', traducao: 'Bato na madeira / Boa sorte!', contexto: 'Expressão apotropaica de sorte' },
  { expressao: 'Prost!', traducao: 'Saúde! (cerveja/bar)', contexto: 'Brinde informal' },
  { expressao: 'Zum Wohl!', traducao: 'À nossa saúde! (vinho/banquete)', contexto: 'Brinde formal refinado' },
  { expressao: 'Guten Appetit!', traducao: 'Bom apetite!', contexto: 'Fórmula antes da refeição' },
  { expressao: 'Mahlzeit!', traducao: 'Boa refeição! / Olá (no horário de almoço)!', contexto: 'Cumprimento corporativo na Alemanha' },
];

// 2.4 As 20 Perguntas Mais Usadas no Dia a Dia
export interface Question20Item {
  num: number;
  pergunta: string;
  traducao: string;
  contexto: string;
}

export const QUESTIONS_20: Question20Item[] = [
  { num: 1, pergunta: "Wie geht's?", traducao: 'Como vai?', contexto: 'Informal' },
  { num: 2, pergunta: 'Wie geht es Ihnen?', traducao: 'Como vai o senhor/a senhora?', contexto: 'Formal' },
  { num: 3, pergunta: 'Was machst du?', traducao: 'O que você está fazendo? / O que você faz?', contexto: 'Informal' },
  { num: 4, pergunta: 'Was machen Sie?', traducao: 'O que o senhor/a senhora está fazendo? / Qual sua profissão?', contexto: 'Formal' },
  { num: 5, pergunta: 'Woher kommst du?', traducao: 'De onde você vem?', contexto: 'Informal' },
  { num: 6, pergunta: 'Woher kommen Sie?', traducao: 'De onde o senhor/a senhora vem?', contexto: 'Formal' },
  { num: 7, pergunta: 'Wo wohnst du?', traducao: 'Onde você mora?', contexto: 'Informal' },
  { num: 8, pergunta: 'Wo wohnen Sie?', traducao: 'Onde o senhor/a senhora mora?', contexto: 'Formal' },
  { num: 9, pergunta: 'Wie heißt du?', traducao: 'Como você se chama?', contexto: 'Informal' },
  { num: 10, pergunta: 'Wie heißen Sie?', traducao: 'Como o senhor/a senhora se chama?', contexto: 'Formal' },
  { num: 11, pergunta: 'Wie alt bist du?', traducao: 'Quantos anos você tem?', contexto: 'Informal' },
  { num: 12, pergunta: 'Wie alt sind Sie?', traducao: 'Quantos anos o senhor/a senhora tem?', contexto: 'Formal' },
  { num: 13, pergunta: 'Was ist das?', traducao: 'O que é isso?', contexto: 'Neutro' },
  { num: 14, pergunta: 'Was kostet das?', traducao: 'Quanto custa isso?', contexto: 'Neutro' },
  { num: 15, pergunta: 'Wo ist der Bahnhof?', traducao: 'Onde fica a estação?', contexto: 'Neutro' },
  { num: 16, pergunta: 'Wann kommst du?', traducao: 'Quando você vem?', contexto: 'Neutro' },
  { num: 17, pergunta: 'Warum machst du das?', traducao: 'Por que você faz isso?', contexto: 'Neutro' },
  { num: 18, pergunta: 'Wie spät ist es?', traducao: 'Que horas são?', contexto: 'Neutro' },
  { num: 19, pergunta: 'Wer ist das?', traducao: 'Quem é esse / essa?', contexto: 'Neutro' },
  { num: 20, pergunta: 'Was möchten Sie trinken?', traducao: 'O que o senhor/a senhora gostaria de beber?', contexto: 'Neutro / Atendimento' },
];

// 2.5 As 20 Respostas Mais Usadas no Dia a Dia
export interface Answer20Item {
  num: number;
  resposta: string;
  traducao: string;
  contexto: string;
}

export const ANSWERS_20: Answer20Item[] = [
  { num: 1, resposta: 'Ja.', traducao: 'Sim.', contexto: 'Neutro' },
  { num: 2, resposta: 'Nein.', traducao: 'Não.', contexto: 'Neutro' },
  { num: 3, resposta: 'Vielleicht.', traducao: 'Talvez.', contexto: 'Neutro' },
  { num: 4, resposta: 'Klar.', traducao: 'Claro.', contexto: 'Informal' },
  { num: 5, resposta: 'Natürlich.', traducao: 'Naturalmente.', contexto: 'Neutro' },
  { num: 6, resposta: 'Genau.', traducao: 'Exatamente.', contexto: 'Neutro' },
  { num: 7, resposta: 'Stimmt.', traducao: 'É verdade.', contexto: 'Neutro' },
  { num: 8, resposta: 'Richtig.', traducao: 'Correto.', contexto: 'Neutro' },
  { num: 9, resposta: 'Falsch.', traducao: 'Errado.', contexto: 'Neutro' },
  { num: 10, resposta: 'Ich weiß nicht.', traducao: 'Eu não sei.', contexto: 'Neutro' },
  { num: 11, resposta: 'Keine Ahnung.', traducao: 'Não faço ideia.', contexto: 'Informal' },
  { num: 12, resposta: 'Ich glaube schon.', traducao: 'Eu acredito que sim.', contexto: 'Neutro' },
  { num: 13, resposta: 'Ich denke schon.', traducao: 'Eu penso que sim.', contexto: 'Neutro' },
  { num: 14, resposta: 'Ich finde das gut.', traducao: 'Eu acho isso bom.', contexto: 'Neutro' },
  { num: 15, resposta: 'Meiner Meinung nach ja.', traducao: 'Na minha opinião, sim.', contexto: 'Formal' },
  { num: 16, resposta: 'Auf jeden Fall.', traducao: 'De qualquer forma / Com certeza.', contexto: 'Neutro' },
  { num: 17, resposta: 'Auf keinen Fall.', traducao: 'De jeito nenhum.', contexto: 'Enfático' },
  { num: 18, resposta: 'Überhaupt nicht.', traducao: 'De modo algum.', contexto: 'Enfático' },
  { num: 19, resposta: 'Quatsch.', traducao: 'Bobagem.', contexto: 'Informal' },
  { num: 20, resposta: 'Unsinn.', traducao: 'Absurdo.', contexto: 'Neutro' },
];

// 3.1 Exercício 1 — 34 Frases com Palavras Inseridas
export interface Exercise1FillItem {
  id: number;
  fraseOriginal: string;
  palavraGabarito: string;
  fraseCompleta: string;
  traducao: string;
  justificativa: string;
}

export const EXERCISE_1_FILL_DATA: Exercise1FillItem[] = [
  {
    id: 1,
    fraseOriginal: 'Komm ... mit!',
    palavraGabarito: 'doch',
    fraseCompleta: 'Komm doch mit!',
    traducao: 'Vem logo comigo!',
    justificativa: 'A partícula modal "doch" adiciona persuasão calorosa ao imperativo.',
  },
  {
    id: 2,
    fraseOriginal: 'Schau ...!',
    palavraGabarito: 'mal',
    fraseCompleta: 'Schau mal!',
    traducao: 'Olha só!',
    justificativa: 'A partícula "mal" reduz a rispidez, transformando a ordem em convite casual.',
  },
  {
    id: 3,
    fraseOriginal: 'Was machst du ...?',
    palavraGabarito: 'denn',
    fraseCompleta: 'Was machst du denn?',
    traducao: 'O que você está fazendo afinal?',
    justificativa: '"denn" é a partícula modal padrão para denotar curiosidade amistosa em W-Fragen.',
  },
  {
    id: 4,
    fraseOriginal: 'Was willst du ...?',
    palavraGabarito: 'eigentlich',
    fraseCompleta: 'Was willst du eigentlich?',
    traducao: 'O que você quer, na verdade?',
    justificativa: '"eigentlich" indaga sobre a intenção real subjacente.',
  },
  {
    id: 5,
    fraseOriginal: 'Das ist ... toll!',
    palavraGabarito: 'ja',
    fraseCompleta: 'Das ist ja toll!',
    traducao: 'Isso é realmente ótimo!',
    justificativa: '"ja" expressa surpresa agradável com um fato constatado no momento.',
  },
  {
    id: 6,
    fraseOriginal: 'Er ist ... krank.',
    palavraGabarito: 'wohl',
    fraseCompleta: 'Er ist wohl krank.',
    traducao: 'Ele provavelmente está doente.',
    justificativa: '"wohl" sinaliza uma suposição com base em indícios visíveis.',
  },
  {
    id: 7,
    fraseOriginal: 'Das wird ... klappen.',
    palavraGabarito: 'schon',
    fraseCompleta: 'Das wird schon klappen.',
    traducao: 'Isso vai dar certo (fique tranquilo).',
    justificativa: '"schon" tranquiliza e dissipa apreensões futuras.',
  },
  {
    id: 8,
    fraseOriginal: 'Das ist ... so.',
    palavraGabarito: 'eben',
    fraseCompleta: 'Das ist eben so.',
    traducao: 'É assim mesmo (não há o que fazer).',
    justificativa: '"eben" manifesta conformidade e resignação lúcida diante da realidade.',
  },
  {
    id: 9,
    fraseOriginal: 'Dann warte ...!',
    palavraGabarito: 'halt',
    fraseCompleta: 'Dann warte halt!',
    traducao: 'Então espera, ué!',
    justificativa: '"halt" expressa uma solução pragmática e ligeiramente impaciente.',
  },
  {
    id: 10,
    fraseOriginal: 'Mach das ... nicht!',
    palavraGabarito: 'bloß',
    fraseCompleta: 'Mach das bloß nicht!',
    traducao: 'Não faça isso de jeito nenhum!',
    justificativa: '"bloß" intensifica avisos de perigo ou advertências veementes.',
  },
  {
    id: 11,
    fraseOriginal: 'Hast du ... Angst?',
    palavraGabarito: 'etwa',
    fraseCompleta: 'Hast du etwa Angst?',
    traducao: 'Você por acaso está com medo?',
    justificativa: '"etwa" expressa desconfiança ou expectativa retórica provocadora.',
  },
  {
    id: 12,
    fraseOriginal: 'Was willst du ...?',
    palavraGabarito: 'überhaupt',
    fraseCompleta: 'Was willst du überhaupt?',
    traducao: 'O que você quer afinal de contas?',
    justificativa: '"überhaupt" questiona a própria pertinência da presença ou pedido do interlocutor.',
  },
  {
    id: 13,
    fraseOriginal: 'Das gefällt mir ... nicht.',
    palavraGabarito: 'überhaupt',
    fraseCompleta: 'Das gefällt mir überhaupt nicht.',
    traducao: 'Isso não me agrada de forma alguma.',
    justificativa: '"überhaupt nicht" é o reforço absoluto de negação em alemão.',
  },
  {
    id: 14,
    fraseOriginal: '... , das stimmt nicht.',
    palavraGabarito: 'Quatsch',
    fraseCompleta: 'Quatsch, das stimmt nicht.',
    traducao: 'Bobagem, isso não é verdade.',
    justificativa: '"Quatsch" rechaça categoricamente uma afirmação sem fundamento.',
  },
  {
    id: 15,
    fraseOriginal: '... , das ist nicht wahr.',
    palavraGabarito: 'Unsinn',
    fraseCompleta: 'Unsinn, das ist nicht wahr.',
    traducao: 'Absurdo, isso não é verdade.',
    justificativa: '"Unsinn" aponta falta de lógica ou mentira descarada.',
  },
  {
    id: 16,
    fraseOriginal: '... , dass du nicht kommst.',
    palavraGabarito: 'Schade',
    fraseCompleta: 'Schade, dass du nicht kommst.',
    traducao: 'Que pena que você não vem.',
    justificativa: '"Schade" expressa lamentação empática.',
  },
  {
    id: 17,
    fraseOriginal: '... kann ich nicht.',
    palavraGabarito: 'Leider',
    fraseCompleta: 'Leider kann ich nicht.',
    traducao: 'Infelizmente não posso.',
    justificativa: '"Leider" no Vorfeld obriga a inversão com o verbo na Posição II.',
  },
  {
    id: 18,
    fraseOriginal: '... sehr.',
    palavraGabarito: 'Bitte',
    fraseCompleta: 'Bitte sehr.',
    traducao: 'De nada / Às suas ordens.',
    justificativa: 'Fórmula de cortesia após a entrega de um serviço ou objeto.',
  },
  {
    id: 19,
    fraseOriginal: '... schön.',
    palavraGabarito: 'Danke',
    fraseCompleta: 'Danke schön.',
    traducao: 'Muito obrigado.',
    justificativa: 'Fórmula universal de gratidão com afabilidade.',
  },
  {
    id: 20,
    fraseOriginal: '... , wo ist der Bahnhof?',
    palavraGabarito: 'Entschuldigung',
    fraseCompleta: 'Entschuldigung, wo ist der Bahnhof?',
    traducao: 'Com licença, onde fica a estação de trem?',
    justificativa: 'Fórmula ideal para abordar estranhos na rua com polidez.',
  },
  {
    id: 21,
    fraseOriginal: '... , das geht nicht.',
    palavraGabarito: 'Tut mir leid',
    fraseCompleta: 'Tut mir leid, das geht nicht.',
    traducao: 'Sinto muito, isso não dá.',
    justificativa: 'Expressão de recusa com empatia.',
  },
  {
    id: 22,
    fraseOriginal: '... , ich mache das.',
    palavraGabarito: 'Kein Problem',
    fraseCompleta: 'Kein Problem, ich mache das.',
    traducao: 'Sem problema, eu faço isso.',
    justificativa: 'Disponibilidade prestativa descontraída.',
  },
  {
    id: 23,
    fraseOriginal: '... , das passiert.',
    palavraGabarito: 'Macht nichts',
    fraseCompleta: 'Macht nichts, das passiert.',
    traducao: 'Não tem problema, isso acontece.',
    justificativa: 'Alivia a culpa do interlocutor por um pequeno erro.',
  },
  {
    id: 24,
    fraseOriginal: '... ? Das wusste ich nicht.',
    palavraGabarito: 'Echt',
    fraseCompleta: 'Echt? Das wusste ich nicht.',
    traducao: 'Sério? Eu não sabia disso.',
    justificativa: '"Echt?" é a reação coloquial padrão de genuína surpresa.',
  },
  {
    id: 25,
    fraseOriginal: '... ? Das ist ja toll!',
    palavraGabarito: 'Wirklich',
    fraseCompleta: 'Wirklich? Das ist ja toll!',
    traducao: 'Mesmo? Isso é realmente ótimo!',
    justificativa: '"Wirklich?" valida a novidade com entusiasmo.',
  },
  {
    id: 26,
    fraseOriginal: '... ! Das kann nicht sein.',
    palavraGabarito: 'Unglaublich',
    fraseCompleta: 'Unglaublich! Das kann nicht sein.',
    traducao: 'Inacreditável! Não pode ser.',
    justificativa: 'Expressa espanto profundo diante de notícia impactante.',
  },
  {
    id: 27,
    fraseOriginal: '... , jetzt verstehe ich.',
    palavraGabarito: 'Ach so',
    fraseCompleta: 'Ach so, jetzt verstehe ich.',
    traducao: 'Ah, entendi! Agora faz sentido.',
    justificativa: '"Ach so" é a lâmpada que se acende na mente quando algo fica claro.',
  },
  {
    id: 28,
    fraseOriginal: '... , das ist so eine Sache.',
    palavraGabarito: 'Na ja',
    fraseCompleta: 'Na ja, das ist so eine Sache.',
    traducao: 'Bem... essa é uma questão complicada.',
    justificativa: '"Na ja" sinaliza reserva, hesitação ou ponderação comedida.',
  },
  {
    id: 29,
    fraseOriginal: '... ? Das ist mir egal.',
    palavraGabarito: 'Na und',
    fraseCompleta: 'Na und? Das ist mir egal.',
    traducao: 'E daí? Eu não me importo.',
    justificativa: '"Na und?" expressa indiferença ou desafio.',
  },
  {
    id: 30,
    fraseOriginal: '... ? Das verstehe ich nicht.',
    palavraGabarito: 'Wieso',
    fraseCompleta: 'Wieso? Das verstehe ich nicht.',
    traducao: 'Por que motivo? Não entendi isso.',
    justificativa: '"Wieso?" pede elucidação dos motivos causais.',
  },
  {
    id: 31,
    fraseOriginal: '... ? Das ist doch klar.',
    palavraGabarito: 'Warum',
    fraseCompleta: 'Warum? Das ist doch klar.',
    traducao: 'Por quê? Isso é mais do que evidente.',
    justificativa: '"Warum?" com "doch klar" reforça a obviedade da situação.',
  },
  {
    id: 32,
    fraseOriginal: '... , was er will.',
    palavraGabarito: 'Keine Ahnung',
    fraseCompleta: 'Keine Ahnung, was er will.',
    traducao: 'Não faço ideia do que ele quer.',
    justificativa: '"Keine Ahnung" corta a dúvida declarando ignorância absoluta.',
  },
  {
    id: 33,
    fraseOriginal: '... , ob das stimmt.',
    palavraGabarito: 'Ich weiß nicht',
    fraseCompleta: 'Ich weiß nicht, ob das stimmt.',
    traducao: 'Não sei se isso é verdade.',
    justificativa: 'Expressão de incerteza que introduz oração subordinada com "ob".',
  },
  {
    id: 34,
    fraseOriginal: '... komme ich.',
    palavraGabarito: 'Auf jeden Fall',
    fraseCompleta: 'Auf jeden Fall komme ich.',
    traducao: 'De qualquer forma eu vou / Com certeza irei.',
    justificativa: 'Garantia incondicional com inversão sintática no Vorfeld.',
  },
];

// 3.2 Exercício 2 — 20 Traduções para o Alemão
export interface Exercise2TranslationItem {
  id: number;
  pt: string;
  de: string;
  audioText: string;
}

export const EXERCISE_2_TRANSLATIONS: Exercise2TranslationItem[] = [
  { id: 1, pt: 'Olá! Como vai? — Bem, obrigado. E você?', de: "Hallo! Wie geht's? — Gut, danke. Und dir?", audioText: "Hallo! Wie geht's? Gut, danke. Und dir?" },
  { id: 2, pt: 'Como você se chama? — Eu me chamo Ana. Prazer!', de: 'Wie heißt du? — Ich heiße Ana. Freut mich!', audioText: 'Wie heißt du? Ich heiße Ana. Freut mich!' },
  { id: 3, pt: 'De onde você vem? — Eu venho do Brasil. E você?', de: 'Woher kommst du? — Ich komme aus Brasilien. Und du?', audioText: 'Woher kommst du? Ich komme aus Brasilien. Und du?' },
  { id: 4, pt: 'Onde você mora? — Eu moro em São Paulo.', de: 'Wo wohnst du? — Ich wohne in São Paulo.', audioText: 'Wo wohnst du? Ich wohne in São Paulo.' },
  { id: 5, pt: 'Quantos anos você tem? — Eu tenho 30 anos.', de: 'Wie alt bist du? — Ich bin 30 Jahre alt.', audioText: 'Wie alt bist du? Ich bin 30 Jahre alt.' },
  { id: 6, pt: 'O que você faz? — Eu sou professora.', de: 'Was machst du? — Ich bin Lehrerin.', audioText: 'Was machst du? Ich bin Lehrerin.' },
  { id: 7, pt: 'Desculpe, onde fica o banheiro?', de: 'Entschuldigung, wo ist die Toilette?', audioText: 'Entschuldigung, wo ist die Toilette?' },
  { id: 8, pt: 'Muito obrigado! — De nada!', de: 'Vielen Dank! — Bitte sehr!', audioText: 'Vielen Dank! Bitte sehr!' },
  { id: 9, pt: 'Sinto muito, não posso ir.', de: 'Tut mir leid, ich kann nicht kommen.', audioText: 'Tut mir leid, ich kann nicht kommen.' },
  { id: 10, pt: 'Sem problema, eu faço isso.', de: 'Kein Problem, ich mache das.', audioText: 'Kein Problem, ich mache das.' },
  { id: 11, pt: 'Sério? Isso é inacreditável!', de: 'Echt? Das ist unglaublich!', audioText: 'Echt? Das ist unglaublich!' },
  { id: 12, pt: 'Na minha opinião, isso está correto.', de: 'Meiner Meinung nach ist das richtig.', audioText: 'Meiner Meinung nach ist das richtig.' },
  { id: 13, pt: 'Claro, eu te ajudo!', de: 'Klar, ich helfe dir!', audioText: 'Klar, ich helfe dir!' },
  { id: 14, pt: 'De jeito nenhum!', de: 'Auf keinen Fall!', audioText: 'Auf keinen Fall!' },
  { id: 15, pt: 'Bobagem, isso não é verdade.', de: 'Quatsch, das ist nicht wahr.', audioText: 'Quatsch, das ist nicht wahr.' },
  { id: 16, pt: 'Que pena que você não vem.', de: 'Schade, dass du nicht kommst.', audioText: 'Schade, dass du nicht kommst.' },
  { id: 17, pt: 'Infelizmente não tenho tempo.', de: 'Leider habe ich keine Zeit.', audioText: 'Leider habe ich keine Zeit.' },
  { id: 18, pt: 'Até logo! — Tchau!', de: 'Auf Wiedersehen! — Tschüss!', audioText: 'Auf Wiedersehen! Tschüss!' },
  { id: 19, pt: 'Boa sorte! — Obrigado!', de: 'Viel Glück! — Danke!', audioText: 'Viel Glück! Danke!' },
  { id: 20, pt: 'Bom fim de semana!', de: 'Schönes Wochenende!', audioText: 'Schönes Wochenende!' },
];

// 3.3 Exercício 3 — Os 8 Diálogos Cotidianos Completos
export interface DialogueLine {
  speaker: string;
  de: string;
  pt: string;
}

export interface DialogueItem {
  id: number;
  titulo: string;
  subtitulo: string;
  falas: DialogueLine[];
}

export const DIALOGUES_8_DATA: DialogueItem[] = [
  {
    id: 1,
    titulo: 'Diálogo 1: Encontro Casual na Rua',
    subtitulo: 'Uso de denn, mal, ach so, na dann',
    falas: [
      { speaker: 'A', de: "Hallo! Wie geht's?", pt: 'Olá! Como vai?' },
      { speaker: 'B', de: 'Gut, danke. Und dir?', pt: 'Bem, obrigado. E você?' },
      { speaker: 'A', de: 'Auch gut. Was machst du denn hier?', pt: 'Também bem. O que você está fazendo aqui afinal?' },
      { speaker: 'B', de: 'Ich warte auf einen Freund. Und du?', pt: 'Estou esperando um amigo. E você?' },
      { speaker: 'A', de: 'Ich gehe mal ein bisschen spazieren.', pt: 'Vou dar uma caminhada rápida.' },
      { speaker: 'B', de: 'Ach so. Na dann, viel Spaß!', pt: 'Ah, entendi. Bom, então, divirta-se!' },
      { speaker: 'A', de: 'Danke! Bis später!', pt: 'Obrigado! Até mais tarde!' },
      { speaker: 'B', de: 'Tschüss!', pt: 'Tchau!' },
    ],
  },
  {
    id: 2,
    titulo: 'Diálogo 2: No Café',
    subtitulo: 'Pedidos com möchten, bitte, stimmt so, ebenfalls',
    falas: [
      { speaker: 'Kellner', de: 'Guten Tag! Was möchten Sie?', pt: 'Boa tarde! O que os senhores gostariam?' },
      { speaker: 'Gast', de: 'Ich möchte bitte einen Kaffee.', pt: 'Eu gostaria de um café, por favor.' },
      { speaker: 'Kellner', de: 'Bitte sehr. Sonst noch etwas?', pt: 'Aqui está. Mais alguma coisa?' },
      { speaker: 'Gast', de: 'Nein, danke.', pt: 'Não, obrigado.' },
      { speaker: 'Kellner', de: 'Das macht 3,50 Euro.', pt: 'Fica em 3,50 euros.' },
      { speaker: 'Gast', de: 'Bitte. Stimmt so.', pt: 'Aqui está. Pode ficar com o troco.' },
      { speaker: 'Kellner', de: 'Vielen Dank! Einen schönen Tag noch!', pt: 'Muito obrigado! Tenha um bom resto de dia!' },
      { speaker: 'Gast', de: 'Danke, ebenfalls!', pt: 'Obrigado, igualmente!' },
    ],
  },
  {
    id: 3,
    titulo: 'Diálogo 3: Pedindo Informação na Cidade',
    subtitulo: 'Fórmulas de orientação com Entschuldigung, mal, ach so',
    falas: [
      { speaker: 'Tourist', de: 'Entschuldigung, wo ist der Bahnhof?', pt: 'Com licença, onde fica a estação de trem?' },
      { speaker: 'Passant', de: 'Der Bahnhof? Gehen Sie mal geradeaus, dann links.', pt: 'A estação? Siga direto em frente, depois à esquerda.' },
      { speaker: 'Tourist', de: 'Ach so, geradeaus und dann links. Vielen Dank!', pt: 'Ah, entendi, em frente e depois à esquerda. Muito obrigado!' },
      { speaker: 'Passant', de: 'Bitte sehr. Kein Problem.', pt: 'De nada. Sem problema.' },
      { speaker: 'Tourist', de: 'Auf Wiedersehen!', pt: 'Até logo!' },
      { speaker: 'Passant', de: 'Tschüss!', pt: 'Tchau!' },
    ],
  },
  {
    id: 4,
    titulo: 'Diálogo 4: Discordando Educadamente',
    subtitulo: 'Matizes com echt, na ja, genau, eben, halt',
    falas: [
      { speaker: 'A', de: 'Ich finde, dieser Film ist toll.', pt: 'Eu acho esse filme maravilhoso.' },
      { speaker: 'B', de: 'Echt? Ich finde ihn ziemlich langweilig.', pt: 'Sério? Eu o acho bastante chato.' },
      { speaker: 'A', de: 'Wirklich? Warum denn?', pt: 'Mesmo? Por que afinal?' },
      { speaker: 'B', de: 'Na ja, die Geschichte ist zu langsam.', pt: 'Bem... a história é lenta demais.' },
      { speaker: 'A', de: 'Das stimmt, aber die Schauspieler sind gut.', pt: 'É verdade, mas os atores são muito bons.' },
      { speaker: 'B', de: 'Genau, das schon. Aber trotzdem...', pt: 'Exato, isso sim. Mas mesmo assim...' },
      { speaker: 'A', de: 'Na ja, Geschmäcker sind verschieden.', pt: 'Bem, gostos não se discutem.' },
      { speaker: 'B', de: 'Eben. So ist das halt.', pt: 'Exatamente. É assim mesmo, ué.' },
    ],
  },
  {
    id: 5,
    titulo: 'Diálogo 5: Recusando um Convite com Empatia',
    subtitulo: 'Regência de leider, schade, tut mir leid, bis bald',
    falas: [
      { speaker: 'A', de: 'Kommst du mit ins Kino?', pt: 'Você vem comigo ao cinema?' },
      { speaker: 'B', de: 'Leider kann ich nicht. Ich muss arbeiten.', pt: 'Infelizmente não posso. Preciso trabalhar.' },
      { speaker: 'A', de: 'Schade! Wirklich?', pt: 'Que pena! Mesmo?' },
      { speaker: 'B', de: 'Tut mir leid. Nächstes Mal bestimmt.', pt: 'Sinto muito. Da próxima vez com certeza.' },
      { speaker: 'A', de: 'Kein Problem. Dann bis bald!', pt: 'Sem problema. Então até breve!' },
      { speaker: 'B', de: "Bis bald! Mach's gut!", pt: 'Até breve! Cuide-se!' },
    ],
  },
  {
    id: 6,
    titulo: 'Diálogo 6: Surpresa e Comemoração',
    subtitulo: 'Entusiasmo com echt, unglaublich, viel Erfolg, klar',
    falas: [
      { speaker: 'A', de: 'Ich habe gerade eine Stelle bekommen!', pt: 'Acabei de conseguir um emprego!' },
      { speaker: 'B', de: 'Echt? Unglaublich! Herzlichen Glückwunsch!', pt: 'Sério? Inacreditável! Meus parabéns!' },
      { speaker: 'A', de: 'Danke! Ich bin so glücklich!', pt: 'Obrigado! Estou tão feliz!' },
      { speaker: 'B', de: 'Das glaube ich! Viel Erfolg!', pt: 'Imagino bem! Muito sucesso!' },
      { speaker: 'A', de: 'Danke! Auf jeden Fall rufe ich dich an!', pt: 'Obrigado! De qualquer forma eu te ligo!' },
      { speaker: 'B', de: 'Klar! Bis dann!', pt: 'Com certeza! Até lá!' },
    ],
  },
  {
    id: 7,
    titulo: 'Diálogo 7: Chamada Telefônica Amistosa',
    subtitulo: 'Expressões sag mal, vielleicht, warum denn, ach so',
    falas: [
      { speaker: 'A', de: 'Hallo, hier ist Ana.', pt: 'Alô, aqui é a Ana.' },
      { speaker: 'B', de: "Hallo Ana, hier ist Peter. Wie geht's?", pt: 'Olá Ana, aqui é o Peter. Como vai?' },
      { speaker: 'A', de: 'Gut, danke. Und dir?', pt: 'Bem, obrigada. E você?' },
      { speaker: 'B', de: 'Auch gut. Sag mal, hast du vielleicht morgen Zeit?', pt: 'Também bem. Diga lá, você talvez teria tempo amanhã?' },
      { speaker: 'A', de: 'Vielleicht. Warum denn?', pt: 'Talvez. Por que afinal?' },
      { speaker: 'B', de: 'Wir wollen mal wieder zusammen essen gehen.', pt: 'Queremos sair de novo juntos para comer.' },
      { speaker: 'A', de: 'Ach so! Klar, das mache ich gerne!', pt: 'Ah, entendi! Claro, com o maior prazer!' },
      { speaker: 'B', de: 'Super! Dann bis morgen!', pt: 'Ótimo! Então até amanhã!' },
      { speaker: 'A', de: 'Bis morgen! Tschüss!', pt: 'Até amanhã! Tchau!' },
    ],
  },
  {
    id: 8,
    titulo: 'Diálogo 8: Ponderação e Concessão Educada',
    subtitulo: 'Combinações com eigentlich, halt, quatsch, trotzdem',
    falas: [
      { speaker: 'A', de: 'Ich denke, wir sollten jetzt gehen.', pt: 'Eu acho que deveríamos ir embora agora.' },
      { speaker: 'B', de: 'Wirklich? Ich bin mir nicht sicher.', pt: 'Mesmo? Não tenho certeza.' },
      { speaker: 'A', de: 'Wieso? Es ist schon spät.', pt: 'Por quê? Já está tarde.' },
      { speaker: 'B', de: 'Na ja, ich möchte eigentlich noch etwas bleiben.', pt: 'Bem... na verdade eu gostaria de ficar mais um pouco.' },
      { speaker: 'A', de: 'Ach so. Kein Problem, dann warte ich halt.', pt: 'Ah, compreendi. Sem problemas, então eu espero, ué.' },
      { speaker: 'B', de: 'Danke! Du bist echt nett.', pt: 'Obrigado! Você é realmente gentil.' },
      { speaker: 'A', de: 'Quatsch, das ist doch normal.', pt: 'Imagina, bobagem, isso é a coisa mais normal.' },
      { speaker: 'B', de: 'Na ja, trotzdem danke.', pt: 'Bem, mesmo assim, muito obrigado.' },
      { speaker: 'A', de: 'Bitte!', pt: 'De nada!' },
    ],
  },
];

// 3.4 & 3.5 Tradução Reversa de Blindagem (20 Desafios Ativos)
export interface ReverseTranslationItem7 {
  id: number;
  pt: string;
  de: string;
  justificativa: string;
}

export const REVERSE_TRANSLATION_LESSON_7: ReverseTranslationItem7[] = [
  {
    id: 1,
    pt: 'Olá! Como vai? — Bem, obrigado. E você?',
    de: "Hallo! Wie geht's? — Gut, danke. Und dir?",
    justificativa: '"Wie geht\'s" é contração fixa de "Wie geht es dir/Ihnen". "Und dir" exige o pronome pessoal no Dativo (du → dir).',
  },
  {
    id: 2,
    pt: 'Como você se chama? — Eu me chamo Ana. Prazer!',
    de: 'Wie heißt du? — Ich heiße Ana. Freut mich!',
    justificativa: 'O verbo "heißen" na 2ª pessoa do singular recebe apenas "-t" (du heißt) pois o radical termina em sibilante (ß). "Freut mich" é elipse de "(Es) freut mich".',
  },
  {
    id: 3,
    pt: 'De onde você vem? — Eu venho do Brasil.',
    de: 'Woher kommst du? — Ich komme aus Brasilien.',
    justificativa: '"Woher" indica procedência. A preposição "aus" rege Dativo; nomes de países neutros como Brasilien não recebem artigo.',
  },
  {
    id: 4,
    pt: 'Onde você mora? — Eu moro em São Paulo.',
    de: 'Wo wohnst du? — Ich wohne in São Paulo.',
    justificativa: '"Wo" pergunta por localização estática. "in" com cidades nunca requer artigo.',
  },
  {
    id: 5,
    pt: 'Quantos anos você tem? — Eu tenho 30 anos.',
    de: 'Wie alt bist du? — Ich bin 30 Jahre alt.',
    justificativa: 'Em alemão a idade é expressa com o verbo "sein" (Ich bin ... Jahre alt), jamais com "haben".',
  },
  {
    id: 6,
    pt: 'O que você faz? — Eu sou professora.',
    de: 'Was machst du? — Ich bin Lehrerin.',
    justificativa: 'Profissões no predicativo não levam artigo em alemão neutro: "Ich bin Lehrerin" (não "Ich bin eine Lehrerin").',
  },
  {
    id: 7,
    pt: 'Desculpe, onde fica o banheiro?',
    de: 'Entschuldigung, wo ist die Toilette?',
    justificativa: '"die Toilette" é feminino; "wo ist" indica busca espacial imediata.',
  },
  {
    id: 8,
    pt: 'Muito obrigado! — De nada!',
    de: 'Vielen Dank! — Bitte sehr!',
    justificativa: '"Vielen Dank" é acusativo de saudação ("Ich wünsche Ihnen vielen Dank"). "Bitte sehr" é fórmula polida consagrada.',
  },
  {
    id: 9,
    pt: 'Sinto muito, não posso ir.',
    de: 'Tut mir leid, ich kann nicht kommen.',
    justificativa: '"Tut mir leid" manifesta pesar. O verbo modal "können" (ich kann) empurra o infinitivo principal "kommen" para o final da frase.',
  },
  {
    id: 10,
    pt: 'Sem problema, eu faço isso.',
    de: 'Kein Problem, ich mache das.',
    justificativa: '"Kein Problem" nega o substantivo neutro "Problem" com "kein". "das" funciona como objeto demonstrativo no acusativo.',
  },
  {
    id: 11,
    pt: 'Sério? Isso é inacreditável!',
    de: 'Echt? Das ist unglaublich!',
    justificativa: '"Echt" funciona como advérbio coloquial interrogativo. "unglaublich" compõe o predicativo com o prefixo negativo un-.',
  },
  {
    id: 12,
    pt: 'Na minha opinião, isso está correto.',
    de: 'Meiner Meinung nach ist das richtig.',
    justificativa: '"Meiner Meinung nach" coloca a postposição "nach" regendo o dativo feminino de "Meinung" (die Meinung → meiner Meinung). Gera inversão com o verbo na Posição II (ist das).',
  },
  {
    id: 13,
    pt: 'Claro, eu te ajudo!',
    de: 'Klar, ich helfe dir!',
    justificativa: 'O verbo "helfen" rege obrigatoriamente o caso Dativo: helfe + dir (não dich!).',
  },
  {
    id: 14,
    pt: 'De jeito nenhum!',
    de: 'Auf keinen Fall!',
    justificativa: 'Expressão idiomática fixa com a preposição "auf" + acusativo masculino (der Fall → keinen Fall).',
  },
  {
    id: 15,
    pt: 'Bobagem, isso não é verdade.',
    de: 'Quatsch, das ist nicht wahr.',
    justificativa: '"Quatsch" rechaça falsidades. A negação do adjetivo predicativo "wahr" exige "nicht".',
  },
  {
    id: 16,
    pt: 'Que pena que você não vem.',
    de: 'Schade, dass du nicht kommst.',
    justificativa: '"Schade" rege oração completiva com a conjunção "dass", o que obriga o verbo conjugado "kommst" a ir para o final absoluto.',
  },
  {
    id: 17,
    pt: 'Infelizmente não tenho tempo.',
    de: 'Leider habe ich keine Zeit.',
    justificativa: '"Leider" no Vorfeld provoca a inversão sintática imediata: Verbo (habe) na Posição II + Sujeito (ich) na Posição III. "die Zeit" é negada com "keine".',
  },
  {
    id: 18,
    pt: 'Até logo! — Tchau!',
    de: 'Auf Wiedersehen! — Tschüss!',
    justificativa: 'Contraste clássico entre a fórmula formal (Auf Wiedersehen) e a informal universal (Tschüss).',
  },
  {
    id: 19,
    pt: 'Boa sorte! — Obrigado!',
    de: 'Viel Glück! — Danke!',
    justificativa: '"Glück" é substantivo neutro de massa sem artigo; recebe o quantificador invariável "viel".',
  },
  {
    id: 20,
    pt: 'Bom fim de semana!',
    de: 'Schönes Wochenende!',
    justificativa: 'Acusativo de saudação do substantivo neutro "das Wochenende" com adjetivo em declinação forte: Schönes Wochenende!',
  },
];

// 3.6 Resumo dos Pontos-Chave da Rodada Extra (10 Mandamentos de Sobrevivência)
export interface SurvivalKeyPoint {
  numero: number;
  conceito: string;
  regra: string;
}

export const SURVIVAL_KEY_POINTS: SurvivalKeyPoint[] = [
  {
    numero: 1,
    conceito: 'Modalpartikeln',
    regra: 'doch, mal, ja, denn, eigentlich, vielleicht, wohl, schon, eben, halt, bloß, etwa, überhaupt, ruhig, einfach não mudam a gramática, mas injetam humanidade, tom e naturalidade instantânea na fala alemã.',
  },
  {
    numero: 2,
    conceito: 'Concordância (Zustimmung)',
    regra: 'Use "Ja", "Klar", "Natürlich", "Genau", "Stimmt", "Richtig", "Eben", "Sicher" e "Auf jeden Fall" para confirmar acordos com rapidez e exatidão.',
  },
  {
    numero: 3,
    conceito: 'Discordância (Ablehnung)',
    regra: 'Domine a escala de negação: desde o polido "Leider / Schade / Tut mir leid" até a ênfase categórica "Auf keinen Fall / Quatsch / Unsinn / Überhaupt nicht".',
  },
  {
    numero: 4,
    conceito: 'Dúvida & Relativização',
    regra: 'Matize declarações com "Vielleicht", "Möglicherweise", "Wahrscheinlich", "Vermutlich", "Angeblich", "Ich weiß nicht" e o expressivo "Keine Ahnung".',
  },
  {
    numero: 5,
    conceito: 'Intensidade & Quantidade',
    regra: 'Gradue suas frases com "Sehr, Ziemlich, Ganz, Total, Fast, Kaum, Nur, Ein bisschen, Genug, Zuviel" e o perigoso excesso "Zu + Adjektiv".',
  },
  {
    numero: 6,
    conceito: 'Tempo & Sequência',
    regra: 'Estruture eventos diários com "Jetzt, Gleich, Sofort, Später, Dann, Danach, Vorher, Heute, Gestern, Morgen, Immer, Oft, Manchmal, Nie" e respeite a inversão quando estiverem na Posição I.',
  },
  {
    numero: 7,
    conceito: 'Polidez Essencial',
    regra: 'Nunca economize "Bitte, Danke, Entschuldigung, Tut mir leid, Kein Problem, Macht nichts, Gern geschehen" e "Wie bitte?" no cotidiano nos países de língua alemã.',
  },
  {
    numero: 8,
    conceito: 'Reações Instantâneas',
    regra: 'Demonstre escuta ativa com "Echt?, Wirklich?, Unglaublich!, Ach so!, Na ja, Na und?, Wieso?, Warum? e Mensch!".',
  },
  {
    numero: 9,
    conceito: 'Saudações & Despedidas',
    regra: 'Varie com elegância entre "Hallo, Guten Morgen/Tag/Abend, Gute Nacht, Tschüss, Auf Wiedersehen, Bis später, Bis bald" e o acolhedor "Mach\'s gut!".',
  },
  {
    numero: 10,
    conceito: 'Opinião & Argumentação',
    regra: 'Articule pontos de vista com segurança usando "Ich denke, dass...", "Ich glaube...", "Ich finde...", "Meiner Meinung nach...", "Das heißt" e "Ehrlich gesagt".',
  },
];
