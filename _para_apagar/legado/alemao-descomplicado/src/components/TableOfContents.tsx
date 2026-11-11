import React from 'react';
import { ListFilter } from 'lucide-react';

interface TOCProps {
  week?: 1 | 2;
  lesson: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  onSelectSection: (id: string) => void;
}

const TOC_SECTIONS_SEMANA_2_LESSON_7 = [
  { id: 'sec-1-1', label: '1.1 O Caso Acusativo & Mecânica Universal' },
  { id: 'sec-1-2', label: '1.2 Declinação de Adjetivos Atributivos' },
  { id: 'sec-1-3', label: '1.3 Verbos de Regência Obrigatória no Acusativo' },
  { id: 'sec-1-4', label: '1.4 Fonética dos Tremas ö [ø:] e ü [y:]' },
  { id: 'sec-1-5', label: '1.5 O Caso Nominativo em Perguntas com Adjetivos' },
  { id: 'sec-1-6', label: '1.6 Horários e Expressões Temporais' },
  { id: 'sec-2-1', label: '2.1 Fonética: ö longo vs. ö curto (A14)' },
  { id: 'sec-2-2', label: '2.2 Queixas no Hotel: Ich kann nicht... (A15)' },
  { id: 'sec-2-3-2-4', label: '2.3/2.4 Nominativo e Acusativo com Adjetivos (A16–A17)' },
  { id: 'sec-2-5', label: '2.5 Locais da Cidade: Was es alles gibt (A18)' },
  { id: 'sec-2-6', label: '2.6 Fonética: ü longo vs. ü curto (A19)' },
  { id: 'sec-2-7-to-2-13', label: '2.7–2.13 Munique: Museus & Pontos Turísticos (A20–A26)' },
  { id: 'sec-2-14', label: '2.14 E-mail a Klara & 9 Estruturas Sintáticas (A27)' },
  { id: 'sec-2-15-2-16', label: '2.15/2.16 Redação Guiada & Rotina Temporal (A28–A29)' },
  { id: 'sec-2-17', label: '2.17 Tabela Lexical Primária (25 Termos)' },
  { id: 'sec-2-18', label: '2.18 Registro Coloquial Autêntico (25 Expressões)' },
  { id: 'sec-3-14', label: '3.14 Tradução Reversa de Blindagem (10 Desafios)' },
  { id: 'sec-3-resolucoes', label: '3.1–3.13 Resoluções Comentadas do Livro' },
  { id: 'sec-3-16', label: '3.16 Resumo dos Pontos-Chave Dia 007' },
];

const TOC_SECTIONS_LESSON_1 = [
  { id: 'secao-1-1-v2', label: '1.1 Posição II do Verbo (V2)' },
  { id: 'secao-1-2-perguntas', label: '1.2 W-Fragen & Ja-Nein-Fragen' },
  { id: 'secao-1-3-conjugacao', label: '1.3 Matriz de Conjugação' },
  { id: 'secao-1-4-profissoes-artigo', label: '1.4 Profissões sem Artigo' },
  { id: 'secao-1-5-genero-profissoes', label: '1.5 Gênero e Profissões' },
  { id: 'secao-1-6-numeros', label: '1.6 Números Cardinais (0–100)' },
  { id: 'secao-2-1-a1', label: '2.1 Texto A1: Sich vorstellen' },
  { id: 'secao-2-2-a2', label: '2.2 Texto A2: Perguntas & Respostas' },
  { id: 'secao-2-3-a3', label: '2.3 Texto A3: Países & Regência' },
  { id: 'secao-2-4-a4', label: '2.4 Texto A4: Pronomes er/sie' },
  { id: 'secao-2-5-alfabeto', label: '2.5 Texto A8: Das Alphabet' },
  { id: 'secao-2-6-lexico', label: '2.6 Tabela Lexical (24 termos)' },
  { id: 'secao-2-7-coloquial', label: '2.7 Registro Coloquial' },
  { id: 'secao-3-1-a5', label: '3.1 Ex A5: Wer sind Sie?' },
  { id: 'secao-3-2-a6', label: '3.2 Ex A6: Melodia da Frase' },
  { id: 'secao-3-3-a7', label: '3.3 Ex A7: Entrevista' },
  { id: 'secao-3-6-a10', label: '3.6 Ex A10: Cidades & Soletração' },
  { id: 'secao-3-9-a13', label: '3.9 Ex A13: Áreas e Profissões' },
  { id: 'secao-3-10-a14', label: '3.10 Ex A14: Ferramentas' },
  { id: 'secao-3-11-a15', label: '3.11 Ex A15: Conjugação Final' },
  { id: 'secao-3-12-a16', label: '3.12 Ex A16: Verbos e Regras' },
  { id: 'secao-3-13-traducao-reversa', label: '3.13 Tradução Reversa' },
  { id: 'secao-3-15-resumo', label: '3.15 Resumo dos Pontos-Chave' },
];

