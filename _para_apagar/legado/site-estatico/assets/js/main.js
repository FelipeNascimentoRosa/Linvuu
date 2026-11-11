/**
 * LINVUU — Main Client Engine
 * Controla os seletores de idiomas e níveis, sincroniza a comida típica
 * do lado esquerdo e anima o painel cósmico com fórmulas e saudações.
 */

const FOOD_MASCOTS = {
  ru: {
    id: 'ru',
    name: 'Pelmeni',
    lang: 'Russo',
    native: 'Русский',
    file: 'pelmeni-ru.png',
    svgFallback: 'pelmeni-ru.svg',
    quote: 'Do cirílico à autonomia de leitura em 30 dias.'
  },
  de: {
    id: 'de',
    name: 'Pretzel',
    lang: 'Alemão',
    native: 'Deutsch',
    file: 'pretzel-de.png',
    svgFallback: 'pretzel-de.svg',
    quote: 'Estrutura lógica, casos e fonética sem mistérios.'
  },
  fr: {
    id: 'fr',
    name: 'Croissant',
    lang: 'Francês',
    native: 'Français',
    file: 'croissant-fr.png',
    svgFallback: 'croissant-fr.svg',
    quote: 'Ritmo suave e pronúncia natural do francês culto.'
  },
  es: {
    id: 'es',
    name: 'Tomate',
    lang: 'Espanhol',
    native: 'Español',
    file: 'tomate-es.png',
    svgFallback: 'tomate-es.svg',
    quote: 'Expressão viva, verbos no ponto e sem sotaque de livro.'
  },
  en: {
    id: 'en',
    name: 'Batata',
    lang: 'Inglês',
    native: 'English',
    file: 'batata-en.png',
    svgFallback: 'batata-en.svg',
    quote: 'Conversas da vida real e domínio de phrasal verbs.'
  },
  pt: {
    id: 'pt',
    name: 'Pastel',
    lang: 'Português',
    native: 'Português',
    file: 'pastel-pt.png',
    svgFallback: 'pastel-pt.svg',
    quote: 'Da base às nuances culturais do dia a dia.'
  }
};

const LEVELS = [
  { id: 'zero', name: 'Zero Absoluto', desc: 'Nunca estudei o idioma' },
  { id: 'a1',   name: 'Básico A1',     desc: 'Alfabeto e primeiras frases' },
  { id: 'a2',   name: 'Básico A2',     desc: 'Diálogos simples do cotidiano' },
  { id: 'b1',   name: 'Intermediário B1', desc: 'Leitura inicial e autonomia' },
  { id: 'b2',   name: 'Intermediário B2', desc: 'Fluência e argumentação' },
  { id: 'c1',   name: 'Avançado C1',   desc: 'Domínio acadêmico e profissional' }
];

const COSMOS = [
  { hello: 'Привет', formula: 'E = mc²' },
  { hello: 'Hallo', formula: 'e^{iπ} + 1 = 0' },
  { hello: 'Bonjour', formula: 'λ = h / p' },
  { hello: '¡Hola!', formula: 'F = G (m₁m₂ / r²)' },
  { hello: 'Hello', formula: '∇ × B = μ₀J' },
  { hello: 'Olá', formula: 'ds² = -(1 - 2M/r)dt² + ...' },
  // Enfeites decorativos
  { hello: '🧲 Ímã Cósmico', formula: 'Física das Forças' },
  { hello: '⏳ Ampulheta', formula: 'Matemática dos 30 Dias' }
];

let selectedLang = 'de';
let selectedLevel = 'zero';

function updateLeftMascot(langKey) {
  const m = FOOD_MASCOTS[langKey] || FOOD_MASCOTS.de;
  const imgEl = document.getElementById('mascotFoodImg');
  const titleEl = document.getElementById('mascotFoodTitle');
  const descEl = document.getElementById('mascotFoodDesc');

  if (imgEl) {
    imgEl.src = `assets/mascots/${m.file}`;
    imgEl.onerror = () => {
      imgEl.src = `assets/mascots/${m.svgFallback}`;
    };
    imgEl.alt = `${m.name} (${m.lang})`;
  }
  if (titleEl) {
    titleEl.textContent = `${m.name} · ${m.lang} (${m.native})`;
  }
  if (descEl) {
    descEl.textContent = m.quote;
  }
}

function updateActionButtons() {
  const targetUrl = `app.html?lang=${selectedLang}&level=${selectedLevel}`;
  const ctaBtn = document.getElementById('heroCtaBtn');
  const navCta = document.getElementById('navCtaBtn');
  if (ctaBtn) ctaBtn.href = targetUrl;
  if (navCta) navCta.href = targetUrl;

  const trackLinks = document.querySelectorAll('[data-track-link]');
  trackLinks.forEach(link => {
    const lId = link.getAttribute('data-track-link');
    link.href = `app.html?lang=${lId}&level=${selectedLevel}`;
  });
}

function initSelectors() {
  // Idiomas
  const langChips = document.querySelectorAll('.lang-chip');
  langChips.forEach(chip => {
    chip.addEventListener('click', () => {
      langChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedLang = chip.getAttribute('data-lang');
      updateLeftMascot(selectedLang);
      updateActionButtons();
    });
  });

  // Níveis
  const levelChips = document.querySelectorAll('.level-chip');
  levelChips.forEach(chip => {
    chip.addEventListener('click', () => {
      levelChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedLevel = chip.getAttribute('data-level');
      updateActionButtons();
    });
  });
}

function renderCosmos() {
  const container = document.getElementById('cosmosList');
  if (!container) return;
  container.innerHTML = COSMOS.map(item => `
    <div class="cosmos-row">
      <span class="cosmos-hello">${item.hello}</span>
      <span class="cosmos-formula">${item.formula}</span>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initSelectors();
  updateLeftMascot(selectedLang);
  renderCosmos();
  updateActionButtons();
});
