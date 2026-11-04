import { LOCALE } from './index';

// Textos da home compartilhada. O conteúdo didático não é traduzido aqui.
const copy: Record<string, readonly [string, string]> = {
  'Que bom ter você de volta. Seu próximo passo está aqui.': ['Welcome back. Your next step is right here.', 'Qué bueno verte de nuevo. Tu próximo paso está aquí.'],
  'Vamos começar pela primeira sessão, no seu ritmo.': ['Let us start with the first session, at your own pace.', 'Empecemos por la primera sesión, a tu ritmo.'],
  'Nenhuma sessão marcada ainda': ['No sessions marked yet', 'Ninguna sesión marcada todavía'],
  'Você marcou todas as sessões deste curso. Revisar o que quiser é sempre uma boa ideia.': ['You have marked every session in this course. Reviewing whatever you like is always a good idea.', 'Has marcado todas las sesiones de este curso. Repasar lo que quieras siempre es buena idea.'],
  'Próxima:': ['Next:', 'Siguiente:'],
  'Livro de': ['Book:', 'Libro de'], 'Gramática de': ['Grammar:', 'Gramática de'],
  'Livros A1–A2 em seis idiomas. Leia os dois primeiros capítulos grátis, com áudio.': ['A1–A2 books in six languages. Read the first two chapters free, with audio.', 'Libros A1–A2 en seis idiomas. Lee los dos primeros capítulos gratis, con audio.'],
  'Escolher meu idioma': ['Choose my language', 'Elegir mi idioma'],
  'Começar a primeira sessão em': ['Start the first session in', 'Empezar la primera sesión de'],
  'Estamos produzindo livros para os níveis B1–B2. Eles ainda não estão disponíveis.': ['We are producing books for B1–B2 levels. They are not available yet.', 'Estamos preparando libros para los niveles B1–B2. Todavía no están disponibles.'],
  'Livro de alemão →': ['German book →', 'Libro de alemán →'], 'Livro de espanhol →': ['Spanish book →', 'Libro de español →'],

  'CONHEÇA O VUU': ['MEET VUU', 'CONOCE A VUU'],
  'Uma língua fica mais próxima quando faz sentido.': ['A language feels closer when it makes sense.', 'Una lengua se siente más cercana cuando tiene sentido.'],
  'Vuu acompanha a curiosidade que move a Linvuu: entender o que as palavras fazem, ouvir como soam e usar o idioma em situações reais.': ['Vuu shares the curiosity behind Linvuu: understand what words do, hear how they sound and use the language in real situations.', 'Vuu comparte la curiosidad que mueve a Linvuu: entender qué hacen las palabras, escuchar cómo suenan y usar el idioma en situaciones reales.'],
  'Comece com uma explicação em português e pratique no seu ritmo.': ['Start with an explanation in English and practise at your own pace.', 'Empieza con una explicación en español y practica a tu ritmo.'],
  'Conhecer o curso de alemão →': ['Explore the German course →', 'Conocer el curso de alemán →'],

  'VUU · UM GOSTINHO DO SEU PRÓXIMO IDIOMA': ['VUU · A TASTE OF YOUR NEXT LANGUAGE', 'VUU · UNA MUESTRA DE TU PRÓXIMO IDIOMA'],
  'A OFERTA DE HOJE': ['AVAILABLE TODAY', 'DISPONIBLE HOY'],
  'Seu ritmo.': ['Your pace.', 'A tu ritmo.'], 'Seu próximo idioma.': ['Your next language.', 'Tu próximo idioma.'],
  'Acesso aos cursos de idiomas, com explicações em português. Comece pelas duas primeiras aulas grátis, sem cartão.': ['Language courses with explanations in English. Start with two free lessons, no card required.', 'Cursos de idiomas con explicaciones en español. Empieza con dos clases gratis, sin tarjeta.'],
  'Mensal': ['Monthly', 'Mensual'], 'Três meses no Pix': ['Three months with Pix', 'Tres meses con Pix'], 'Anual': ['Annual', 'Anual'],
  'por mês · renovação automática': ['per month · automatic renewal', 'por mes · renovación automática'],
  'pagamento único · 30% de desconto': ['one-time payment · 30% off', 'pago único · 30% de descuento'],
  '12 meses · pagamento único': ['12 months · one-time payment', '12 meses · pago único'],
  'Ver condições do plano': ['View plan details', 'Ver condiciones del plan'],
  'Menor preço por mês': ['Lowest price per month', 'Menor precio por mes'],
  'por mês': ['per month', 'por mes'],
  'O plano de três meses também está disponível no cartão ou boleto. Consulte os valores e condições antes de contratar.': ['The three-month plan is also available by card or boleto. Review prices and terms before subscribing.', 'El plan de tres meses también está disponible con tarjeta o boleto. Consulta precios y condiciones antes de contratar.'],
  'Experimentar duas aulas grátis →': ['Try two free lessons →', 'Probar dos clases gratis →'],
  'Ver todos os detalhes da assinatura →': ['View subscription details →', 'Ver detalles de la suscripción →'],
  'Quais cursos estão incluídos?': ['Which courses are included?', '¿Qué cursos están incluidos?'],
  'A assinatura atual dá acesso aos cursos da Linvuu. Antes de contratar, experimente as duas primeiras aulas de cada curso sem cartão.': ['The current subscription includes Linvuu courses. Try the first two lessons of each course without a card before subscribing.', 'La suscripción actual incluye los cursos de Linvuu. Prueba las dos primeras clases de cada curso sin tarjeta antes de contratar.'],

  'Planos': ['Plans', 'Planes'],
  'Cursos de idiomas para brasileiros': ['Language courses for English speakers', 'Cursos de idiomas para hispanohablantes'],
  'Cursos de inglês, espanhol, francês, italiano, alemão e russo feitos para brasileiros. Explicações em português, áudio e exercícios. Experimente 2 aulas grátis.': ['Brazilian Portuguese, Spanish, French, Italian, German and Russian courses for English speakers. Explanations in English, audio and exercises. Try 2 free lessons.', 'Cursos de inglés, español, francés, italiano, alemán y ruso para hispanohablantes. Explicaciones en español, audio y ejercicios. Prueba 2 clases gratis.'],
  'Aprenda um novo idioma com explicações que fazem sentido para brasileiros. Ouça, entenda e pratique — um passo possível de cada vez.': ['Learn a new language with explanations that make sense to English speakers. Listen, understand and practise — one achievable step at a time.', 'Aprende un nuevo idioma con explicaciones pensadas para hispanohablantes. Escucha, comprende y practica, un paso a tu alcance cada vez.'],
  'Português do Brasil': ['Brazilian Portuguese', 'Portugués de Brasil'], 'Do primeiro “oi” às suas próximas conversas no Brasil.': ['From your first “oi” to your next conversations in Brazil.', 'Del primer «oi» a tus próximas conversaciones en Brasil.'],
  'Inglês': ['English', 'Inglés'], 'Espanhol': ['Spanish', 'Español'], 'Francês': ['French', 'Francés'],
  'Italiano': ['Italian', 'Italiano'], 'Alemão': ['German', 'Alemán'], 'Russo': ['Russian', 'Ruso'],
  'Do primeiro hello às suas próximas conversas.': ['From your first hello to your next conversations.', 'De tu primer hello a tus próximas conversaciones.'],
  'Vá além do portunhol, com explicações que fazem sentido.': ['Go beyond phrasebook Spanish, with clear explanations.', 'Deja atrás el portuñol con explicaciones claras.'],
  'Descubra os sons e entenda a lógica do francês.': ['Discover the sounds and understand how French works.', 'Descubre los sonidos y comprende la lógica del francés.'],
  'Aproxime a vontade de falar da prática diária.': ['Turn your wish to speak into everyday practice.', 'Convierte las ganas de hablar en práctica diaria.'],
  'Descomplique os primeiros passos, uma regra de cada vez.': ['Make your first steps simpler, one rule at a time.', 'Simplifica tus primeros pasos, una regla cada vez.'],
  'Comece pelo cirílico. Construa o resto com orientação.': ['Start with Cyrillic. Build the rest with guidance.', 'Empieza por el cirílico. Avanza con orientación.'],
  'Preciso saber alguma coisa para começar?': ['Do I need any previous knowledge?', '¿Necesito conocimientos previos para empezar?'],
  'Não. Você pode começar do zero. As explicações são em português e a trilha apresenta o idioma passo a passo.': ['No. You can start from scratch. Explanations are in English, and the learning path introduces the language step by step.', 'No. Puedes empezar desde cero. Las explicaciones están en español y el recorrido presenta el idioma paso a paso.'],
  'Como posso conhecer as aulas?': ['How can I try the lessons?', '¿Cómo puedo probar las clases?'],
  'As duas primeiras aulas de cada curso são gratuitas. Você pode experimentar antes de decidir pela assinatura.': ['The first two lessons of each course are free. Try them before deciding on a subscription.', 'Las dos primeras clases de cada curso son gratuitas. Puedes probarlas antes de decidir si te suscribes.'],
  'Os novos planos já estão disponíveis?': ['Are the new plans available yet?', '¿Ya están disponibles los nuevos planes?'],
  'Start, Basic, Intermediário e Premium estão em preparação. A comparação nesta página apresenta a proposta; os preços e as condições serão informados antes da contratação. A seleção de idiomas aqui não altera sua conta.': ['Start, Basic, Intermediate and Premium are being prepared. This page previews the proposal; prices and terms will be provided before purchase. Selecting languages here does not change your account.', 'Start, Basic, Intermedio y Premium están en preparación. Esta página presenta la propuesta; los precios y las condiciones se comunicarán antes de contratar. Elegir idiomas aquí no modifica tu cuenta.'],
  'Qual é a diferença do apoio no Premium?': ['What additional support does Premium offer?', '¿Qué apoyo adicional ofrece Premium?'],
  'A proposta do Premium inclui professor para dúvidas específicas sobre o conteúdo pelo WhatsApp Business. Horários e prazo de resposta serão definidos antes do lançamento. Todos os planos terão a mesma qualidade de conteúdo e suporte técnico.': ['The proposed Premium plan includes a teacher for specific questions about the course content via WhatsApp Business. Availability and response times will be defined before launch. All plans will have the same content quality and technical support.', 'La propuesta de Premium incluye un profesor para dudas específicas sobre el contenido por WhatsApp Business. Los horarios y los plazos de respuesta se definirán antes del lanzamiento. Todos los planes tendrán la misma calidad de contenido y soporte técnico.'],
  'Quanto tempo preciso reservar?': ['How much time should I set aside?', '¿Cuánto tiempo necesito reservar?'],
  'As sessões são organizadas para cerca de 30 minutos. Você pode estudar no seu ritmo e voltar para continuar.': ['Sessions are designed to take around 30 minutes. Study at your own pace and return to carry on.', 'Las sesiones están organizadas para unos 30 minutos. Puedes estudiar a tu ritmo y volver para continuar.'],
  'Não foi possível tocar o áudio. Tente novamente.': ['The audio could not be played. Please try again.', 'No se pudo reproducir el audio. Inténtalo de nuevo.'],
  'Seu próximo passo:': ['Your next step:', 'Tu próximo paso:'],
  'Continuar minha sessão →': ['Continue my session →', 'Continuar mi sesión →'],
  'CURSOS DE IDIOMAS FEITOS PARA BRASILEIROS': ['LANGUAGE COURSES MADE FOR ENGLISH SPEAKERS', 'CURSOS DE IDIOMAS PENSADOS PARA HISPANOHABLANTES'],
  'O mundo tem': ['The world has', 'El mundo tiene'], 'muito a dizer.': ['so much to say.', 'mucho que decir.'],
  'Entre na conversa.': ['Join the conversation.', 'Únete a la conversación.'],
  'Encontrar meu plano': ['Find my plan', 'Encontrar mi plan'], 'Encontrar meu plano ↗': ['Find my plan ↗', 'Encontrar mi plan ↗'],
  'Experimentar o método ↓': ['Try the method ↓', 'Probar el método ↓'],
  '2 primeiras aulas grátis · Sem cartão para experimentar': ['First 2 lessons free · No card needed to try', '2 primeras clases gratis · Sin tarjeta para probar'],
  'Olá, mundo.': ['Hello, world.', 'Hola, mundo.'], 'Um novo começo ↗': ['A new beginning ↗', 'Un nuevo comienzo ↗'],
  'UM GOSTINHO DO SEU PRÓXIMO IDIOMA': ['A TASTE OF YOUR NEXT LANGUAGE', 'UNA MUESTRA DE TU PRÓXIMO IDIOMA'],
  'Quero ouvir em': ['I want to listen in', 'Quiero escuchar en'], 'NO CAFÉ': ['AT THE CAFÉ', 'EN EL CAFÉ'],
  'Olá. Um café, por favor.': ['Hello. A coffee, please.', 'Hola. Un café, por favor.'],
  'Ouvir frase em': ['Listen to the phrase in', 'Escuchar la frase en'], 'Ouvindo…': ['Listening…', 'Escuchando…'],
  'Ouça. Repita.': ['Listen. Repeat.', 'Escucha. Repite.'],
  'Pequenas frases. Novas possibilidades.': ['Small phrases. New possibilities.', 'Frases pequeñas. Nuevas posibilidades.'],
  'Abrir aula grátis →': ['Open a free lesson →', 'Abrir una clase gratis →'],
  'Em português.': ['In English.', 'En español.'], 'Desde a explicação.': ['Starting with the explanations.', 'Desde las explicaciones.'],
  'Com áudio.': ['With audio.', 'Con audio.'], 'Para ouvir e repetir.': ['To listen and repeat.', 'Para escuchar y repetir.'],
  'No seu ritmo.': ['At your own pace.', 'A tu ritmo.'], 'Uma sessão por vez.': ['One session at a time.', 'Una sesión cada vez.'],
  'MENOS ADIVINHAÇÃO. MAIS COMPREENSÃO.': ['LESS GUESSWORK. MORE UNDERSTANDING.', 'MENOS ADIVINAR. MÁS COMPRENDER.'],
  'Entender muda': ['Understanding changes', 'Entender cambia'], 'o jeito de aprender.': ['the way you learn.', 'la forma de aprender.'],
  'Você traz o português. A Linvuu usa essa base para explicar os sons, as estruturas e os erros comuns no novo idioma.': ['You bring your English. Linvuu builds on that foundation to explain sounds, structures and common mistakes in the new language.', 'Tú aportas el español. Linvuu utiliza esa base para explicar los sonidos, las estructuras y los errores habituales en el nuevo idioma.'],
  'Ouça o idioma acontecer.': ['Hear the language in action.', 'Escucha el idioma en acción.'],
  'Palavras e diálogos com áudio para ligar o que você lê ao que você escuta.': ['Words and dialogues with audio to connect what you read with what you hear.', 'Palabras y diálogos con audio para conectar lo que lees con lo que escuchas.'],
  'Entenda o porquê.': ['Understand why.', 'Entiende el porqué.'],
  'Explicações em português, exemplos e comparações para construir uma base.': ['Explanations in English, examples and comparisons to build a foundation.', 'Explicaciones en español, ejemplos y comparaciones para construir una base.'],
  'Coloque em prática.': ['Put it into practice.', 'Ponlo en práctica.'],
  'Exercícios com correção e atividades de fala e escrita para usar o que aprendeu.': ['Exercises with feedback, plus speaking and writing activities to use what you have learned.', 'Ejercicios con corrección y actividades de expresión oral y escrita para usar lo que has aprendido.'],
  'UMA VONTADE JÁ É UM COMEÇO': ['THE WISH TO LEARN IS A START', 'LAS GANAS YA SON UN COMIENZO'],
  'Qual será o seu': ['What will your', '¿Cuál será tu'], 'próximo “olá”?': ['next “hello” be?', 'próximo «hola»?'],
  'Para viajar, se aproximar de outras culturas ou realizar um objetivo seu. Encontre um idioma para começar.': ['For travelling, connecting with other cultures or reaching a personal goal. Find a language to get started.', 'Para viajar, acercarte a otras culturas o cumplir una meta personal. Encuentra un idioma para empezar.'],
  'COLEÇÃO LINVUU': ['THE LINVUU COLLECTION', 'COLECCIÓN LINVUU'], 'Um idioma.': ['One language.', 'Un idioma.'], 'Muitas': ['Many', 'Muchos'],
  'descobertas.': ['discoveries.', 'hallazgos.'], 'LEIA · OUÇA · EXPLORE': ['READ · LISTEN · EXPLORE', 'LEE · ESCUCHA · EXPLORA'],
  'PARA QUEM GOSTA DE IR ALÉM': ['FOR THOSE WHO LIKE TO GO FURTHER', 'PARA QUIENES QUIEREN IR MÁS ALLÁ'],
  'Seu aprendizado': ['Your learning', 'Tu aprendizaje'], 'também tem páginas.': ['has pages, too.', 'también tiene páginas.'],
  'Explore os livros da Linvuu, leia com calma e volte aos assuntos que merecem mais atenção.': ['Explore Linvuu books, read at your own pace and revisit topics that deserve more attention.', 'Explora los libros de Linvuu, lee con calma y repasa los temas que merecen más atención.'],
  'Conhecer a coleção →': ['Explore the collection →', 'Conocer la colección →'],
  'VAMOS COMEÇAR BEM': ['LET’S GET OFF TO A GOOD START', 'EMPECEMOS BIEN'],
  'Uma dúvida': ['Any questions', '¿Alguna duda'], 'antes do primeiro passo?': ['before your first step?', 'antes del primer paso?'],
  'Fale com a Linvuu →': ['Talk to Linvuu →', 'Habla con Linvuu →'],
  'SEU PRÓXIMO IDIOMA COMEÇA COM UM PASSO': ['YOUR NEXT LANGUAGE STARTS WITH ONE STEP', 'TU PRÓXIMO IDIOMA EMPIEZA CON UN PASO'],
  'Abra espaço para': ['Make room for', 'Haz espacio para'], 'novas conversas.': ['new conversations.', 'nuevas conversaciones.'],
  'Conheça a proposta. Explore os idiomas. Experimente uma aula.': ['Discover the plans. Explore the languages. Try a lesson.', 'Conoce la propuesta. Explora los idiomas. Prueba una clase.'],
  'SEU OBJETIVO. SEU ESPAÇO PARA CRESCER.': ['YOUR GOAL. YOUR ROOM TO GROW.', 'TU OBJETIVO. TU ESPACIO PARA CRECER.'],
  'Quanto do mundo': ['How much of the world', '¿Cuánto del mundo'], 'você quer conhecer?': ['do you want to discover?', 'quieres conocer?'],
  'Compare a proposta dos novos planos. Depois, explore os idiomas que combinam com você.': ['Compare the proposed plans. Then explore the languages that suit you.', 'Compara la propuesta de los nuevos planes. Después, explora los idiomas que van contigo.'],
  'Novos planos em preparação · Preços ainda não definidos': ['New plans in preparation · Prices not yet set', 'Nuevos planes en preparación · Precios aún por definir'],
  'Intermediário': ['Intermediate', 'Intermedio'], '1 idioma': ['1 language', '1 idioma'], '2 idiomas': ['2 languages', '2 idiomas'], '3 idiomas': ['3 languages', '3 idiomas'],
  'Todos os idiomas': ['All languages', 'Todos los idiomas'],
  'Foco no seu primeiro objetivo.': ['Focus on your first goal.', 'Céntrate en tu primer objetivo.'],
  'Espaço para uma nova possibilidade.': ['Room for a new possibility.', 'Espacio para una nueva posibilidad.'],
  'Mais caminhos para a sua curiosidade.': ['More paths for your curiosity.', 'Más caminos para tu curiosidad.'],
  'Liberdade para explorar mais.': ['Freedom to explore more.', 'Libertad para explorar más.'],
  'Conteúdo com explicações em português': ['Content with explanations in English', 'Contenido con explicaciones en español'],
  'Áudio e exercícios': ['Audio and exercises', 'Audio y ejercicios'], 'Suporte técnico': ['Technical support', 'Soporte técnico'],
  'Professor para dúvidas específicas pelo WhatsApp Business': ['A teacher for specific questions via WhatsApp Business', 'Profesor para dudas específicas por WhatsApp Business'],
  'Selecionado ✓': ['Selected ✓', 'Seleccionado ✓'], 'Explorar este plano': ['Explore this plan', 'Explorar este plan'],
  'A mesma qualidade de ensino em todos os planos. O nome Intermediário indica a quantidade de idiomas, não o seu nível de conhecimento.': ['The same teaching quality in every plan. Intermediate refers to the number of languages, not your level of knowledge.', 'La misma calidad de enseñanza en todos los planes. El nombre Intermedio indica la cantidad de idiomas, no tu nivel de conocimiento.'],
  'Quais idiomas despertam sua curiosidade?': ['Which languages spark your curiosity?', '¿Qué idiomas despiertan tu curiosidad?'],
  'Idiomas de interesse': ['Languages of interest', 'Idiomas de interés'],
  'Quer consultar a oferta disponível hoje?': ['Want to see the offer available today?', '¿Quieres consultar la oferta disponible hoy?'],
  'Ver assinatura atual →': ['View the current subscription →', 'Ver la suscripción actual →'],
};