const TOC_SECTIONS_LESSON_2 = [
  { id: 'secao-1-1-sprechen', label: '1.1 Verbo sprechen (e → i)' },
  { id: 'secao-1-2-epentetico', label: '1.2 -e- Epentético (-t / -d)' },
  { id: 'secao-1-3-negacao', label: '1.3 Negação: nicht vs. kein' },
  { id: 'secao-1-4-possessivos', label: '1.4 Pronomes Possessivos' },
  { id: 'secao-1-5-regencia', label: '1.5 Regência: aus + Dativo' },
  { id: 'secao-1-6-regras-numeros', label: '1.6 Regras dos Números' },
  { id: 'secao-2-1-a17', label: '2.1 Texto A17: Sprachen & Länder' },
  { id: 'secao-2-2-a18', label: '2.2 Texto A18: Phonetik sch/sp' },
  { id: 'secao-2-3-a19', label: '2.3 Texto A19: Sprechen Sie...?' },
  { id: 'secao-2-4-a20', label: '2.4 Texto A20: Ihre Muttersprache' },
  { id: 'secao-2-5-a21', label: '2.5 Texto A21: Diphthong ei [aɪ]' },
  { id: 'secao-2-6-a22', label: '2.6 Texto A22: Voos & Cidades' },
  { id: 'secao-2-7-a23', label: '2.7 Texto A23: Números 0–10.000' },
  { id: 'secao-2-8-a24', label: '2.8 Texto A24: Flüge no Aeroporto' },
  { id: 'secao-2-9-a25', label: '2.9 Texto A25: Zahlen sprechen' },
  { id: 'secao-2-10-a26', label: '2.10 Texto A26: Telefonnummern' },
  { id: 'secao-2-11-lexico', label: '2.11 Tabela Lexical (20 termos)' },
  { id: 'secao-2-12-coloquial', label: '2.12 Umgangssprache' },
  { id: 'secao-3-1-ex-a17', label: '3.1 Ex A17: Países & Línguas' },
  { id: 'secao-3-2-ex-a19', label: '3.2 Ex A19: Perguntas & Respostas' },
  { id: 'secao-3-3-ex-a20', label: '3.3 Ex A20: Muttersprache' },
  { id: 'secao-3-5-ex-a22', label: '3.5 Ex A22: Aviões & Origens' },
  { id: 'secao-3-10-traducao-reversa', label: '3.10 Tradução Reversa' },
  { id: 'secao-3-12-resumo', label: '3.12 Resumo Pontos-Chave Dia 002' },
];

const TOC_SECTIONS_LESSON_3 = [
  { id: 'secao-1-1-artigos', label: '1.1 Artigo Definido, Indefinido & Negativo' },
  { id: 'secao-1-2-possessivos', label: '1.2 Possessivartikel & Travas de Contraste' },
  { id: 'secao-1-3-satzbau', label: '1.3 Satzbau (Vorfeld, V2, W-Frage, Ja-Nein)' },
  { id: 'secao-1-4-haben', label: '1.4 Verbo haben & Expressões Idiomáticas' },
  { id: 'secao-1-5-sein', label: '1.5 Verbo sein (6 Usos Canônicos)' },
  { id: 'secao-1-6-werden', label: '1.6 Verbo werden (Profissões & Idade)' },
  { id: 'secao-1-7-numeros-avancados', label: '1.7 Números Cardinais (100 a 1 Bilhão)' },
  { id: 'secao-1-8-plural-familias', label: '1.8 As 5 Famílias do Plural' },
  { id: 'secao-2-1-b1-populacao', label: '2.1 Texto B1: População Mundial (2050)' },
  { id: 'secao-2-2-b3-dach', label: '2.2 Texto B3: D-A-CH (Alemanha, Áustria, Suíça)' },
  { id: 'secao-2-3-b2-quiz', label: '2.3 Texto B2: Das WIE-VIELE-Quiz' },
  { id: 'secao-2-4-c1-verbos', label: '2.4 Texto C1: Verbos no Presente' },
  { id: 'secao-2-5-c10-possessivos', label: '2.5 Texto C10: Treino de Possessivos' },
  { id: 'secao-2-6-c11-itens', label: '2.6 Texto C11: 14 Itens com Justificativa' },
  { id: 'secao-2-7-numeros-treinos', label: '2.7 Textos C12–C14: Treinos Numéricos' },
  { id: 'secao-2-10-d1-redemittel', label: '2.10 Texto D1: Wichtige Redemittel' },
  { id: 'secao-2-11-d2-dicionario-verbos', label: '2.11 Texto D2: Dicionário de 16 Verbos' },
  { id: 'secao-2-12-d3-avaliacao', label: '2.12 Texto D3: Evaluation (Autoavaliação)' },
  { id: 'secao-2-13-lexico', label: '2.13 Tabela Lexical Primária (21 termos)' },
  { id: 'secao-2-14-coloquial', label: '2.14 Umgangssprache (10 expressões)' },
  { id: 'secao-3-1-ex-c1-c2', label: '3.1 Ex C1 & C2: Was passt?' },
  { id: 'secao-3-3-ex-c3-dialogo', label: '3.3 Ex C3: Diálogo Conrad & Serena' },
  { id: 'secao-3-4-ex-c4-c5', label: '3.4 Ex C4 & C5: Inflexões Verbais' },
  { id: 'secao-3-6-ex-c6-biografias', label: '3.6 Ex C6: Perfis Auditivos' },
  { id: 'secao-3-7-ex-c7-sintaxe', label: '3.7 Ex C7: Bilden Sie Sätze (16 orações)' },
  { id: 'secao-3-8-ex-c8-c9', label: '3.8 Ex C8 & C9: Perfis & Fragewörter' },
  { id: 'secao-3-10-traducao-reversa', label: '3.10 Tradução Reversa de Blindagem' },
  { id: 'secao-3-12-resumo', label: '3.12 Resumo Pontos-Chave Dia 003' },
];

