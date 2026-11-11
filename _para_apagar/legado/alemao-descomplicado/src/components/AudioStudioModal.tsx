import React, { useState } from 'react';
import { X, Play, Square, Mic, MicOff, CheckCircle2, Headphones, Globe, Volume2 } from 'lucide-react';
import { speechEngine } from '../utils/speech';
import { AudioButton } from './AudioButton';

interface AudioStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AudioTrack {
  id: string;
  lesson: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  title: string;
  category: string;
  deText: string;
  ptText: string;
  note?: string;
  isSpelling?: boolean;
}

const AUDIO_TRACKS: AudioTrack[] = [
  // Aula 01
  {
    id: 'a1-franziska',
    lesson: 1,
    title: 'Texto A1 — Apresentação: Franziska Binder',
    category: 'A1 · Sich vorstellen',
    deText: 'Guten Morgen. Ich heiße Franziska Binder. Ich bin 37 Jahre alt. Ich wohne in Wien. Ich bin Lehrerin. Meine Muttersprache ist Deutsch. Ich spreche auch Spanisch und Englisch.',
    ptText: 'Bom dia. Eu me chamo Franziska Binder. Eu tenho 37 anos de idade. Eu moro em Viena. Eu sou professora. Minha língua materna é o alemão. Eu falo também espanhol e inglês.',
    note: 'Observe a ausência de artigo em "Ich bin Lehrerin" e a Posição II do verbo.',
  },
  {
    id: 'a1-peter',
    lesson: 1,
    title: 'Texto A1 — Apresentação: Peter Heinemann',
    category: 'A1 · Sich vorstellen',
    deText: 'Guten Tag. Mein Name ist Peter Heinemann. Ich bin 35 Jahre alt. Ich komme aus Marburg. Ich bin Informatiker. Meine Muttersprache ist Deutsch. Ich lerne jetzt Japanisch.',
    ptText: 'Bom dia. Meu nome é Peter Heinemann. Eu tenho 35 anos de idade. Eu venho de Marburg. Eu sou cientista da computação. Minha língua materna é o alemão. Eu aprendo agora japonês.',
    note: 'Note o advérbio "jetzt" no Vorfeld gerando a inversão: lerne ich.',
  },
  {
    id: 'a1-sarah',
    lesson: 1,
    title: 'Texto A1 — Apresentação: Sarah Mounier',
    category: 'A1 · Sich vorstellen',
    deText: 'Hallo. Mein Vorname ist Sarah. Mein Familienname ist Mounier. Ich bin 22 Jahre alt. Ich komme aus Frankreich. Ich bin Studentin. Ich studiere in Paris Medizin. Meine Muttersprache ist Französisch. Ich spreche sehr gut Englisch und ein bisschen Spanisch.',
    ptText: 'Olá. Meu primeiro nome é Sarah. Meu sobrenome é Mounier. Eu tenho 22 anos de idade. Eu venho da França. Eu sou estudante. Eu estudo em Paris medicina. Minha língua materna é o francês. Eu falo muito bem inglês e um pouco de espanhol.',
    note: 'Diferenciação clara entre Vorname e Familienname.',
  },
  {
    id: 'a2-qa',
    lesson: 1,
    title: 'Texto A2 — Entrevista de Apresentação (Perguntas e Respostas)',
    category: 'A2 · Fragen und Antworten',
    deText: 'Wie heißen Sie? Ich heiße Franziska Binder. Wie alt sind Sie? Ich bin 37 Jahre alt. Woher kommen Sie? Ich komme aus Österreich. Wo wohnen Sie? Ich wohne in Wien. Was sind Sie von Beruf? Ich bin Lehrerin. Welche Sprachen sprechen Sie? Meine Muttersprache ist Deutsch.',
    ptText: 'Como se chama? Eu me chamo Franziska Binder. Quantos anos tem? Eu tenho 37 anos de idade. De onde vem? Eu venho da Áustria. Onde mora? Eu moro em Viena. Qual é sua profissão? Eu sou professora. Quais línguas fala? Minha língua materna é o alemão.',
    note: 'W-Fragen com verbo na Posição II e resposta direta.',
  },
  {
    id: 'a6-melodie',
    lesson: 1,
    title: 'Exercício A6 — Fonética: Melodia da Frase (Satzmelodie)',
    category: 'A6 · Satzmelodie',
    deText: 'Ich heiße Franziska Binder. Mein Name ist Peter Heinemann. Ich wohne in Marburg. Und Sie? Wie heißen Sie? Wo wohnen Sie?',
    ptText: 'Eu me chamo Franziska Binder (descendente). Meu nome é Peter Heinemann (descendente). Eu moro em Marburg (descendente). E o senhor/a senhora? (ascendente). Como se chama? (descendente). Onde você mora? (descendente).',
    note: 'Declarativas e W-Fragen têm entonação descendente. Perguntas sim/não têm entonação ascendente.',
  },
  {
    id: 'a8-alphabet',
    lesson: 1,
    title: 'Exercício A8 — Fonética: O Alfabeto Completo (Das Alphabet)',
    category: 'A8 · Das Alphabet',
    deText: 'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z. Ä, Ö, Ü, ß.',
    ptText: 'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z. A-Umlaut, O-Umlaut, U-Umlaut, Eszett.',
    note: 'Pronúncia pura das 26 letras e das 4 variantes fonéticas alemãs.',
  },
  {
    id: 'a9-spelling',
    lesson: 1,
    title: 'Exercício A9 — Nomes Alemães Soletrados na Escuta',
    category: 'A9 · Wie heißen die Leute?',
    deText: 'Müller. Schmidt. Schneider. Fischer. Weber. Meyer. Wagner. Becker.',
    ptText: 'Müller. Schmidt. Schneider. Fischer. Weber. Meyer. Wagner. Becker. (Nomes frequentes para treino de escuta e escrita).',
    note: 'Treino de soletração auditiva (buchstabieren).',
  },
  {
    id: 'a10-cities',
    lesson: 1,
    title: 'Exercício A10 — Cidades, Países e Soletração',
    category: 'A10 · Geografia & Soletração',
    deText: 'Woher kommen Sie? Ich komme aus Düsseldorf. Ich buchstabiere: D-ü-s-s-e-l-d-o-r-f. Düsseldorf ist in Deutschland.',
    ptText: 'De onde você vem? Eu venho de Düsseldorf. Eu soletro: D-ü-s-s-e-l-d-o-r-f. Düsseldorf fica na Alemanha.',
    note: 'Estrutura modelo para perguntas sobre cidades e países.',
  },

  // Aula 02
  {
    id: 'a17-sprachen',
    lesson: 2,
    title: 'Texto A17 — Sprachen und Länder (Línguas e Países)',
    category: 'A17 · Países e Idiomas',
    deText: 'In Spanien spricht man Spanisch. In Deutschland spricht man Deutsch. In Portugal spricht man Portugiesisch. In England spricht man Englisch. In Italien spricht man Italienisch. In Russland spricht man Russisch. In Polen spricht man Polnisch. In Japan spricht man Japanisch.',
    ptText: 'Na Espanha fala-se espanhol. Na Alemanha fala-se alemão. Em Portugal fala-se português. Na Inglaterra fala-se inglês. Na Itália fala-se italiano. Na Rússia fala-se russo. Na Polônia fala-se polonês. No Japão fala-se japonês.',
    note: 'Uso do pronome impessoal "man" conjugado estritamente na 3ª pessoa do singular (spricht).',
  },
  {
    id: 'a18-phonetik-sch-sp',
    lesson: 2,
    title: 'Texto A18 — Phonetik: sch [ʃ] und sp [ʃp]',
    category: 'A18 · Fonética sch/sp',
    deText: 'sch: Deutsch, Spanisch, Russisch, schreiben, Schweiz. sp: Sprache, sprechen, spät, Spanien, spielen. Welche Sprachen sprechen Sie?',
    ptText: 'sch: alemão, espanhol, russo, escrever, Suíça. sp: idioma, falar, tarde, Espanha, jogar/tocar. Quais línguas o senhor/a senhora fala?',
    note: 'O dígrafo "sch" soa como "ch" de chave. O grupo inicial "sp" soa "ch+p" com sopro sibilante palatal.',
  },
  {
    id: 'a19-sprechen-sie',
    lesson: 2,
    title: 'Texto A19 — Sprechen Sie ...? (Competência Linguística)',
    category: 'A19 · Interrogativas',
    deText: 'Sprechen Sie Spanisch? Ja, ein bisschen. Sprechen Sie Italienisch? Nein, leider nicht. Sprechen Sie Deutsch? Ja, sehr gut. Sprechen Sie Türkisch? Nein, gar nicht.',
    ptText: 'Você fala espanhol? Sim, um pouco. Você fala italiano? Não, infelizmente não. Você fala alemão? Sim, muito bem. Você fala turco? Não, de jeito nenhum.',
    note: 'Perguntas diretas (Ja-Nein-Fragen) com o verbo na Posição 1 e respostas com fórmulas polidas.',
  },
  {
    id: 'a20-muttersprache',
    lesson: 2,
    title: 'Texto A20 — Ihre Muttersprache (Relato de Entrevista)',
    category: 'A20 · Possessivos & Relatos',
    deText: 'Ich komme aus Brasilien. Meine Muttersprache ist Portugiesisch. Mein Nachbar kommt aus Spanien. Seine Muttersprache ist Spanisch. Meine Nachbarin kommt aus Italien. Ihre Muttersprache ist Italienisch.',
    ptText: 'Eu venho do Brasil. Minha língua materna é o português. Meu vizinho vem da Espanha. A língua materna dele é o espanhol. Minha vizinha vem da Itália. A língua materna dela é o italiano.',
    note: 'Concordância dos pronomes possessivos mein, sein, ihr com substantivo feminino (Muttersprache) gerando terminação em -e.',
  },
  {
    id: 'a21-phonetik-ei',
    lesson: 2,
    title: 'Texto A21 — Phonetik: Diphthong ei [aɪ]',
    category: 'A21 · Fonética ei',
    deText: 'ein, heißen, mein, dein, Heinemann, Heimatstadt, Schweiz, Malerei, Türkei. Mein Name ist Heinemann. Ich komme aus der Schweiz.',
    ptText: 'um, chamar-se, meu, teu, Heinemann, cidade natal, Suíça, pintura, Turquia. Meu nome é Heinemann. Eu venho da Suíça.',
    note: 'O ditongo "ei" é pronunciado rigorosamente como "ai" em português.',
  },
  {
    id: 'a22-flugzeuge',
    lesson: 2,
    title: 'Texto A22 — Aus welchem Land kommt das Flugzeug?',
    category: 'A22 · Aeroporto & Países',
    deText: 'Das Flugzeug aus Barcelona kommt aus Spanien. Das Flugzeug aus Rom kommt aus Italien. Das Flugzeug aus Bern kommt aus der Schweiz. Das Flugzeug aus Ankara kommt aus der Türkei. Das Flugzeug aus São Paulo kommt aus Brasilien.',
    ptText: 'O avião de Barcelona vem da Espanha. O avião de Roma vem da Itália. O avião de Berna vem da Suíça. O avião de Ancara vem da Turquia. O avião de São Paulo vem do Brasil.',
    note: 'Atenção aos países femininos no dativo: "aus der Schweiz", "aus der Türkei".',
  },
  {
    id: 'a24-fluege',
    lesson: 2,
    title: 'Texto A24 — Flüge (Anúncios de Voos no Aeroporto)',
    category: 'A24 · Voos & Minutos',
    deText: 'Flug LH 3144 aus Rom landet in zehn Minuten. Flug IB 3522 aus Madrid landet in zwanzig Minuten. Flug OS 402 aus Wien landet in fünf Minuten. Flug LH 4301 aus Paris landet in dreißig Minuten.',
    ptText: 'O voo LH 3144 de Roma aterrissa em dez minutos. O voo IB 3522 de Madri aterrissa em vinte minutos. O voo OS 402 de Viena aterrissa em cinco minutos. O voo LH 4301 de Paris aterrissa em trinta minutos.',
    note: 'Inflexão do verbo landen com -e- epentético: das Flugzeug landet.',
  },
  {
    id: 'a26-telefon',
    lesson: 2,
    title: 'Texto A26 — Notrufnummern und Telefonnummern',
    category: 'A26 · Telefones de Emergência',
    deText: 'Polizei: 110 (eins-eins-null). Feuerwehr: 112 (eins-eins-zwei). Notarzt: 112 (eins-eins-zwei). Auskunft: 11833 (eins-eins-acht-drei-drei). Welche Telefonnummer hat Frau Kirsch? Sie hat die Nummer 67 21 09.',
    ptText: 'Polícia: 110. Corpo de Bombeiros: 112. Médico de Emergência: 112. Serviço de Informações: 11833. Qual é o número de telefone da Sra. Kirsch? Ela tem o número 67 21 09.',
    note: 'Números de emergência vitais e leitura dígito a dígito ou em blocos decimais.',
  },
  // Aula 03
  {
    id: 'b1-bevoelkerung',
    lesson: 3,
    title: 'Texto B1 — Wo wohnen die meisten Menschen?',
    category: 'B1 · Demografia & Cifras',
    deText: 'Auf der Erde leben rund 6,6 Milliarden Menschen. Wo wohnen die meisten Menschen? In Asien, in Afrika oder in Europa? In China und in Indien wohnen die meisten Menschen. In Deutschland wohnen rund 82 Millionen Menschen.',
    ptText: 'Na Terra vivem cerca de 6,6 bilhões de pessoas. Onde vive a maioria das pessoas? Na Ásia, na África ou na Europa? Na China e na Índia vivem a maioria das pessoas. Na Alemanha vivem cerca de 82 milhões de pessoas.',
    note: 'Millionen e Milliarden como substantivos femininos regidos por algarismos.',
  },
  {
    id: 'b3-dach',
    lesson: 3,
    title: 'Texto B3 — D-A-CH (Deutschland, Österreich, Schweiz)',
    category: 'B3 · Países de Língua Alemã',
    deText: 'Deutschland hat sechzehn Bundesländer. Die Hauptstadt heißt Berlin. Österreich hat neun Bundesländer und die Hauptstadt heißt Wien. Die Schweiz hat sechsundzwanzig Kantone und vier offizielle Sprachen: Deutsch, Französisch, Italienisch und Rätoromanisch.',
    ptText: 'A Alemanha tem dezesseis estados federados. A capital chama-se Berlim. A Áustria tem nove estados federados e a capital chama-se Viena. A Suíça tem 26 cantões e quatro línguas oficiais.',
    note: 'Sintaxe canônica com haben e nomes próprios geográficos.',
  },
  {
    id: 'c1-personalpronomen-verben',
    lesson: 3,
    title: 'Texto C1 — Personalpronomen und Verben im Präsens (singen, kommen, lernen, spielen, arbeiten, heißen)',
    category: 'C1 · Conjugação Regular e Particularidades',
    deText: 'singen, kommen, lernen, spielen, arbeiten, heißen. Ich singe, ich komme, ich lerne, ich spiele, ich arbeite, ich heiße. Du singst, du kommst, du lernst, du spielst, du arbeitest, du heißt. Er singt, er kommt, er lernt, er spielt, er arbeitet, er heißt. Wir singen, wir kommen, wir lernen, wir spielen, wir arbeiten, wir heißen. Ihr singt, ihr kommt, ihr lernt, ihr spielt, ihr arbeitet, ihr heißt. Sie singen, Sie kommen, Sie lernen, Sie spielen, Sie arbeiten, Sie heißen.',
    ptText: 'Cantar, vir, aprender, jogar/tocar, trabalhar, chamar-se. Eu canto, venho, aprendo, jogo, trabalho, me chamo. Tu cantas, vens, aprendes, jogas, trabalhas, te chamas. Ele canta, vem, aprende, joga, trabalha, se chama. Nós cantamos, vimos, aprendemos, jogamos, trabalhamos, nos chamamos. Vós cantais, vindes, aprendeis, jogais, trabalhais, vos chamais. Eles/Os senhores cantam, vêm, aprendem, jogam, trabalham, se chamam.',
    note: 'Matriz canônica de conjugação regular no presente (-e, -st, -t, -en, -t, -en, -en), com epêntese eufônica em radicais em -t (arbeiten: arbeitest, arbeitet) e fusão sibilante em radicais em -ß (heißen: heißt).',
  },
  {
    id: 'c3-dialog',
    lesson: 3,
    title: 'Texto C3 — Diálogo Conrad & Serena',
    category: 'C3 · Diálogo de Apresentação',
    deText: 'Guten Tag, mein Name ist Conrad Kremer. Und wie heißen Sie? Ich heiße Serena Rosso. Sind Sie Deutscher? Ja, ich komme aus Köln und wohne jetzt in Frankfurt. Und Sie? Ich komme aus Italien, aber ich lebe und arbeite jetzt in Deutschland.',
    ptText: 'Bom dia, meu nome é Conrad Kremer. E como você se chama? Eu me chamo Serena Rosso. O senhor é alemão? Sim, eu venho de Colônia e moro agora em Frankfurt. E você? Eu venho da Itália, mas vivo e trabalho agora na Alemanha.',
    note: 'Diálogo completo com alternância de Vorfeld e Posição II do verbo.',
  },
  {
    id: 'c6-sandra',
    lesson: 3,
    title: 'Texto C6 — Perfil de Sandra Schmidt',
    category: 'C6 · Compreensão Auditiva',
    deText: 'Sandra Schmidt kommt aus Deutschland und wohnt in Hamburg. Sie ist 31 Jahre alt. Sie ist Ärztin von Beruf. Sie ist ledig und hat keine Kinder. In ihrer Freizeit spielt sie Tennis und hört Musik.',
    ptText: 'Sandra Schmidt vem da Alemanha e mora em Hamburgo. Ela tem 31 anos de idade. Ela é médica de profissão. Ela é solteira e não tem filhos. No seu tempo livre, ela joga tênis e ouve música.',
    note: 'Estruturas de estado civil (ledig), ausência de filhos (keine Kinder) e hobbies no Vorfeld.',
  },
  {
    id: 'd1-redemittel',
    lesson: 3,
    title: 'Texto D1 — Wichtige Redemittel (Apresentação Completa)',
    category: 'D1 · Repertório Ativo',
    deText: 'Wie ist Ihr Name? Mein Name ist Thomas Müller. Was sind Sie von Beruf? Ich arbeite als Ingenieur bei Siemens. Sind Sie verheiratet? Nein, ich bin geschieden, aber ich habe zwei Kinder. Was machen Sie gern? Ich lese gern und schwimme am Wochenende.',
    ptText: 'Qual é o seu nome? Meu nome é Thomas Müller. Qual é sua profissão? Eu trabalho como engenheiro na Siemens. É casado? Não, sou divorciado, mas tenho dois filhos. O que você gosta de fazer? Gosto de ler e nadar no fim de semana.',
    note: 'Repertório completo para entrevistas e interações de nível A1.',
  },
  // Aula 04
  {
    id: 'a1-im-buero',
    lesson: 4,
    title: 'Texto A1 — Im Büro (Lisa Herzberg & Peter Heinemann)',
    category: 'A1 · No Escritório',
    deText: 'Guten Tag. Suchen Sie etwas? Ja, mein Büro. Ich bin neu hier. Sind Sie Herr Heinemann? Ja. Herzlich willkommen! Mein Name ist Lisa Herzberg, ich arbeite hier als Sekretärin. Kommen Sie! Hier ist Ihr Büro. Oh, das ist ein schönes Zimmer! Hoffentlich ist alles da. Dort stehen: der Schreibtisch, das Telefon, der Computer, der Drucker, die Schreibtischlampe, der Stuhl und hier ist das Regal. Fehlt etwas? Nein, ich glaube nicht. Vielen Dank, Frau Herzberg. Vielleicht können wir später zusammen Kaffee trinken. Gerne. Meine Telefonnummer ist die 44 22. Ganz einfach! Danke. Bis später. Bis später.',
    ptText: 'Bom dia. Está procurando algo? Sim, minha sala de trabalho. Sou novo aqui. O senhor é o Sr. Heinemann? Sim. Seja bem-vindo! Meu nome é Lisa Herzberg, trabalho aqui como secretária. Venha! Aqui é a sua sala. Oh, esta é uma bela sala! Tomara que esteja tudo aí. Ali estão: a mesa, o telefone, o computador, a impressora, a luminária de mesa, a cadeira e aqui está a estante. Falta algo? Não, creio que não. Muito obrigado, Sra. Herzberg. Talvez possamos tomar um café juntos mais tarde. Com prazer. Meu número de telefone é 44 22. Bem simples! Obrigado. Até mais tarde. Até mais tarde.',
    note: 'Diálogo completo de recepção e ambientação corporativa com modais e adjetivos atributivos.',
  },
  {
    id: 'a2-buero-items',
    lesson: 4,
    title: 'Texto A2 — Was ist im Büro? (18 Gegenstände)',
    category: 'A2 · Mobiliário & Aparelhos',
    deText: 'das Telefon, die Tasse, die Lampe, der Drucker, der Stuhl, der Schreibtisch, der Computer, der Laptop, die Maus, der Schlüssel, das Buch, die Brille, der Terminkalender, der Stift, das Handy, das Mobiltelefon, das Smartphone, die Kaffeemaschine.',
    ptText: 'o telefone, a xícara, a luminária, a impressora, a cadeira, a escrivaninha, o computador, o notebook, o mouse, a chave, o livro, os óculos, a agenda de compromissos, a caneta, o telefone celular, o telefone móvel, o smartphone, a máquina de café.',
    note: '18 objetos fundamentais de escritório com seus artigos e gêneros morfológicos canônicos.',
  },
  {
    id: 'a6-was-kostet',
    lesson: 4,
    title: 'Texto A6 — Was kostet ...? (Preços & Pronomes er/sie/es)',
    category: 'A6 · Cotações & Avaliação',
    deText: 'Was kostet der Bürostuhl? Der Bürostuhl kostet 30 Euro. 30 Euro? Das ist billig! Ja, er ist billig und modern! Was kostet die Lampe? Die Lampe kostet 34,99 Euro. Das ist preiswert! Ja, sie ist schön und praktisch.',
    ptText: 'Quanto custa a cadeira de escritório? A cadeira de escritório custa 30 euros. 30 euros? Isso é barato! Sim, ela é barata e moderna! Quanto custa a luminária? A luminária custa 34,99 euros. Isso tem um preço bom! Sim, ela é bonita e prática.',
    note: 'Retomada pronominal pelo gênero do artigo (der = er, die = sie, das = es).',
  },
  {
    id: 'a8-probleme-im-buero',
    lesson: 4,
    title: 'Texto A8 — Probleme im Büro (Diagnóstico & Modalverb können)',
    category: 'A8 · Diagnóstico de Avarias',
    deText: 'Na, Herr Heinemann, wie geht es? Danke, gut. Ich habe ein kleines Problem, Frau Herzberg. Mein Drucker funktioniert nicht. Ich kann nicht drucken. Was? Das ist ein neuer Drucker! Ist der Computer auch kaputt? Nein, der Computer funktioniert. Das Telefon auch. Und die Lampe geht auch? Es ist eine alte Lampe. Die Lampe funktioniert gut. Also nur der Drucker ... Ja. Ich komme gleich wieder. Ich frage mal Paul ...',
    ptText: 'E então, Sr. Heinemann, como vai? Obrigado, bem. Eu tenho um pequeno problema, Sra. Herzberg. Minha impressora não funciona. Não consigo imprimir. O quê? Esta é uma impressora nova! O computador também está quebrado? Não, o computador funciona. O telefone também. E a luminária funciona também? É uma luminária velha. A luminária funciona bem. Então somente a impressora ... Sim. Já volto. Vou perguntar ao Paul ...',
    note: 'Uso de können na Posição II com infinitivo puro no Satzende (Satzklammer).',
  },
  {
    id: 'a14-abteilungen',
    lesson: 4,
    title: 'Texto A14 — Abteilungen der Universität (Departamentos)',
    category: 'A14 · Funções & Departamentos',
    deText: 'das Sekretariat: Informationen bekommen. die Verwaltung: Rechnungen bezahlen. die Bibliothek: Zeitungen und Bücher lesen. das Sprachenzentrum: Sprachen lernen. die Mensa: essen. die Cafeteria: Kaffee trinken. die Sporthalle: Sport machen.',
    ptText: 'a secretaria: obter informações. a administração: pagar faturas. a biblioteca: ler jornais e livros. o centro de idiomas: aprender línguas. o refeitório universitário: comer. a cafeteria: tomar café. o ginásio de esportes: praticar esportes.',
    note: 'Vocabulário institucional e colocações canônicas de atividades.',
  },
  {
    id: 'a22-in-der-cafeteria',
    lesson: 4,
    title: 'Texto A22 — In der Cafeteria (Interação Social & Hobbies)',
    category: 'A22 · Diálogo na Cafeteria',
    deText: 'Was trinken Sie, Herr Heinemann? Kaffee bitte. Geht Ihr Drucker jetzt? Ja, er funktioniert, ich kann drucken. Wie finden Sie Marburg? Marburg ist eine schöne Stadt. Am Wochenende fahre ich nach München. Ich spiele dort im Universitätsorchester. Welches Instrument spielen Sie? Klavier. Können Sie gut singen? Nein, ich kann nicht singen.',
    ptText: 'O que o senhor vai beber, Sr. Heinemann? Café, por favor. Sua impressora funciona agora? Sim, ela funciona, consigo imprimir. O que acha de Marburg? Marburg é uma cidade bonita. No fim de semana viajo para Munique. Eu toco lá na orquestra da universidade. Qual instrumento o senhor toca? Piano. O senhor sabe cantar bem? Não, eu não sei cantar.',
    note: 'Prática autêntica de preferências, preposições locais (nach München) e o verbo können.',
  },
  // Aula 05
  {
    id: 'b1-oesterreich-freizeit',
    lesson: 5,
    title: 'Texto B1 — Was machen die Österreicher in der Freizeit?',
    category: 'B1 · Lazer na Áustria',
    deText: 'Was machen die Österreicher in ihrer Freizeit? Siebenundachtzig Prozent sehen gern Filme, Serien oder Shows. Siebenundachtzig Prozent telefonieren mit dem Handy. Siebenundsiebzig Prozent hören Radio. Einundsechzig Prozent lesen Zeitungen und Zeitschriften.',
    ptText: 'O que os austríacos fazem em seu tempo livre? Oitenta e sete por cento gostam de assistir a filmes, séries ou programas. Oitenta e sete por cento telefonam pelo celular. Setenta e sete por cento ouvem rádio. Sessenta e um por cento leem jornais e revistas.',
    note: 'Estatísticas de lazer com numerais ordinais e regência preposicional mit dem Handy.',
  },
  {
    id: 'b2-schweiz-freizeit',
    lesson: 5,
    title: 'Texto B2 — Freizeitaktivitäten in der Schweiz',
    category: 'B2 · Lazer na Suíça',
    deText: 'Auch die Schweizer sehen in ihrer Freizeit gern Filme oder spielen zu Hause Computerspiele. Viele Schweizer telefonieren oft mit ihrem Handy oder surfen im Internet. Die Schweizer sind gern aktiv: Sie wandern viel und machen Sport. Freunde besuchen, Radio hören und Bücher lesen sind ebenfalls beliebte Freizeitaktivitäten.',
    ptText: 'Também os suíços gostam de assistir a filmes em seu tempo livre ou jogam jogos de computador em casa. Muitos suíços telefonam frequentemente pelo celular ou navegam na internet. Os suíços gostam de ser ativos: eles fazem muitas caminhadas na montanha e praticam esportes. Visitar amigos, ouvir rádio e ler livros são igualmente atividades de lazer populares.',
    note: 'Verbos nucleares de lazer e a estrutura adverbial com gern.',
  },
  {
    id: 'a28-agenda-meier',
    lesson: 5,
    title: 'Exercício A28 — Die Woche von Herr und Frau Meier',
    category: 'A28 · Agenda Semanal',
    deText: 'Am Montag fährt Herr Meier Motorrad und Frau Meier lernt Russisch. Am Dienstag liest Herr Meier Zeitung und Frau Meier fährt nach Berlin. Am Mittwoch schwimmt Herr Meier und Frau Meier repariert das Auto. Am Donnerstag kocht Herr Meier und Frau Meier besucht Freunde. Am Freitag fotografiert Herr Meier und Frau Meier tanzt. Am Samstag und Sonntag machen Herr und Frau Meier eine Radtour.',
    ptText: 'Na segunda-feira o Sr. Meier anda de moto e a Sra. Meier estuda russo. Na terça-feira o Sr. Meier lê jornal e a Sra. Meier viaja para Berlim. Na quarta-feira o Sr. Meier nada e a Sra. Meier conserta o carro. Na quinta-feira o Sr. Meier cozinha e a Sra. Meier visita amigos. Na sexta-feira o Sr. Meier fotografa e a Sra. Meier dança. No sábado e domingo o Sr. e a Sra. Meier fazem um passeio de bicicleta.',
    note: 'Inversão sintática com Vorfeld temporal (Am Montag...) + Verbo na Posição II + Sujeito na Posição III.',
  },
  {
    id: 'c3-sommer-winter',
    lesson: 5,
    title: 'Texto C3 — Frau Sommer und Herr Winter (Antônimos e Grupo Nominal)',
    category: 'C3 · Antônimos e Artigos',
    deText: 'Frau Sommer findet alles positiv, aber Herr Winter findet alles negativ. Das ist ein schöner Tisch, aber das ist ein hässlicher Tisch. Das ist eine moderne Lampe, aber das ist eine unmoderne Lampe. Das ist ein praktisches Regal, aber das ist ein unpraktisches Regal. Der Kaffee ist lecker, aber der Tee ist ungenießbar!',
    ptText: 'A Sra. Sommer acha tudo positivo, mas o Sr. Winter acha tudo negativo. Esta é uma mesa bonita, mas esta é uma mesa feia. Esta é uma luminária moderna, mas esta é uma luminária fora de moda. Esta é uma estante prática, mas esta é uma estante pouco prática. O café está saboroso, mas o chá está intragável!',
    note: 'Declinação do adjetivo atributivo no caso Nominativo com artigo indefinido ein/eine.',
  },
  // Aula 06
  {
    id: 'a1-rezeption-dialog',
    lesson: 6,
    title: 'Texto A1 — An der Rezeption (Check-in im Hotel)',
    category: 'A1 · Dialog an der Rezeption',
    deText: 'Guten Tag, haben Sie noch ein Zimmer frei? Grüß Gott! Haben Sie eine Reservierung? Nein, wir haben leider keine Reservierung. Wir möchten gerne zwei Einzelzimmer. Ein Einzelzimmer kostet 85 Euro pro Nacht. Das Frühstück ist inklusive. Füllen Sie bitte das Anmeldeformular aus.',
    ptText: 'Boa tarde, a senhora ainda tem um quarto vago? Olá! Os senhores têm uma reserva? Não, infelizmente não temos reserva. Gostaríamos de dois quartos individuais. Um quarto individual custa 85 euros por noite. O café da manhã está incluído. Preencham por favor o formulário de registro.',
    note: 'Observe o uso do Akkusativ com haben (ein Zimmer, eine Reservierung) e o modal möchten na solicitação polida.',
  },
  {
    id: 'a5-hotels-muenchen',
    lesson: 6,
    title: 'Texto A5 — Die drei Hotels in München',
    category: 'A5 · Hotelvergleich',
    deText: 'Hotel Central liegt sehr zentral in der Altstadt, nur zwei Minuten vom Marienplatz. Es hat 45 Zimmer und kostenloses WLAN. Hotel Krone liegt in der Nähe vom Hauptbahnhof mit 60 Zimmern und Restaurant. Hotel Am Park liegt direkt am Englischen Garten mit Sauna und Fitnessraum.',
    ptText: 'O Hotel Central fica muito central no centro histórico, a apenas dois minutos da Marienplatz. Possui 45 quartos e Wi-Fi gratuito. O Hotel Krone fica perto da estação central com 60 quartos e restaurante. O Hotel Am Park fica diretamente junto ao Englischer Garten com sauna e sala de fitness.',
    note: 'Vocabulário canônico de hotelaria, localização geográfica e preposições locais (am, in der Nähe von).',
  },
  {
    id: 'a7-anmeldeformular',
    lesson: 6,
    title: 'Texto A7 — Das Anmeldeformular (Hotel-Registrierung)',
    category: 'A7 · Anmeldeformular',
    deText: 'Familienname Heinemann, Vorname Peter, Geburtsdatum 14. Mai 1989, Staatsangehörigkeit deutsch, Wohnort Frankfurt, Straße und Hausnummer Goethestraße 12, Postleitzahl 60313, Anreisetag 12. Oktober, Abreisetag 15. Oktober, Unterschrift Peter Heinemann.',
    ptText: 'Sobrenome Heinemann, primeiro nome Peter, data de nascimento 14 de maio de 1989, nacionalidade alemã, local de residência Frankfurt, rua e número Goethestraße 12, código postal 60313, data de chegada 12 de outubro, data de partida 15 de outubro, assinatura Peter Heinemann.',
    note: 'Terminologia formal de cadastramento e campos obrigatórios de hotelaria na Alemanha.',
  },
  {
    id: 'a12-reklamation',
    lesson: 6,
    title: 'Texto A12 — Reklamation: Probleme im Hotelzimmer',
    category: 'A12 · Zimmer-Reklamation',
    deText: 'Hier ist Peter Heinemann, Zimmer 405. Ich habe mehrere Probleme. Die Dusche ist kaputt, es gibt keine Handtücher und kein Toilettenpapier und der Fernseher geht auch nicht. Das tut mir leid! Wir schicken sofort jemanden.',
    ptText: 'Aqui é Peter Heinemann, quarto 405. Eu tenho vários problemas. O chuveiro está quebrado, não há toalhas nem papel higiênico e a televisão também não funciona. Sinto muito! Enviaremos alguém imediatamente.',
    note: 'O quantificador mehrere com plural sem artigo, a expressão es gibt com Akkusativ e negação com kein/keine.',
  },
  {
    id: 'a14-phonetik-oe',
    lesson: 6,
    title: 'Texto A14 — Phonetik: Umlaute ö [ø:] und [œ]',
    category: 'A14 · Phonetik ö',
    deText: 'Schön, hören, Möbel, lösen. Danke schön! Wir hören gern Musik. Zwölf, Wörter, Wörterbuch, können, möchten, öffnen. Wie viele Wörter kennen Sie?',
    ptText: 'Belo, ouvir, móveis, resolver. Muito obrigado! Nós gostamos de ouvir música. Doze, palavras, dicionário, poder/saber, gostaria, abrir. Quantas palavras você conhece?',
    note: 'Contraste fonético sistemático entre o ö longo fechado [ø:] e o ö curto aberto [œ].',
  },
  {
    id: 'a17-akkusativ-objekte',
    lesson: 6,
    title: 'Texto A17 — Die Nomengruppe im Akkusativ',
    category: 'A17 · Akkusativ-Gruppe',
    deText: 'Ich brauche einen modernen Schreibtisch, einen bequemen Stuhl und einen schnellen Computer. Das Zimmer hat ein großes Bett, ein sauberes Bad und eine praktische Minibar.',
    ptText: 'Eu preciso de uma escrivaninha moderna, uma cadeira confortável e um computador rápido. O quarto tem uma cama grande, um banheiro limpo e um frigobar prático.',
    note: 'Declinação de adjetivos atributivos e artigos indefinidos no caso Acusativo (einen -en para masculino).',
  },
  // Aula 07 · Rodada Extra (Sobrevivência Linguística)
  {
    id: 'r7-modalpartikeln',
    lesson: 7,
    title: 'Texto 1.1 — As Partículas Modais de Ouro (Modalpartikeln)',
    category: '1.1 · Modalpartikeln',
    deText: 'Komm doch mal her! Das ist ja fantastisch! Was machst du denn hier? Was meinst du eigentlich? Sei bloß vorsichtig! Glaubst du etwa an Geister?',
    ptText: 'Venha cá (convite caloroso)! Isso é realmente fantástico (surpresa positiva)! O que você está fazendo aqui afinal? O que você realmente acha? Tome muito cuidado! Por acaso você acredita em fantasmas?',
    note: 'As partículas doch, mal, ja, denn, eigentlich, bloß e etwa alteram o tom e a emoção sem mudar o sentido proposicional.',
  },
  {
    id: 'r7-survival-50',
    lesson: 7,
    title: 'Texto 2.1 — As Frases de Ouro de Sobrevivência Cotidiana',
    category: '2.1 · Alltagsphrasen',
    deText: 'Wie bitte? Können Sie das bitte wiederholen? Sprechen Sie bitte etwas langsamer. Entschuldigung, wo ist die Toilette? Wie viel kostet das? Vielen Dank für Ihre Hilfe! Auf Wiedersehen, bis zum nächsten Mal!',
    ptText: 'Como disse? Pode repetir, por favor? Fale um pouco mais devagar, por favor. Com licença, onde fica o banheiro? Quanto custa isto? Muito obrigado pela sua ajuda! Adeus, até a próxima vez!',
    note: 'Padrões de sobrevivência comunicativa com cortesia pragmática e clareza de registro formal e neutro.',
  },
  {
    id: 'r7-colloquial-umgangssprache',
    lesson: 7,
    title: 'Texto 2.3 — Registro Coloquial Autêntico (Umgangssprache)',
    category: '2.3 · Umgangssprache',
    deText: 'Mach\'s gut! Bis gleich! Na ja, es geht so. Na klar, auf jeden Fall! Quatsch, das stimmt doch gar nicht! Keine Ahnung, ich weiß es nicht. Passt schon, alles in Ordnung.',
    ptText: 'Cuide-se! Até logo! Bem, mais ou menos. Claro, com certeza! Bobagem, isso nem é verdade! Nem ideia, não sei. Está ótimo, tudo certo.',
    note: 'Expressões idiomáticas de alta frequência indispensáveis para sobrar naturalidade na conversa cotidiana.',
  },
  {
    id: 'r7-dialogue-cafe',
    lesson: 7,
    title: 'Texto 3.3 — Diálogo Autêntico: Im Café (No Café)',
    category: '3.3 · Im Café',
    deText: 'Hallo! Was darf es sein? Ich hätte gern einen Kaffee und ein Stück Apfelkuchen, bitte. Mit Milch und Zucker? Nur mit Milch, bitte. Kommt sofort! Macht zusammen vier Euro fünfzig. Zahlen Sie bar oder mit Karte? Mit Karte, bitte.',
    ptText: 'Olá! O que deseja? Eu gostaria de um café e um pedaço de torta de maçã, por favor. Com leite e açúcar? Apenas com leite, por favor. Sai imediatamente! Fica no total quatro euros e cinquenta. Paga em dinheiro ou cartão? Com cartão, por favor.',
    note: 'Uso do Konjunktiv II de cortesia "Ich hätte gern" e formulação de pagamento em estabelecimentos gastronômicos.',
  },
  {
    id: 'r7-dialogue-direction',
    lesson: 7,
    title: 'Texto 3.3 — Diálogo Autêntico: Pedindo Informação na Rua',
    category: '3.3 · Nach dem Weg fragen',
    deText: 'Entschuldigung, wie komme ich zum Bahnhof? Gehen Sie immer geradeaus und an der Ampel nach links. Ist es weit von hier? Nein, nur fünf Minuten zu Fuß. Vielen Dank! Gern geschehen, einen schönen Tag noch!',
    ptText: 'Com licença, como chego à estação de trem? Vá sempre em frente e no semáforo para a esquerda. É longe daqui? Não, apenas cinco minutos a pé. Muito obrigado! De nada, tenha um bom dia ainda!',
    note: 'Imperativo formal (Gehen Sie), orientações espaciais (geradeaus, nach links) e resposta de polidez (Gern geschehen).',
  },
  {
    id: 'r7-fragen-antworten',
    lesson: 7,
    title: 'Texto 2.4 & 2.5 — Matriz das Perguntas & Respostas Vitais',
    category: '2.4 · Fragen & Antworten',
    deText: 'Wie spät ist es? Es ist Viertel nach drei. Was gibt es Neues? Nicht viel, alles beim Alten. Haben Sie einen Moment Zeit? Ja, natürlich, wie kann ich helfen? Stimmt das so? Ja, genau, das ist richtig.',
    ptText: 'Que horas são? São três e quinze. O que há de novo? Não muito, tudo na mesma. O senhor tem um momento? Sim, claro, como posso ajudar? Está correto assim? Sim, exatamente, isso está certo.',
    note: 'Agilidade de processamento auditivo para perguntas instantâneas e respostas automáticas na vida real.',
  },
  // Aula 08 — Preposições Locais
  {
    id: 'r8-logik-fundamental',
    lesson: 8,
    title: 'Texto 1.1 — A Tríade Canônica: Wo? vs. Wohin? vs. Woher?',
    category: '1.1 · Logik',
    deText: 'Wo bist du? Ich bin im Haus. Wohin gehst du? Ich gehe ins Haus. Woher kommst du? Ich komme aus dem Haus. Wenn es Bewegung gibt, nimmst du Akkusativ. Wenn es Ruhe oder Herkunft ist, nimmst du Dativ.',
    ptText: 'Onde você está? Estou na casa. Para onde você vai? Vou para a casa. De onde você vem? Venho da casa. Se há movimento, usa-se Acusativo. Se há repouso ou origem, usa-se Dativo.',
    note: 'Diferenciação basilar entre im (Dativ), ins (Akkusativ) e aus dem (Dativ).',
  },
  {
    id: 'r8-dialog-strasse',
    lesson: 8,
    title: 'Texto 2.3 — Diálogo 1: Wo ist der Bahnhof?',
    category: '2.3 · Orientierung',
    deText: 'Entschuldigung, wie komme ich zum Bahnhof? Gehen Sie geradeaus bis zur Kreuzung, dann nach links in die Schillerstraße. Der Bahnhof liegt direkt am Platz. Ist der Bahnhof weit von hier? Nein, zu Fuß sind es nur fünf Minuten. Sie können auch mit dem Bus zum Hauptbahnhof fahren.',
    ptText: 'Com licença, como chego à estação? Vá em frente até o cruzamento, depois à esquerda na Rua Schiller. A estação fica diretamente na praça. A estação é longe daqui? Não, a pé são apenas cinco minutos. O senhor também pode ir de ônibus para a estação principal.',
    note: 'Uso de zum Bahnhof, zur Kreuzung, in die Schillerstraße, am Platz, von hier e zu Fuß.',
  },
  {
    id: 'r8-dialog-arzt',
    lesson: 8,
    title: 'Texto 2.3 — Diálogo 2: Beim Arzt und in der Apotheke',
    category: '2.3 · Arzt & Apotheke',
    deText: 'Wo warst du heute Morgen? Ich war beim Arzt. Und wo gehst du jetzt hin? Ich muss noch in die Apotheke und dann zur Post. Kommst du danach nach Hause? Ja, ich fahre direkt nach Hause.',
    ptText: 'Onde você esteve hoje de manhã? Estive no médico. E para onde você vai agora? Preciso ainda ir à farmácia e depois aos correios. Você vem para casa depois disso? Sim, vou direto para casa.',
    note: 'Contraste prático entre beim Arzt (Wo? pessoa), in die Apotheke (Wohin? espaço feminino), zur Post (Wohin? instituição) e nach Hause (expressão fixa de retorno).',
  },
  {
    id: 'r8-dialog-reise',
    lesson: 8,
    title: 'Texto 2.3 — Diálogo 3: Wohin fährst du in den Urlaub?',
    category: '2.3 · Reise & Urlaub',
    deText: 'Wohin fährst du in den Urlaub? Im Sommer fliegen wir in die Schweiz. Und im Herbst möchte ich nach Berlin und danach an die Ostsee fahren. Mein Kollege kommt gerade aus der Türkei zurück. Er hat zwei Wochen am Strand verbracht. Klingt herrlich! Ich war letztes Jahr auf Mallorca.',
    ptText: 'Para onde você vai nas férias? No verão voamos para a Suíça. E no outono eu gostaria de ir a Berlim e depois para o Mar Báltico. Meu colega acaba de voltar da Turquia. Ele passou duas semanas na praia. Soa maravilhoso! Eu estive ano passado em Mallorca.',
    note: 'Destinos com e sem artigo: in die Schweiz, nach Berlin, an die Ostsee, aus der Türkei, am Strand, auf Mallorca.',
  },
  // Aula 09
  {
    id: 'r9-dialog-kueche',
    lesson: 9,
    title: 'Texto 2.1 — Diálogo 1: In der Küche (Na Cozinha)',
    category: '2.1 · Alltagsdialoge',
    deText: 'Wäschst du das Gemüse? Ja, ich wasche es schon. Nimmst du auch die Kartoffeln? Ja, ich nehme sie. Hilfst du mir beim Kochen? Natürlich helfe ich dir. Aber iss nicht die ganze Schokolade vor dem Essen! Ich esse nur ein kleines Stück. Wir treffen uns um acht Uhr zum Abendessen.',
    ptText: 'Você lava os legumes? Sim, já estou lavando. Você pega também as batatas? Sim, eu as pego. Você me ajuda a cozinhar? Claro que eu te ajudo. Mas não coma todo o chocolate antes da refeição! Eu só como um pedacinho. Nós nos encontramos às 20h para o jantar.',
    note: 'Alternâncias vocálicas e mudanças: du wäschst, du nimmst, du hilfst, du isst e wir treffen.',
  },
  {
    id: 'r9-dialog-arbeit',
    lesson: 9,
    title: 'Texto 2.1 — Diálogo 2: Bei der Arbeit (No Trabalho)',
    category: '2.1 · Alltagsdialoge',
    deText: 'Weißt du, wo der Chef ist? Nein, ich weiß es nicht. Er hält gerade eine wichtige Besprechung im Konferenzraum. Warte bitte hier auf ihn. Danke für den Tipp. Worüber redet er mit dem Kunden? Er redet über das neue Projekt.',
    ptText: 'Você sabe onde está o chefe? Não, não sei. Ele está realizando agora uma reunião importante na sala de conferências. Por favor, espere aqui por ele. Obrigado pela dica. Sobre o que ele conversa com o cliente? Ele conversa sobre o novo projeto.',
    note: 'Verbos wissen (ich weiß), halten (er hält), warten (warte!) e reden (er redet).',
  },
  {
    id: 'r9-dialog-restaurant',
    lesson: 9,
    title: 'Texto 2.1 — Diálogo 3: Im Restaurant (No Restaurante)',
    category: '2.1 · Alltagsdialoge',
    deText: 'Was möchten Sie trinken? Ich mag kein Bier. Ich nehme ein Mineralwasser. Und was essen Sie heute? Ich esse den gegrillten Fisch mit Kartoffeln. Der Kellner wirft fast die Gläser um! Lass uns lieber drinnen sitzen.',
    ptText: 'O que o senhor gostaria de beber? Não gosto de cerveja. Vou tomar água mineral. E o que o senhor come hoje? Como o peixe grelhado com batatas. O garçom quase derruba os copos! Vamos sentar do lado de dentro.',
    note: 'Uso de mögen (ich mag), nehmen (ich nehme), essen (ich esse), werfen (er wirft) e lassen (lass uns).',
  },
  {
    id: 'r9-dialog-sport',
    lesson: 9,
    title: 'Texto 2.1 — Diálogo 4: Beim Sport (No Esporte)',
    category: '2.1 · Alltagsdialoge',
    deText: 'Fängst du den Ball? Ja, wirf du mir den Ball zu! Hältst du ihn fest? Ja, ich halte ihn fest. Triff den Ball besser beim nächsten Mal! Warte mal, ich bin noch ganz müde.',
    ptText: 'Você pega a bola? Sim, jogue a bola para mim! Você a segura firme? Sim, eu a seguro firme. Acerte a bola melhor na próxima vez! Espere aí, ainda estou bem cansado.',
    note: 'Verbos fangen (fängst du), werfen (wirf!), halten (hältst du) e treffen (triff!).',
  },
  {
    id: 'r9-dialog-gesundheit',
    lesson: 9,
    title: 'Texto 2.1 — Diálogo 5: Gesundheit & Arzt (Saúde)',
    category: '2.1 · Alltagsdialoge',
    deText: 'Hilfst du mir bitte? Ich sterbe vor Kopfschmerzen! Was hältst du von einem Arztbesuch? Ich mag keine Ärzte. Nimm doch eine Tablette und bade warm. Rede nicht so viel, ich brauche Ruhe.',
    ptText: 'Você me ajuda, por favor? Estou morrendo de dor de cabeça! O que você acha de ir ao médico? Não gosto de médicos. Tome um comprimido e tome um banho quente. Não fale tanto, preciso de descanso.',
    note: 'Formas com alternância: hilfst du, ich sterbe, hältst du, nimm!, bade!, rede nicht!',
  },
  {
    id: 'r9-wissen-kennen',
    lesson: 9,
    title: 'Texto 1.4 — Distinção Fundamental: wissen vs. kennen vs. können',
    category: '1.4 · Grammatik',
    deText: 'Ich weiß, wo er wohnt. Aber ich kenne diesen Mann nicht persönlich. Kannst du Deutsch sprechen? Ja, ich kann gut Deutsch sprechen und ich kenne viele deutsche Wörter.',
    ptText: 'Eu sei onde ele mora. Mas não conheço esse homem pessoalmente. Você sabe falar alemão? Sim, eu sei/consigo falar bem alemão e conheço muitas palavras alemãs.',
    note: 'wissen (fato/informação com subordinada), kennen (familiaridade/pessoa/lugar com objeto direto) e können (habilidade aprendida).',
  },
  // Semana 2 — Dia 007
  {
    id: 's2-d7-email-klara',
    lesson: 7,
    title: 'Semana 2 · Texto A27 — Eine E-Mail an Klara (München)',
    category: 'Semana 2 · A27 E-Mail',
    deText: 'Liebe Klara, viele Grüße aus München. Mein Hotel liegt im Zentrum. Das Hotelzimmer ist sehr groß. Es hat einen Fernseher und natürlich WLAN. Heute Abend um 20.00 Uhr gibt das Universitätsorchester ein Konzert und ich spiele, wie immer, Klavier. Aber bis 20.00 Uhr habe ich noch etwas Zeit. Ich möchte gerne das Deutsche Museum besuchen und die vielen interessanten Erfindungen bewundern. Vielleicht mache ich auch noch einen Spaziergang und trinke ein Bier. Aber nur ein Bier, ich möchte heute Abend natürlich gut spielen. Liebe Grüße, Dein Peter.',
    ptText: 'Querida Klara, muitas saudações de Munique. Meu hotel fica no centro. O quarto do hotel é muito grande. Tem uma televisão e, naturalmente, Wi-Fi. Hoje à noite às 20h a orquestra universitária faz um concerto e eu toco, como sempre, piano. Mas até as 20h ainda tenho um pouco de tempo. Gostaria muito de visitar o Museu Alemão e admirar as muitas invenções interessantes. Talvez eu faça ainda uma caminhada e tome uma cerveja. Mas só uma cerveja, pois hoje à noite quero naturalmente tocar bem. Com carinho, do seu Peter.',
    note: 'Acusativo masculino: einen Fernseher, einen Spaziergang; Acusativo neutro: ein Konzert, ein Bier; möchten + infinitivo no Satzende.',
  },
  {
    id: 's2-d7-deutsches-museum',
    lesson: 7,
    title: 'Semana 2 · Texto A20 — Das Deutsche Museum & Englischer Garten',
    category: 'Semana 2 · A20 Sehenswürdigkeiten',
    deText: 'Segelschiffe, Windmühlen, Industrieroboter, Raumsonden – das alles finden Sie im Deutschen Museum. Das Deutsche Museum ist ein naturwissenschaftlich-technisches Museum. Es zeigt viele technische Erfindungen und hat eine Ausstellungsfläche von 50 000 Quadratmetern. Der Englische Garten ist 373 Hektar groß und 200 Jahre alt. Er bietet viele Freizeitmöglichkeiten. Man kann dort lange Spaziergänge machen oder im Biergarten ein kühles Bier trinken und etwas essen.',
    ptText: 'Barcos a vela, moinhos de vento, robôs industriais, sondas espaciais – tudo isso você encontra no Deutsches Museum. É um museu técnico-científico que exibe inúmeras invenções e possui uma área expositiva de 50.000 m². O Englischer Garten tem 373 hectares e 200 anos de história. Oferece muitas opções de lazer. Pode-se fazer longas caminhadas ou tomar uma cerveja bem gelada e comer algo no Biergarten.',
    note: 'Vocabulário cultural de Munique, horários de visitação e opções de lazer.',
  },
  {
    id: 's2-d7-bmw-pinakothek',
    lesson: 7,
    title: 'Semana 2 · Texto A21 — Die Pinakothek & Das BMW Museum',
    category: 'Semana 2 · A21 Öffnungszeiten',
    deText: 'Die Pinakothek der Moderne zeigt bedeutende Kunstwerke aus dem 20. Jahrhundert. Man kann dort Bilder von Wassily Kandinsky, Paul Klee, Pablo Picasso oder René Magritte bewundern. Das BMW Museum zeigt die Geschichte des Unternehmens BMW. Hier können Besucher auch 125 besondere Autos und Motorräder sehen.',
    ptText: 'A Pinakothek der Moderne exibe importantes obras de arte do século XX. Lá se podem admirar quadros de Kandinsky, Klee, Picasso ou Magritte. O Museu BMW mostra a história da empresa BMW. Aqui os visitantes podem ver também 125 automóveis e motocicletas especiais.',
    note: 'Uso de modais (kann man bewundern, können sehen) e estruturas de horários.',
  },
  {
    id: 's2-d7-phonetik-oe-ue',
    lesson: 7,
    title: 'Semana 2 · Textos A14 & A19 — Treinamento dos Tremas ö e ü',
    category: 'Semana 2 · Phonetik',
    deText: 'schön, hören, Danke schön! Wir hören gern Musik. Wörter, zwölf, Wörterbuch, können, möchten, öffnen. Frühstück, für, natürlich, Bücher, Handtücher, Züge. fünf, Schlüssel, wünschen, München, Münzen, Glück. Möchten Sie neue Handtücher? Natürlich lese ich Bücher!',
    ptText: 'Bonito, ouvir, muito obrigado! Gostamos de ouvir música. Palavras, doze, dicionário, poder, gostaria, abrir. Café da manhã, para, naturalmente, livros, toalhas, trens. Cinco, chave, desejar, Munique, moedas, sorte. O senhor gostaria de toalhas novas? Naturalmente eu leio livros!',
    note: 'Oposição fundamental de vogais arredondadas anteriores: ö [øː]/[œ] e ü [yː]/[ʏ].',
  },
  {
    id: 's2-d7-hotel-beschwerden',
    lesson: 7,
    title: 'Semana 2 · Texto A15 — Queixas no Hotel (Ich kann nicht...)',
    category: 'Semana 2 · A15 Hotel',
    deText: 'Die Dusche ist kaputt. Ich kann nicht duschen. Der Fernseher geht nicht. Ich kann keinen Film sehen. Mein Zimmerschlüssel ist weg. Ich kann die Tür nicht öffnen. Das Bett ist zu hart. Ich kann nicht schlafen. Im Zimmer gibt es keinen Schreibtisch. Ich kann nicht arbeiten.',
    ptText: 'O chuveiro está quebrado. Não consigo tomar banho. A televisão não funciona. Não consigo ver nenhum filme. A chave do quarto sumiu. Não consigo abrir a porta. A cama é muito dura. Não consigo dormir. No quarto não há escrivaninha. Não consigo trabalhar.',
    note: 'Estrutura com modalverb können na posição 2 e infinitivo no final da oração (Satzklammer).',
  },
  // Semana 2 — Dia 008
  {
    id: 's2-d8-plural-familien',
    lesson: 8,
    title: 'Semana 2 · 1.1 — As 5 Famílias do Plural dos Substantivos',
    category: 'Semana 2 · 1.1 Plural',
    deText: 'Familie eins: der Tisch, die Tische; der Stuhl, die Stühle. Familie zwei: das Kind, die Kinder; das Haus, die Häuser; der Mann, die Männer. Familie drei: die Frau, die Frauen; die Lampe, die Lampen; der Mensch, die Menschen. Familie vier: das Auto, die Autos; das Hotel, die Hotels. Familie fünf: der Lehrer, die Lehrer; der Vater, die Väter; die Mutter, die Mütter.',
    ptText: 'Família um: mesa, mesas; cadeira, cadeiras. Família dois: criança, crianças; casa, casas; homem, homens. Família três: mulher, mulheres; lâmpada, lâmpadas; ser humano, seres humanos. Família quatro: carro, carros; hotel, hotéis. Família cinco: professor, professores; pai, pais; mãe, mães.',
    note: 'Panorama sonoro dos cinco padrões morfológicos de plural com e sem Umlaut.',
  },
  {
    id: 's2-d8-muenchen-profil',
    lesson: 8,
    title: 'Semana 2 · Texto B4 — München: Landeshauptstadt Bayerns',
    category: 'Semana 2 · B4 München',
    deText: 'In München wohnen ca. 1,56 Millionen Menschen. München liegt im Süden von Deutschland und ist die Landeshauptstadt von Bayern. München hat zwei Universitäten: die Ludwig-Maximilians-Universität und die Technische Universität. München hat 71 Theater, drei große Orchester und 50 Museen. Das Hofbräuhaus ist 400 Jahre alt. Insgesamt trinken die Gäste im Hofbräuhaus täglich 1 000 Liter Bier. In München findet man auch viele große Firmen wie Siemens, BMW, MAN oder Rodenstock.',
    ptText: 'Em Munique vivem cerca de 1,56 milhão de pessoas. Munique fica no sul da Alemanha e é a capital do estado da Baviera. Munique tem duas universidades: a LMU e a TU. Tem 71 teatros, três grandes orquestras e 50 museus. O Hofbräuhaus tem 400 anos. No total, os clientes bebem diariamente 1.000 litros de cerveja no Hofbräuhaus. Em Munique encontram-se também muitas grandes empresas como Siemens, BMW, MAN ou Rodenstock.',
    note: 'Vocabulário urbano, estatísticas, empresas multinacionais e tradições culturais da Baviera.',
  },
  {
    id: 's2-d8-hotel-redemittel',
    lesson: 8,
    title: 'Semana 2 · Texto D1 — Diálogos no Hotel (Wichtige Redemittel)',
    category: 'Semana 2 · D1 Hotel',
    deText: 'Haben Sie noch ein Zimmer frei? Haben Sie eine Reservierung? Wir möchten gerne ein Doppelzimmer. Wir bleiben zwei Nächte. Wie viel kostet ein Doppelzimmer? Das Zimmer kostet 80 Euro pro Nacht. Der Preis ist inklusive Frühstück. Hat das Zimmer einen Fernseher? Ja, alle Zimmer haben ein Bad und Fernseher. Hier ist Ihr Zimmerschlüssel. Ihre Zimmernummer ist die 405. Schönen Aufenthalt!',
    ptText: 'O senhor ainda tem um quarto vago? O senhor tem reserva? Nós gostaríamos de um quarto duplo. Ficamos duas noites. Quanto custa um quarto duplo? O quarto custa 80 euros por noite. O preço inclui café da manhã. O quarto tem televisão? Sim, todos os quartos têm banheiro e televisão. Aqui está a chave do quarto. Seu número de quarto é o 405. Tenha uma excelente estadia!',
    note: 'Frases essenciais para check-in, consulta de diária, comodidades e serviços hoteleiros.',
  },
  {
    id: 's2-d8-staedte-deutschlands',
    lesson: 8,
    title: 'Semana 2 · Texto B1 & B3 — Cidades Alemãs & Pontos Cardeais',
    category: 'Semana 2 · B1/B3 Geografie',
    deText: 'Berlin liegt im Osten von Deutschland und hat 13 Millionen Besucher pro Jahr. Hamburg liegt im Norden. München liegt im Süden. Köln, Düsseldorf und Frankfurt am Main liegen im Westen. Wo liegt Dresden? Dresden liegt im Osten. Und wo liegt Leipzig? Leipzig liegt auch im Osten.',
    ptText: 'Berlim fica no leste da Alemanha e tem 13 milhões de visitantes por ano. Hamburgo fica no norte. Munique fica no sul. Colônia, Düsseldorf e Frankfurt am Main ficam no oeste. Onde fica Dresden? Dresden fica no leste. E onde fica Leipzig? Leipzig fica também no leste.',
    note: 'Preposições dos pontos cardeais com Dativ: im Norden, im Süden, im Osten, im Westen.',
  },
  {
    id: 's2-d8-akkusativ-pronomen',
    lesson: 8,
    title: 'Semana 2 · Exercício C13 — Pronomes no Acusativo (ihn, sie, es)',
    category: 'Semana 2 · C13 Grammatik',
    deText: 'Besuchst du Peter heute Abend? Ja, ich besuche ihn heute Abend. Findest du Beate nett? Ja, ich finde sie nett. Isst du den Fisch? Ja, ich esse ihn. Findest du das Konzert interessant? Ja, ich finde es interessant. Trinkst du den Kaffee noch? Ja, ich trinke ihn noch. Brauchen Sie die Dokumente noch? Ja, ich brauche sie noch. Nehmt ihr das Zimmer? Ja, wir nehmen es.',
    ptText: 'Você visita o Peter hoje à noite? Sim, eu o visito hoje à noite. Você acha a Beate simpática? Sim, eu a acho simpática. Você come o peixe? Sim, eu o como. Você acha o concerto interessante? Sim, eu o acho interessante. Você ainda bebe o café? Sim, eu ainda o bebo. O senhor ainda precisa dos documentos? Sim, eu ainda preciso deles. Vocês pegam o quarto? Sim, nós o pegamos.',
    note: 'Prática intensiva de substituição por pronomes acusativos: ihn (masc.), sie (fem./pl.), es (neutro).',
  },
  // Semana 2 — Dia 009
  {
    id: 's2-d9-fruehstueck-a1',
    lesson: 9,
    title: 'Semana 2 · Texto A1 — Beim Frühstück (Norbert, Peter & Kellnerin)',
    category: 'Semana 2 · A1 Frühstück',
    deText: 'Guten Morgen, Peter! Gut geschlafen? Na ja, es geht so. Was gibt es denn zum Frühstück? Wir haben ein reichhaltiges Büfett. Möchtest du Kaffee oder Tee? Ich nehme einen starken Kaffee mit Milch. Und was isst du? Ich esse zwei Brötchen mit Butter und Marmelade. Mögen Sie auch Käse oder Schinken? Ja, ich mag den Schinken sehr. Guten Appetit!',
    ptText: 'Bom dia, Peter! Dormiu bem? Bem, mais ou menos. O que tem para o café da manhã? Temos um buffet variado. Você gostaria de café ou chá? Vou pegar um café forte com leite. E o que você come? Como dois pãezinhos com manteiga e geleia. O senhor também gosta de queijo ou presunto? Sim, eu gosto muito do presunto. Bom apetite!',
    note: 'Interações autênticas no café da manhã do hotel, uso de mögen (ich mag), möchten (möchtest du) e nehmen (ich nehme einen starken Kaffee).',
  },
  {
    id: 's2-d9-buffet-a5',
    lesson: 9,
    title: 'Semana 2 · Texto A5 — Das Frühstücksbüfett (Hotels & Kultur)',
    category: 'Semana 2 · A5 Büfett',
    deText: 'Das Frühstücksbüfett kommt ursprünglich aus Amerika. Heute bieten 70 Prozent der deutschen Hotels ihren Gästen ein Frühstücksbüfett an. Zu Hause essen die Deutschen meistens einfach: Brötchen, Butter, Marmelade und eine Tasse Kaffee. Im Hotel essen deutsche Gäste gern ein englisches oder amerikanisches Frühstück mit Rührei und Schinken. In vielen Hotels kostet das Frühstück etwa 20 Euro. Im Hotel Adlon in Berlin kostet das Frühstück sogar 48 Euro!',
    ptText: 'O buffet de café da manhã vem originalmente da América. Hoje, 70% dos hotéis alemães oferecem aos seus hóspedes um buffet de café da manhã. Em casa, os alemães comem na maioria das vezes de forma simples: pãozinho, manteiga, geleia e uma xícara de café. No hotel, os hóspedes alemães gostam de comer um café inglês ou americano com ovos mexidos e presunto. Em muitos hotéis o café custa cerca de 20 euros. No Hotel Adlon em Berlim o café custa nada menos que 48 euros!',
    note: 'Texto sociocultural com dados estatísticos, hábitos alimentares alemães e custos em Berlim.',
  },
  {
    id: 's2-d9-restaurant-a29',
    lesson: 9,
    title: 'Semana 2 · Texto A29 — Gespräch im Restaurant (Andreas & Beate)',
    category: 'Semana 2 · A29 Restaurant',
    deText: 'Was nimmst du, Beate? Ich nehme die Gemüsesuppe und danach den gegrillten Lachs mit Salzkartoffeln. Und was trinkst du? Ein Glas Weißwein, bitte. Ich nehme ein Mineralwasser. Schmeckt der Fisch? Ja, er schmeckt ausgezeichnet! Weißt du, mein Sohn wohnt zur Zeit in Japan. Dort isst man sehr viel Fisch, oft sogar roh. Warst du schon mal in Japan? Nein, ich war noch nie in Japan. Herr Ober, zahlen bitte! Zusammen oder getrennt? Zusammen, bitte.',
    ptText: 'O que você vai pedir, Beate? Eu vou pedir a sopa de legumes e depois o salmão grelhado com batatas cozidas. E o que você vai beber? Uma taça de vinho branco, por favor. Eu vou querer uma água mineral. O peixe está gostoso? Sim, está excelente! Sabe, meu filho mora atualmente no Japão. Lá come-se muito peixe, frequentemente até cru. Você já esteve no Japão? Não, nunca estive no Japão. Garçom, a conta por favor! Juntos ou separados? Juntos, por favor.',
    note: 'Diálogo completo no restaurante com expressões de pedido, apreciação do sabor, Präteritum de sein (warst du, ich war) e fechamento da conta.',
  },
  {
    id: 's2-d9-obstsalat-a19',
    lesson: 9,
    title: 'Semana 2 · Texto A19 — Gemischter Obstsalat (Imperativo Formal)',
    category: 'Semana 2 · A19 Rezept',
    deText: 'Waschen und schälen Sie die Äpfel, Birnen und Orangen. Schneiden Sie das Obst in kleine Stücke. Geben Sie alles in eine große Schüssel. Fügen Sie den Saft einer Zitrone und zwei Esslöffel Honig hinzu. Mischen Sie alles vorsichtig. Wenn Sie möchten, geben Sie einen kleinen Schuss Rum oder Likör dazu. Guten Appetit!',
    ptText: 'Lave e descasque as maçãs, peras e laranjas. Corte as frutas em pedaços pequenos. Coloque tudo em uma tigela grande. Adicione o suco de um limão e duas colheres de sopa de mel. Misture tudo cuidadosamente. Se quiser, adicione um toque especial de rum ou licor. Bom apetite!',
    note: 'Imperativo formal nas instruções culinárias: Waschen Sie, Schneiden Sie, Geben Sie, Mischen Sie.',
  },
  {
    id: 's2-d9-moegen-praeteritum',
    lesson: 9,
    title: 'Semana 2 · 1.1 & 1.2 — Modalverb mögen & Präteritum (war / hatte)',
    category: 'Semana 2 · Grammatik',
    deText: 'Ich mag Kaffee, aber ich mag keinen Tee. Er mag Schokolade, aber sie mag keine Bonbons. Gestern war ich müde und ich hatte keine Zeit. Letztes Jahr waren wir in Berlin und wir hatten ein schönes Hotelzimmer.',
    ptText: 'Eu gosto de café, mas não gosto de chá. Ele gosta de chocolate, mas ela não gosta de balas. Ontem eu estava cansado e não tinha tempo. Ano passado estivemos em Berlim e tínhamos um belo quarto de hotel.',
    note: 'Contraste de mögen com negação acusativa (keinen/keine) e o uso do pretérito simples oral (war, hatte).',
  },
];