export const homeText = (text: string): string => {
  if (LOCALE.codigo === 'pt-BR') return text;
  const contagem = text.trim().match(/^(\d+) de (\d+) (sessão marcada|sessões marcadas)$/);
  if (contagem) return LOCALE.codigo === 'en' ? `${contagem[1]} of ${contagem[2]} ${contagem[1] === '1' ? 'session' : 'sessions'} marked` : `${contagem[1]} de ${contagem[2]} ${contagem[1] === '1' ? 'sesión marcada' : 'sesiones marcadas'}`;
  const translated = copy[text.trim()]?.[LOCALE.codigo === 'en' ? 0 : 1];
  return translated === undefined ? text : text.replace(text.trim(), translated);
};

export const homeNotice = LOCALE.codigo === 'en'
  ? 'This page is in English. The course materials shown here currently have explanations in Portuguese; adapted materials in English are not available yet.'
  : 'Esta página está en español. Los materiales de los cursos que se muestran aquí tienen explicaciones en portugués; los materiales adaptados al español aún no están disponibles.';

export function selectionHelp(name: string, limit: number) {
  if (LOCALE.codigo === 'en') return `${name}: choose up to ${limit} ${limit === 1 ? 'language' : 'languages'} to explore. This is a preview, with no purchase.`;
  if (LOCALE.codigo === 'es') return `${name}: elige hasta ${limit} ${limit === 1 ? 'idioma' : 'idiomas'} para explorar. Es una vista previa, sin contratación.`;
  return `${name}: escolha até ${limit} ${limit === 1 ? 'idioma' : 'idiomas'} para explorar. Esta é uma prévia, sem contratação.`;
}
export function selectionCount(count: number, limit: number) {
  return LOCALE.codigo === 'en' ? `${count} of ${limit} selected` : LOCALE.codigo === 'es' ? `${count} de ${limit} seleccionados` : `${count} de ${limit} selecionados`;
}
export const tryLanguage = (name: string) => LOCALE.codigo === 'en' ? `Try ${name} →` : LOCALE.codigo === 'es' ? `Probar ${name} →` : `Experimentar ${name} →`;