const TOC_SECTIONS_LESSON_4 = [
  { id: 'secao-1-1-generos-sufixos', label: '1.1 Sufixos de Gênero (der, die, das)' },
  { id: 'secao-1-2-modalverb-koennen', label: '1.2 Modalverb können & Satzklammer' },
  { id: 'secao-1-3-negacao-nicht-kein', label: '1.3 Negação: nicht vs. kein' },
  { id: 'secao-1-4-adjetivo-predicativo-atributivo', label: '1.4 Adjetivo Predicativo vs. Atributivo' },
  { id: 'secao-1-5-antonimos', label: '1.5 Os 9 Pares de Antônimos' },
  { id: 'secao-1-6-alternancia-vocalica', label: '1.6 Verbos com Alternância Vocálica' },
  { id: 'secao-1-7-preposicoes-locais', label: '1.7 Preposições Locais (aus, in, bei, nach)' },
  { id: 'secao-2-1-a1-im-buero', label: '2.1 Texto A1: Im Büro' },
  { id: 'secao-2-2-a2-was-ist-im-buero', label: '2.2 Texto A2: 18 Itens de Escritório' },
  { id: 'secao-2-3-a6-was-kostet', label: '2.3 Texto A6: Was kostet ...?' },
  { id: 'secao-2-4-a8-probleme-im-buero', label: '2.4 Texto A8: Probleme im Büro' },
  { id: 'secao-2-5-a9-was-ist-das-problem', label: '2.5 Texto A9: Was ist das Problem?' },
  { id: 'secao-2-8-a13-eine-neue-kaffeemaschine', label: '2.8 Texto A13: 17 Frases Atributivas' },
  { id: 'secao-2-9-lexico-primario', label: '2.9 Tabela Lexical (23 termos)' },
  { id: 'secao-2-10-coloquial', label: '2.10 Umgangssprache (10 expressões)' },
  { id: 'secao-3-1-ex-a3-wo-sind-die-sachen', label: '3.1 Ex A3: Peter Lindau vs. Rita Kalt' },
  { id: 'secao-3-2-a4-a5-a7-a11', label: '3.2 a 3.5 Ex A4, A5, A7, A11' },
  { id: 'secao-3-7-ex-a14-abteilungen', label: '3.7 Ex A14: Abteilungen da Universidade' },
  { id: 'secao-3-8-ex-a15-hier-kann-man', label: '3.8 Ex A15: Hier kann man ...' },
  { id: 'secao-3-9-ex-a16-posicao-verbos', label: '3.9 Ex A16: Posição dos Verbos' },
  { id: 'secao-3-10-ex-a17-combinacoes', label: '3.10 Ex A17: Combinações Verbo + Objeto' },
  { id: 'secao-3-11-ex-a18-fonetica', label: '3.11 Ex A18: Fonética (Acento Tônico)' },
  { id: 'secao-3-12-hobbies-preferencia', label: '3.12 Ex A19 & A21: Hobbies & lieber' },
  { id: 'secao-3-14-ex-a22-in-der-cafeteria', label: '3.14 Ex A22: In der Cafeteria' },
  { id: 'secao-3-15-traducao-reversa', label: '3.15 Tradução Reversa de Blindagem' },
  { id: 'secao-3-17-resumo-pontos-chave', label: '3.17 Resumo Pontos-Chave Dia 004' },
];