export const AudioStudioModal: React.FC<AudioStudioModalProps> = ({ isOpen, onClose }) => {
  const [lessonFilter, setLessonFilter] = useState<'all' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>('all');
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack>(AUDIO_TRACKS[0]);
  const [activeTab, setActiveTab] = useState<'transcription' | 'pronounce'>('transcription');
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [micSupported, setMicSupported] = useState<boolean>(true);

  if (!isOpen) return null;

  const filteredTracks = AUDIO_TRACKS.filter((track) => {
    if (lessonFilter === 'all') return true;
    return track.lesson === lessonFilter;
  });

  const handleStartRecording = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'de-DE';
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setUserTranscript('');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserTranscript(transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setMicSupported(false);
      setIsRecording(false);
    }
  };

  return (
    <div
      id="audio-studio-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="audio-studio-modal"
        className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Headphones className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-tight">
                Estúdio de Áudio & Transcrições Integradas
              </h3>
              <p className="text-xs text-slate-500">
                Registros sonoros completos das Aulas 01 a 06 e Rodada Extra 07 em Alemão (de-DE) e Português (pt-BR) com sincronia textual
              </p>
            </div>
          </div>
          <button
            id="close-audio-studio-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split view */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Left Column: Track List */}
          <div className="md:col-span-5 p-4 bg-slate-50/50 space-y-2 overflow-y-auto max-h-[70vh]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Trilhas ({filteredTracks.length} registros)
              </span>
              <div className="inline-flex rounded-md border border-slate-300 p-0.5 bg-white text-[10px]">
                <button
                  onClick={() => setLessonFilter('all')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 'all' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setLessonFilter(1)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 1 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Aula 1
                </button>
                <button
                  onClick={() => setLessonFilter(2)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 2 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Aula 2
                </button>
                <button
                  onClick={() => setLessonFilter(3)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 3 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Aula 3
                </button>
                <button
                  onClick={() => setLessonFilter(4)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 4 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Aula 4
                </button>
                <button
                  onClick={() => setLessonFilter(5)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 5 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Aula 5
                </button>
                <button
                  onClick={() => setLessonFilter(6)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 6 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Aula 6
                </button>
                <button
                  onClick={() => setLessonFilter(7)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 7 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600'
                  }`}
                >
                  Extra 7
                </button>
                <button
                  onClick={() => setLessonFilter(8)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 8 ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Extra 8
                </button>
                <button
                  onClick={() => setLessonFilter(9)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    lessonFilter === 9 ? 'bg-rose-600 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  Extra 9
                </button>
              </div>
            </div>
            {filteredTracks.map((track) => {
              const isSelected = selectedTrack.id === track.id;
              return (
                <div
                  key={track.id}
                  id={`track-item-${track.id}`}
                  onClick={() => setSelectedTrack(track)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-xs ring-1 ring-slate-900/10'
                      : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {track.category}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speechEngine.speak(track.deText, 'de-DE');
                      }}
                      className="text-xs text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Ouvir</span>
                    </button>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-800 line-clamp-1">{track.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 italic">{track.deText}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Track Detail, Transcription & Pronunciation Lab */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {selectedTrack.category}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-1">{selectedTrack.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <AudioButton text={selectedTrack.deText} lang="de-DE" label="🇩🇪 Alemão" size="sm" />
                  <AudioButton text={selectedTrack.ptText} lang="pt-BR" label="🇧🇷 Português" size="sm" />
                </div>
              </div>

              {/* Tabs: Transcrição vs Laboratório de Pronúncia */}
              <div className="flex border-b border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('transcription')}
                  className={`pb-2 px-3 transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'transcription'
                      ? 'border-slate-900 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Transcrição Integral & Tradução
                </button>
                <button
                  onClick={() => setActiveTab('pronounce')}
                  className={`pb-2 px-3 transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'pronounce'
                      ? 'border-slate-900 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Treinar Minha Pronúncia (Microfone)
                </button>
              </div>

              {activeTab === 'transcription' ? (
                <div className="space-y-4 text-sm">
                  {/* German side */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-slate-700" /> Transcrição Original em Alemão
                      </span>
                      <AudioButton text={selectedTrack.deText} lang="de-DE" size="xs" variant="icon-only" />
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed">{selectedTrack.deText}</p>
                  </div>

                  {/* Portuguese side */}
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tradução Analítica Justaposta em Português
                      </span>
                      <AudioButton text={selectedTrack.ptText} lang="pt-BR" size="xs" variant="icon-only" />
                    </div>
                    <p className="text-slate-800 leading-relaxed">{selectedTrack.ptText}</p>
                  </div>

                  {selectedTrack.note && (
                    <div className="text-xs p-3 rounded-lg bg-amber-50/60 border border-amber-200/70 text-amber-900">
                      <strong>Nota Didática:</strong> {selectedTrack.note}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                    <p className="font-semibold text-slate-800">Como funciona o Treino de Pronúncia:</p>
                    <p>1. Clique no botão de áudio acima para ouvir a pronúncia correta em alemão.</p>
                    <p>2. Clique em "Iniciar Gravação" e repita a frase em alemão.</p>
                    <p>3. O navegador transcreverá sua fala para comparar com o original.</p>
                  </div>

                  <div className="text-center py-4 space-y-3">
                    <button
                      id="studio-mic-btn"
                      type="button"
                      onClick={isRecording ? () => setIsRecording(false) : handleStartRecording}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm transition-all cursor-pointer ${
                        isRecording
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      <span>{isRecording ? 'Ouvindo... Clique para Parar' : 'Iniciar Treino com Microfone'}</span>
                    </button>

                    {!micSupported && (
                      <p className="text-xs text-rose-600">
                        O reconhecimento de voz não é suportado pelo seu navegador atual. Você pode usar a reprodução de áudio normal.
                      </p>
                    )}

                    {userTranscript && (
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-left mt-4 space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          O que o microfone detectou:
                        </span>
                        <p className="text-sm font-semibold text-slate-800">"{userTranscript}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer action */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Sintaxe auditiva certificada (A1 Begegnungen)</span>
              <button
                type="button"
                onClick={() => speechEngine.speak(selectedTrack.deText, 'de-DE')}
                className="font-medium text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" /> Reouvir em Alemão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
