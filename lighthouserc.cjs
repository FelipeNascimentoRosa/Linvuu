// Auditorias de visitantes em servidor local, sem credenciais ou relatórios públicos de terceiros.
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node scripts/iniciar-servidor-lhci.mjs',
      startServerReadyPattern: 'LINVUU_LHCI_READY',
      startServerReadyTimeout: 30000,
      url: [
        'http://127.0.0.1:4398/',
        'http://127.0.0.1:4398/curso/de',
        'http://127.0.0.1:4398/gramatica/ru',
        'http://127.0.0.1:4398/en',
        'http://127.0.0.1:4398/es',
        'http://127.0.0.1:4398/en/curso/ru',
      ],
      numberOfRuns: 3,
      settings: { onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] },
    },
    assert: {
      assertions: {
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        // 05/11/2026 (rodada 4): mediana local mobile 83–99 nas páginas públicas, CLS 0. O piso vira erro com folga para
        // a variação do runner do GitHub; o deslocamento de layout acima de 0,1 (limite "bom" do Google) bloqueia o merge.
        'categories:performance': ['error', { minScore: 0.75 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'is-crawlable': 'error',
        'robots-txt': 'error',
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci/relatorios' },
  },
};