const TOC_SECTIONS_LESSON_5 = [
  { id: 'secao-1-1-preposicoes-locais', label: '1.1 Preposições Locais (aus, in, bei, nach)' },
  { id: 'secao-1-2-verbo-fahren', label: '1.2 Verbo fahren (a → ä)' },
  { id: 'secao-1-3-verbo-nehmen', label: '1.3 Verbo nehmen (e → i + dobra)' },
  { id: 'secao-1-4-essen-e-verbos-fortes', label: '1.4–1.5 essen & Alternâncias e → ie/i' },
  { id: 'secao-1-6-wissen-e-moegen', label: '1.6–1.7 wissen vs kennen & mögen' },
  { id: 'secao-1-8-negacao-revisao', label: '1.8 Negação Rígida: nicht vs. kein' },
  { id: 'secao-1-9-verbos-td-e-tanzen', label: '1.9–1.10 Verbos em -t/-d & tanzen' },
  { id: 'secao-2-1-texto-b1', label: '2.1 Texto B1: Was machen die Österreicher?' },
  { id: 'secao-2-2-texto-b2', label: '2.2 Texto B2: Freizeit in der Schweiz' },
  { id: 'secao-2-3-grupo-nominal', label: '2.3–2.4 C1 Grupo Nominal & C2 15 Frases' },
  { id: 'secao-2-5-a-2-8-antonomos-possessivos', label: '2.5–2.8 C3 a C6: Antônimos & Possessivos' },
  { id: 'secao-2-9-a-2-13-pratica-verbos', label: '2.9–2.13 C7 a C11: können & Conjugação' },
  { id: 'secao-2-14-a-2-17-precisao-gramatical', label: '2.14–2.17 C12 a C15: Limites & Preposições' },
  { id: 'secao-2-18-redemittel', label: '2.18 Texto D1: Wichtige Redemittel' },
  { id: 'secao-2-19-dicionario-verbos', label: '2.19 Texto D2: Dicionário de 23 Verbos' },
  { id: 'secao-2-20-evaluation', label: '2.20 Texto D3: Evaluation (Autoavaliação)' },
  { id: 'secao-2-21-tabela-lexical', label: '2.21 Tabela Lexical (25 termos)' },
  { id: 'secao-2-22-coloquial', label: '2.22 Umgangssprache (12 expressões)' },
  { id: 'secao-3-1-exercicio-a23', label: '3.1 Ex A23: Negation (não gut/gern)' },
  { id: 'secao-3-2-exercicio-a24', label: '3.2 Ex A24: Formell und Informell' },
  { id: 'secao-3-3-exercicio-a25', label: '3.3 Ex A25: Was man machen kann' },
  { id: 'secao-3-4-exercicio-a26', label: '3.4 Ex A26: Was können Sie gut/nicht gut?' },
  { id: 'secao-3-5-e-3-6-agenda-semanal', label: '3.5–3.6 A27 Wochentage & A28 Herr/Frau Meier' },
  { id: 'secao-3-7-exercicio-c7', label: '3.7 Ex C7: Bilden Sie Sätze (16 orações)' },
  { id: 'secao-3-8-traducao-reversa', label: '3.8–3.9 Tradução Reversa de Blindagem' },
  { id: 'secao-3-10-resumo-pontos-chave', label: '3.10 Resumo Pontos-Chave Dia 005' },
];

const TOC_SECTIONS_LESSON_6 = [
  { id: 'secao-1-1-acusativo-introducao', label: '1.1 O Caso Acusativo (Akkusativ)' },
  { id: 'secao-1-2-verbos-acusativo', label: '1.2 Verbos com Acusativo & Satzbau' },
  { id: 'secao-1-3-modalverb-moechten', label: '1.3 Modalverb möchte(n) vs. wollen' },
  { id: 'secao-1-4-palavras-compostas', label: '1.4 Komposita (Último Elemento)' },
  { id: 'secao-1-5-preposicoes-contrações', label: '1.5 Preposições Temporais & Locais' },
  { id: 'secao-1-10-praeteritum-verbos', label: '1.6–1.10 haben/sein no Präteritum' },
  { id: 'secao-2-1-texto-a1', label: '2.1 Texto A1: An der Rezeption (p. 58)' },
  { id: 'secao-2-2-texto-a2', label: '2.2 Texto A2: Modelo de Recepção (p. 59)' },
  { id: 'secao-2-3-texto-a5', label: '2.3 Texto A5: Os 3 Hotéis de Munique' },
  { id: 'secao-2-4-texto-a7', label: '2.4 Texto A7: Anmeldeformular' },
  { id: 'secao-2-5-texto-a8', label: '2.5 Texto A8: Diálogo com Verbos' },
  { id: 'secao-2-6-texto-a9', label: '2.6 Texto A9: der, die, das (Hotel)' },
  { id: 'secao-2-7-fonetica-er-oe', label: '2.7–2.11 Fonética -er [ɐ] & ö [ø:]/[œ]' },
  { id: 'secao-2-9-texto-a12', label: '2.9 Texto A12: Reclamação & mehrere' },
  { id: 'secao-2-12-texto-a15', label: '2.12 Texto A15: Ich kann nicht...' },
  { id: 'secao-2-14-grupo-nominal', label: '2.13–2.14 Grupo Nominal (Nom./Akk.)' },
  { id: 'secao-2-15-tabela-lexical', label: '2.15 Tabela Lexical (29 termos)' },
  { id: 'secao-2-16-coloquial', label: '2.16 Umgangssprache (15 expressões)' },
  { id: 'secao-3-1-exercicio-a6', label: '3.1 Ex A6: Informações Hotéis' },
  { id: 'secao-3-4-exercicio-a11', label: '3.4 Ex A11: Was brauchen Sie?' },
  { id: 'secao-3-5-exercicio-a13', label: '3.5 Ex A13: Probleme im Hotel' },
  { id: 'secao-3-9-traducao-reversa', label: '3.9–3.10 Tradução Reversa de Blindagem' },
  { id: 'secao-3-11-mandamentos', label: '3.11 Resumo Pontos-Chave Dia 006' },
];

