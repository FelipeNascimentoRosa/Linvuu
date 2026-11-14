/** Seleção editorial de vocabulário cotidiano; não representa um ranking de corpus. */
import { ac } from './alfabeto/base';

const linhas = `
я|eu
ты|você, tu
вы|vocês; você formal
он|ele
она'|ela
оно'|ele ou ela, neutro
мы|nós
они'|eles, elas
э'то|isto; isso
кто|quem
что|o que; que
где|onde
куда'|para onde
когда'|quando
как|como
почему'|por que
ско'лько|quanto; quantos
да|sim
нет|não
не|não, antes de uma palavra
и|e
а|e; mas, conforme o contexto
но|mas
и'ли|ou
то'же|também
здесь|aqui
там|lá
сего'дня|hoje
за'втра|amanhã
вчера'|ontem
сейча'с|agora
пото'м|depois
всегда'|sempre
иногда'|às vezes
ча'сто|frequentemente
у'тро|manhã
день|dia
ве'чер|noite, começo da noite
ночь|noite
неде'ля|semana
ме'сяц|mês
год|ano
вре'мя|tempo; horário
час|hora
мину'та|minuto
спаси'бо|obrigado; obrigada
пожа'луйста|por favor; de nada
приве'т|oi
здра'вствуйте|olá, formal
пока'|tchau
извини'те|desculpe; com licença, formal
хорошо'|bem; tudo bem
пло'хо|mal
мо'жно|pode; é permitido
ну'жно|é necessário; precisa
на'до|é preciso
о'чень|muito
мно'го|muito; muitos
ма'ло|pouco
бо'льше|mais
ме'ньше|menos
ещё|ainda; mais
уже'|já
про'сто|simplesmente; fácil
дома'|em casa
домо'й|para casa
дом|casa
кварти'ра|apartamento
ко'мната|quarto; cômodo
ку'хня|cozinha
дверь|porta
окно'|janela
стол|mesa
стул|cadeira
крова'ть|cama
ключ|chave
телефо'н|telefone
компью'тер|computador
кни'га|livro
де'ньги|dinheiro
рабо'та|trabalho
шко'ла|escola
магази'н|loja
банк|banco
апте'ка|farmácia
больни'ца|hospital
у'лица|rua
го'род|cidade
страна'|país
ме'сто|lugar
метро'|metrô
авто'бус|ônibus
маши'на|carro
такси'|táxi
по'езд|trem
биле'т|bilhete; passagem
вход|entrada
вы'ход|saída
туале'т|banheiro
челове'к|pessoa
лю'ди|pessoas
друг|amigo
подру'га|amiga
семья'|família
ма'ма|mãe
па'па|pai
брат|irmão
сестра'|irmã
муж|marido
жена'|esposa
ребёнок|criança
де'ти|crianças
сын|filho
дочь|filha
и'мя|nome
еда'|comida
вода'|água
чай|chá
ко'фе|café
молоко'|leite
хлеб|pão
суп|sopa
мя'со|carne
ры'ба|peixe
я'блоко|maçã
за'втрак|café da manhã
обе'д|almoço
у'жин|jantar
са'хар|açúcar
соль|sal
голова'|cabeça
рука'|mão; braço
нога'|perna; pé
глаз|olho
но'с|nariz
здоро'вье|saúde
врач|médico; médica
вопро'с|pergunta
отве'т|resposta
сло'во|palavra
язы'к|língua; idioma
по'мощь|ajuda
люби'ть|amar; gostar de
хоте'ть|querer
мочь|poder; conseguir
знать|saber; conhecer
понима'ть|entender
говори'ть|falar
сказа'ть|dizer
слу'шать|escutar
ви'деть|ver
смотре'ть|olhar; assistir
чи'тать|ler
писа'ть|escrever
де'лать|fazer
рабо'тать|trabalhar
учи'ться|estudar; aprender
жить|morar; viver
идти'|ir a pé
е'хать|ir de transporte
приходи'ть|vir; chegar
есть|comer
пить|beber
покупа'ть|comprar
дава'ть|dar
брать|pegar; tomar
ждать|esperar
спать|dormir
отдыха'ть|descansar
откры'ть|abrir
закры'ть|fechar
начина'ть|começar
большо'й|grande
ма'ленький|pequeno
но'вый|novo
ста'рый|velho; antigo
хоро'ший|bom
плохо'й|ruim
краси'вый|bonito
ва'жный|importante
интере'сный|interessante
ле'гкий|fácil; leve
кот|gato
до'рогой|caro; querido
де'шевый|barato
тёплый|morno; quente
холо'дный|frio
го'рячий|quente
занято'й|ocupado
го'товый|pronto
оди'н|um
два|dois
три|três
четы'ре|quatro
пять|cinco
ше'сть|seis
се'мь|sete
во'семь|oito
де'вять|nove
де'сять|dez
`.trim().split('\n');

export const VOCABULARIO_RUSSO = linhas.map((linha) => {
  const [ru, pt] = linha.trim().split('|');
  const vogais = [...ru].filter((letra) => /[аеиоуыэюяё]/i.test(letra));
  const marcado = ru !== 'не' && ru.length > 1 && vogais.length === 1 && !ru.includes("'") && !/ё/i.test(ru)
    ? ru.replace(/[аеиоуыэюя]/i, (v) => `${v}'`)
    : ru;
  return { txt: ac(marcado), pt };
});