const TOC_SECTIONS_LESSON_7 = [
  { id: 'secao-1-1-modalpartikeln', label: '1.1 Modalpartikeln (doch, mal, ja, denn...)' },
  { id: 'secao-1-2-concordancia-discordancia', label: '1.2 Concordância (Ja/Klar) & Discordância (Nein/Quatsch)' },
  { id: 'secao-1-3-duvida-incerteza', label: '1.3 Dúvida & Incerteza (Vielleicht, Wahrscheinlich)' },
  { id: 'secao-1-4-quantidade-intensidade', label: '1.4 Quantidade & Intensidade (Sehr, Ziemlich, Zu)' },
  { id: 'secao-1-5-tempo-sequencia', label: '1.5 Tempo & Sequência (Jetzt, Gleich, Später, Dann)' },
  { id: 'secao-1-6-cortesia-educacao', label: '1.6 Cortesia (Bitte, Danke, Entschuldigung)' },
  { id: 'secao-1-7-surpresa-reacao', label: '1.7 Surpresa & Reação (Echt?, Wirklich?, Ach so!)' },
  { id: 'secao-1-8-despedida-saudacao', label: '1.8 Saudações & Despedidas (Hallo, Tschüss, Mach\'s gut)' },
  { id: 'secao-1-9-opiniao-argumentacao', label: '1.9 Opinião (Ich denke, dass..., Meiner Meinung nach)' },
  { id: 'secao-1-10-acao-comando', label: '1.10 Comandos Imperativos (Komm!, Warte!, Schau!)' },
  { id: 'secao-2-1-50-frases', label: '2.1 As 50 Frases Mais Usadas' },
  { id: 'secao-2-2-tabela-lexical', label: '2.2 Tabela Lexical (42 termos essenciais)' },
  { id: 'secao-2-3-coloquial', label: '2.3 Umgangssprache (29 expressões autênticas)' },
  { id: 'secao-2-4-perguntas-respostas', label: '2.4–2.5 20 Perguntas & 20 Respostas Cotidianas' },
  { id: 'secao-3-1-exercicio-1', label: '3.1 Ex 1: 34 Frases com Palavras Inseridas' },
  { id: 'secao-3-2-exercicio-2', label: '3.2 Ex 2: 20 Traduções para o Alemão' },
  { id: 'secao-3-3-dialogos-cotidianos', label: '3.3 Ex 3: Os 8 Diálogos Cotidianos' },
  { id: 'secao-3-4-traducao-reversa', label: '3.4–3.5 Tradução Reversa de Blindagem (20 sentenças)' },
  { id: 'secao-3-6-mandamentos-sobrevivencia', label: '3.6 Os 10 Mandamentos de Sobrevivência' },
];

const TOC_SECTIONS_LESSON_8 = [
  { id: 'secao-1-1-logica-fundamental', label: '1.1 A Lógica Fundamental (Wo? vs. Wohin? vs. Woher?)' },
  { id: 'prep-1-in', label: '1.2 Preposição in (+ Dativo / + Acusativo)' },
  { id: 'prep-2-im', label: '1.3 Contração im (in + dem)' },
  { id: 'prep-3-ins', label: '1.4 Contração ins (in + das)' },
  { id: 'prep-4-aus', label: '1.5 Preposição aus (Origem / aus vs. von)' },
  { id: 'prep-5-zu', label: '1.6 Preposição zu (Pessoas e Instituições)' },
  { id: 'prep-6-zum', label: '1.7 Contração zum (zu + dem)' },
  { id: 'prep-7-zur', label: '1.8 Contração zur (zu + der)' },
  { id: 'prep-8-nach', label: '1.9 Preposição nach (Cidades, Países e nach Hause)' },
  { id: 'prep-9-an', label: '1.10 an / am / ans (Contato Vertical e Margens)' },
  { id: 'prep-10-auf', label: '1.11 auf / aufs (Contato Horizontal e Espaços Abertos)' },
  { id: 'prep-11-bei', label: '1.12 bei / beim (Permanência com Pessoas e Empresas)' },
  { id: 'prep-12-von', label: '1.13 von / vom (Origem de Pessoas e Eventos)' },
  { id: 'secao-2-1-tabela-resumo', label: '2.1 Tabela Resumo Completa (16 Preposições)' },
  { id: 'secao-2-2-regras-praticas', label: '2.2 As 4 Regras Práticas para Não Errar' },
  { id: 'secao-2-3-dialogos-vivos', label: '2.3 Diálogos Vivos das Preposições' },
  { id: 'secao-3-1-exercicio-in', label: '3.1 Ex 1: im, in der, in den, ins, in die' },
  { id: 'secao-3-2-exercicio-aus-zu', label: '3.2 Ex 2: aus, von, vom, zu, zum, zur, nach' },
  { id: 'secao-3-3-exercicio-an-auf-bei', label: '3.3 Ex 3: am, ans, auf dem, auf den, bei, beim' },
  { id: 'secao-3-4-detector-casos', label: '3.4 Ex 4: Detector de Pergunta & Caso' },
  { id: 'secao-3-5-traducao-reversa', label: '3.5 Tradução Reversa de Blindagem (20 Frases)' },
  { id: 'secao-3-6-dicas-finais', label: '3.6 As 8 Dicas de Ouro de Memorização' },
];

const TOC_SECTIONS_LESSON_9 = [
  { id: 'secao-1-1-visao-geral', label: '1.1 Visão Geral dos 3 Grupos de Verbos' },
  { id: 'secao-1-2-grupo-1-a-ae', label: '1.2 Grupo 1 (a → ä: waschen, lassen, fangen, raten, halten)' },
  { id: 'secao-1-3-grupo-2-e-i', label: '1.3 Grupo 2 (e → i: nehmen, treffen, essen, vergessen, helfen, werfen, sterben)' },
  { id: 'secao-1-4-grupo-3-irregulares', label: '1.4 Grupo 3 (wissen, mögen, reden, warten, baden, bilden)' },
  { id: 'secao-2-1-dialogos', label: '2.1 Diálogos do Cotidiano (5 Diálogos Autênticos)' },
  { id: 'secao-2-2-tabela-lexical', label: '2.2 Tabela Lexical Primária (30 Termos)' },
  { id: 'secao-2-3-umgangssprache', label: '2.3 Registro Coloquial (28 Expressões Umgangssprache)' },
  { id: 'secao-3-1-exercicio-1-conjugar', label: '3.1 Ex 1: Conjugue os Verbos (18 Itens)' },
  { id: 'secao-3-2-exercicio-2-banco-verbos', label: '3.2 Ex 2: Banco de Verbos (18 Frases)' },
  { id: 'secao-3-3-exercicio-3-traducao', label: '3.3 Ex 3: Tradução para o Alemão (18 Sentenças)' },
  { id: 'secao-3-4-exercicio-4-dialogos', label: '3.4 Ex 4: Complete os Diálogos' },
  { id: 'secao-3-5-exercicio-5-blindagem', label: '3.5 Ex 5: Tradução Reversa de Blindagem (18 Frases)' },
  { id: 'secao-3-6-exercicio-6-escrever-dialogo', label: '3.6 Ex 6: Produção de Diálogo com 8 Verbos' },
  { id: 'secao-3-7-resumo-pontos-chave', label: '3.7 Resumo dos Pontos-Chave (Tabela Mestre dos 18 Verbos)' },
];

const TOC_SECTIONS_SEMANA_2_LESSON_8 = [
  { id: 'sec-1-1', label: '1.1 O Plural dos Substantivos — As 5 Famílias' },
  { id: 'sec-1-2', label: '1.2 Substantivos Compostos (Komposita)' },
  { id: 'sec-1-3', label: '1.3 Pronomes Pessoais no Acusativo' },
  { id: 'sec-1-4-to-1-6', label: '1.4–1.6 Modais (möchten/können) + Pronomes & Satzklammer' },
  { id: 'sec-2-1-to-2-3', label: '2.1–2.3 Cidades Mais Visitadas & Pontos Cardeais (Textos B1–B3)' },
  { id: 'sec-2-4-to-2-6', label: '2.4–2.6 München: Capital da Baviera (Textos B4–B6)' },
  { id: 'sec-2-16', label: '2.16 Diálogos no Hotel & Turismo (Texto D1)' },
  { id: 'sec-2-17', label: '2.17 Dicionário de 21 Verbos Fundamentais (Texto D2)' },
  { id: 'sec-2-19', label: '2.19 Tabela Lexical Primária (28 Termos)' },
  { id: 'sec-2-20', label: '2.20 Umgangssprache (30 Expressões)' },
  { id: 'sec-3-1-to-3-14', label: '3.1–3.14 Gabarito Comentado (Exercícios C1 a C14)' },
  { id: 'sec-3-15-to-3-16', label: '3.15 Laboratório de Tradução Reversa (15 Sentenças)' },
  { id: 'sec-3-17', label: '3.17 Tabela Mestre dos Pontos-Chave' },
];

const TOC_SECTIONS_SEMANA_2_LESSON_9 = [
  { id: 'sec-1-1', label: '1.1 Modalverb mögen (gostar) & möchten' },
  { id: 'sec-1-2', label: '1.2 Präteritum de sein (war) & haben (hatte)' },
  { id: 'sec-1-3', label: '1.3 As 5 Famílias do Plural em Alimentos & Utensílios' },
  { id: 'sec-1-4-to-1-8', label: '1.4–1.8 O Acusativo com essen, trinken, nehmen' },
  { id: 'sec-2-1', label: '2.1 Texto A1: Beim Frühstück (Hotel-Dialog)' },
  { id: 'sec-2-2', label: '2.2 Texto A2: Unser Frühstücksangebot (27 Itens)' },
  { id: 'sec-2-4', label: '2.4 Texto A5: Das Frühstücksbüfett (70% & Hotel Adlon)' },
  { id: 'sec-2-7', label: '2.7 Texto A10: Geschirr und Besteck (Louça e Talheres)' },
  { id: 'sec-2-9', label: '2.9 Texto A12: Einkaufen im Supermarkt (Ofertas)' },
  { id: 'sec-2-14-to-2-15', label: '2.14–2.15 Top Frutas & Receita Obstsalat' },
  { id: 'sec-2-22', label: '2.22 Texto A26: Speisekarte (Cardápio Completo)' },
  { id: 'sec-2-25', label: '2.25 Texto A29: Gespräch im Restaurant' },
  { id: 'sec-2-28', label: '2.28 Tabela Lexical Primária (30 Termos)' },
  { id: 'sec-2-29', label: '2.29 Umgangssprache (18 Expressões)' },
  { id: 'sec-3-1-to-3-14', label: '3.1–3.14 Gabarito Comentado (Exercícios A3 a A28)' },
  { id: 'sec-3-15-to-3-16', label: '3.15–3.16 Laboratório de Tradução Reversa (10 Sentenças)' },
  { id: 'sec-3-17', label: '3.17 Tabela Mestre dos 15 Pontos-Chave' },
];

const TOC_SECTIONS_SEMANA_2_LESSON_10 = [
  { id: 'sec-1-1', label: '1.1 Imperativo Completo (Sie, du, ihr)' },
  { id: 'sec-1-2', label: '1.2 Präteritum de sein (war) & haben (hatte)' },
  { id: 'sec-1-3', label: '1.3 As 5 Famílias do Plural em Utensílios' },
  { id: 'sec-1-4', label: '1.4 Gêneros, Conjunções (trotzdem/deshalb) & Perfekt' },
  { id: 'sec-2-1', label: '2.1 Texto B1: Das Essen-und-Trinken-Quiz' },
  { id: 'sec-2-2', label: '2.2 Texto B2: Die Kartoffel (História & Van Gogh)' },
  { id: 'sec-2-4', label: '2.4 Texto B4: Zwei Rezepte mit Kartoffeln' },
  { id: 'sec-2-5', label: '2.5 Texto B5: Im Restaurant & Redemittel' },
  { id: 'sec-2-24', label: '2.24 Texto D1: Wichtige Redemittel' },
  { id: 'sec-2-27', label: '2.27 Tabela Lexical Primária (27 Termos)' },
  { id: 'sec-2-28', label: '2.28 Umgangssprache (20 Expressões)' },
  { id: 'sec-3-resolucoes', label: '3.1–3.19 Resoluções Comentadas (C1 a C16)' },
  { id: 'sec-3-20', label: '3.20–3.21 Tradução Reversa de Blindagem (10 Desafios)' },
  { id: 'sec-3-22', label: '3.22 Tabela Mestre dos 16 Pontos-Chave' },
];

const TOC_SECTIONS_SEMANA_2_LESSON_11 = [
  { id: 'sec-1-1', label: '1.1 Verbos Separáveis (15 Verbos & Satzbau)' },
  { id: 'sec-1-2', label: '1.2 Verbos Inseparáveis (8 Sentinelas)' },
  { id: 'sec-1-3', label: '1.3 O Perfekt: haben vs. sein' },
  { id: 'sec-1-4', label: '1.4–1.6 Modalverben: müssen vs. sollen' },
  { id: 'sec-1-7', label: '1.7 Preposições Temporais (am, im, um...)' },
  { id: 'sec-1-8', label: '1.8–1.10 Paradigmas anfangen & aufstehen' },
  { id: 'sec-2-1', label: '2.1 Texto A1: Was macht Martin? (Rotina)' },
  { id: 'sec-2-4', label: '2.4 Texto A5: Wie spät ist es? (Horários)' },
  { id: 'sec-2-12', label: '2.11–2.12 Textos A13–A14: Paula no Perfekt' },
  { id: 'sec-2-14', label: '2.14 Texto A17: Martin no Perfekt (sein vs haben)' },
  { id: 'sec-2-17', label: '2.17 Tabela Lexical Primária (29 Termos)' },
  { id: 'sec-2-18', label: '2.18 Umgangssprache (20 Expressões)' },
  { id: 'sec-3-resolucoes', label: '3.1–3.10 Gabarito Comentado (A2 a A19)' },
  { id: 'sec-3-20', label: '3.11–3.12 Tradução Reversa de Blindagem (10 Desafios)' },
  { id: 'sec-3-22', label: '3.13 Tabela Mestre dos 15 Pontos-Chave' },
];

const TOC_SECTIONS_SEMANA_2_LESSON_12 = [
  { id: 'sec-1-1', label: '1.1 Verbos Separáveis (27 Verbos & Satzbau)' },
  { id: 'sec-1-2', label: '1.2 Verbos Inseparáveis (8 Sentinelas)' },
  { id: 'sec-1-3', label: '1.3 Verbos em -ieren (Perfekt sem ge-)' },
  { id: 'sec-1-5', label: '1.5 O Perfekt: haben vs. sein' },
  { id: 'sec-1-7', label: '1.7 Perfekt com Modalverben (Ersatzinfinitiv)' },
  { id: 'sec-1-9', label: '1.9 Wechselpräpositionen: Wo? vs. Wohin?' },
  { id: 'sec-2-1', label: '2.1–2.2 Am Computer & Was kann man tun?' },
  { id: 'sec-2-3', label: '2.3 & 2.9 Fonética (Wortakzent & st [ʃt])' },
  { id: 'sec-2-6', label: '2.6 Texto A25: Ein Reparaturauftrag' },
  { id: 'sec-2-7', label: '2.7–2.8 O Calendário Alemão (Tage, Monate, Datum)' },
  { id: 'sec-2-13', label: '2.13–2.14 Mídia e Televisão na Alemanha' },
  { id: 'sec-2-29', label: '2.29 Tabela Lexical Primária (30 Termos)' },
  { id: 'sec-2-30', label: '2.30 Umgangssprache (26 Expressões)' },
  { id: 'sec-3-resolucoes', label: '3.1–3.16 Resoluções Comentadas (A23 a C10)' },
  { id: 'sec-3-20', label: '3.17–3.18 Tradução Reversa de Blindagem (12 Desafios)' },
  { id: 'sec-3-22', label: '3.19 Tabela Mestre dos 17 Pontos-Chave' },
];

const TOC_SECTIONS_SEMANA_2_LESSON_13 = [
  { id: 'sec-1-1', label: '1.1 Die vier Jahreszeiten & Das Wetter' },
  { id: 'sec-1-2', label: '1.2 A Conjunção denn vs. weil' },
  { id: 'sec-1-3', label: '1.3 O Modalverb wollen & Trava com möchten' },
  { id: 'sec-1-4', label: '1.4 O Imperativo (Revisão Sie, du, ihr)' },
  { id: 'sec-1-5', label: '1.5–1.6 Verben mit Dativ & Pronomes no Dativo' },
  { id: 'sec-1-7', label: '1.7 Richtungsangaben: Wohin? (nach/in/an/auf/zu)' },
  { id: 'sec-1-8', label: '1.8 Verkehrsmittel & O Dativo com mit' },
  { id: 'sec-1-9', label: '1.9 Demonstrativartikel (dieser / welcher)' },
  { id: 'sec-2-26', label: '2.26 Texto A26: E-mail da Ilha de Hiddensee' },
  { id: 'sec-2-17', label: '2.17 Texto A17: Compras de Roupas & Cores' },
  { id: 'sec-2-20', label: '2.20 Fonética: ch-Laut ([ç] vs. [x])' },
  { id: 'sec-2-30', label: '2.30 Tabela Lexical Primária (45 Termos)' },
  { id: 'sec-2-31', label: '2.31 Umgangssprache (26 Expressões)' },
  { id: 'sec-3-resolucoes', label: '3.1–3.9 Gabarito Comentado (A2 a A25)' },
  { id: 'sec-3-20', label: '3.10–3.11 Tradução Reversa de Blindagem (12 Desafios)' },
  { id: 'sec-3-22', label: '3.12 Tabela Mestre dos 17 Pontos-Chave' },
];

export const TableOfContents: React.FC<TOCProps> = ({ week = 1, lesson, onSelectSection }) => {
  const sections =
    week === 2
      ? lesson === 13
        ? TOC_SECTIONS_SEMANA_2_LESSON_13
        : lesson === 12
        ? TOC_SECTIONS_SEMANA_2_LESSON_12
        : lesson === 11
        ? TOC_SECTIONS_SEMANA_2_LESSON_11
        : lesson === 10
        ? TOC_SECTIONS_SEMANA_2_LESSON_10
        : lesson === 9
        ? TOC_SECTIONS_SEMANA_2_LESSON_9
        : lesson === 8
        ? TOC_SECTIONS_SEMANA_2_LESSON_8
        : TOC_SECTIONS_SEMANA_2_LESSON_7
      : lesson === 1
      ? TOC_SECTIONS_LESSON_1
      : lesson === 2
      ? TOC_SECTIONS_LESSON_2
      : lesson === 3
      ? TOC_SECTIONS_LESSON_3
      : lesson === 4
      ? TOC_SECTIONS_LESSON_4
      : lesson === 5
      ? TOC_SECTIONS_LESSON_5
      : lesson === 6
      ? TOC_SECTIONS_LESSON_6
      : lesson === 7
      ? TOC_SECTIONS_LESSON_7
      : lesson === 8
      ? TOC_SECTIONS_LESSON_8
      : TOC_SECTIONS_LESSON_9;

  return (
    <div id="quick-navigation-toc" className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <ListFilter className="w-3.5 h-3.5 text-indigo-600" />
          {week === 2
            ? `Índice Rápido · Semana 2 — Aula 0${lesson} (Dia 00${lesson})`
            : `Índice Rápido da Aula 0${lesson} · Rodada 0${lesson}`}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">{sections.length} seções</span>
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
        {sections.map((sec) => (
          <button
            key={sec.id}
            id={`toc-item-${sec.id}`}
            onClick={() => onSelectSection(sec.id)}
            className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200/80 text-slate-600 text-left transition-colors cursor-pointer"
          >
            {sec.label}
          </button>
        ))}
      </div>
    </div>
  );
};
