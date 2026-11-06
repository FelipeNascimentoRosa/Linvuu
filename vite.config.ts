import react from '@vitejs/plugin-react';
import {defineConfig, loadEnv} from 'vite';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Fontes, no site e no app: o Linvuu só ensina idiomas em alfabeto latino e cirílico, então as fontes de grego e
 * vietnamita saem do pacote. No site, as duas fontes latinas da primeira dobra (títulos e texto) ganham preload:
 * o navegador as busca junto com o CSS, em vez de só depois de lê-lo (menos tempo com a fonte substituta).
 */
function fontesDoSite(preload: boolean) {
  return {
    name: 'linvuu-fontes',
    generateBundle(_options: unknown, bundle: Record<string, { type: string; fileName: string; source?: unknown }>) {
      const fontesFora: string[] = [];
      for (const [nome, item] of Object.entries(bundle)) {
        if (item.type === 'asset' && /\.woff2$/.test(nome) && /-(?:greek|greek-ext|vietnamese)-/.test(nome)) { fontesFora.push(path.basename(nome)); delete bundle[nome]; }
      }
      if (!fontesFora.length) return;
      for (const item of Object.values(bundle)) {
        if (item.type !== 'asset' || !/\.css$/.test(item.fileName) || typeof item.source !== 'string') continue;
        item.source = item.source.replace(/@font-face\{[^{}]*\}/g, (bloco) => (fontesFora.some((f) => bloco.includes(f)) ? '' : bloco));
      }
    },
    transformIndexHtml: {
      order: 'post' as const,
      handler(html: string, ctx: { bundle?: Record<string, { fileName: string }> }) {
        if (!preload || !ctx.bundle) return html;
        const arquivos = Object.values(ctx.bundle).map((x) => x.fileName).filter((f) => /assets\/(?:newsreader-latin-opsz-normal|source-sans-3-latin-wght-normal)-[\w-]+\.woff2$/.test(f));
        const links = arquivos.map((f) => `<link rel="preload" href="/${f}" as="font" type="font/woff2" crossorigin>`).join('\n    ');
        return links ? html.replace('</head>', `    ${links}\n  </head>`) : html;
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const alvo = env.VITE_ALVO || 'website';
  if (!['website', 'apk'].includes(alvo)) throw new Error('VITE_ALVO deve ser website ou apk');
  const apk = alvo === 'apk';
  if(apk && env.VITE_COMPRAS_ATIVAS==='true')throw new Error('Compras de produção bloqueadas nesta fase.');
  // Google Play Billing real: só com modo explícito, chave pública Android (goog_) e autorização escrita do dono no ambiente do build.
  // Sem LINVUU_COBRANCA_PLAY_AUTORIZADA=sim o build falha, para nenhum APK de teste sair com compra real por engano.
  const play = apk && env.VITE_BILLING_MODE==='google-play';
  if(play && (!env.VITE_REVENUECAT_ANDROID_KEY?.startsWith('goog_') || env.LINVUU_COBRANCA_PLAY_AUTORIZADA!=='sim'))throw new Error('Google Play Billing exige VITE_REVENUECAT_ANDROID_KEY=goog_… e LINVUU_COBRANCA_PLAY_AUTORIZADA=sim');
  if(apk && env.VITE_BILLING_MODE && !play)throw new Error('Modo de pagamento não autorizado para este APK');
  // Cobrança dentro do app só existe se o build pedir de forma explícita (Google Play autorizado).
  const cobrancaNoApk = play;
  // v1 sem compras: o app não carrega textos de plano, preço ou renovação. No site os dicionários seguem completos.
  const dicionariosApk = {
    name: 'dicionarios-apk-sem-precos',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      const arq = id.split('?')[0].replaceAll('\\', '/');
      if (!/\/src\/i18n\/(?:pt-BR|en|es)\.ts$/.test(arq)) return;
      const frases = /renova[çc][ãa]o autom[áa]tica|automatic renewal|renovaci[óo]n autom[áa]tica|LINVUU50|no Pix|on Pix|con Pix|assine a Linvuu|subscribe to Linvuu|suscr[íi]bete a Linvuu|Escolha como pagar|Choose how to pay|Elige c[óo]mo pagar|paywall/i;
      const literal = /'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;
      const chavesPreco = /\b(preco|precoAssinatura|mensalTxt|exAluno|noPix|tresMeses)(\s*:\s*)(?:\([^)]*\)\s*(?::\s*\w+\s*)?=>\s*)?('(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)/g;
      let saida = code.replace(chavesPreco, (_m, chave: string, sep: string) => `${chave}${sep}''`);
      saida = saida.replace(literal, (lit) => (frases.test(lit) ? "''" : lit));
      saida = saida.replace(/\bpaywall(\w*)(\s*:)/g, 'bloqueio$1$2');
      return { code: saida, map: null };
    },
  };
  return {
  define: { 'import.meta.env.VITE_ALVO': JSON.stringify(alvo) },
  resolve: { alias: { '@plataforma': path.resolve('src/plataforma', alvo) } },
  // manifest (só no site): o servidor usa para pedir antecipadamente os módulos da página aberta (modulepreload por rota).
  build: { outDir: apk ? 'dist-apk' : 'dist', copyPublicDir: !apk, manifest: !apk },
  plugins: [react(), fontesDoSite(!apk), ...(apk ? [{
    name: 'publico-apk-sem-audio',
    enforce: 'pre' as const,
    // O APK não é indexado: tira metatags de SEO/compartilhamento e o texto pré-renderizado para buscadores.
    transformIndexHtml(html: string) {
      return html
        .replace(/\s*<meta (?:name="description"|property="og:[^"]*"|name="twitter:[^"]*")[^>]*>/g, '')
        .replace(/\s*<link rel="(?:canonical|alternate)"[^>]*>/g, '')
        .replace(/\s*<!--[^]*?-->/g, '')
        .replace(/\s*<style>@media \(scripting: ?enabled\)\{main\[data-prerender\][^<]*<\/style>/, '')
        .replace(/<main[^>]*data-prerender[^]*?<\/main>/, '')
        .replace(/<title>[^<]*<\/title>/, '<title>Linvuu</title>');
    },
    transform(code, id) {
      const arq = id.split('?')[0];
      // O app só leva a capa de 600 px: tira a variante de 900 px do srcSet e do tamanho grande.
      if (arq === path.resolve('src/pages/Livros.tsx')) {
        return { code: code.replace(/, \$\{[^`]*?\.replace\('-600', '-900'\)\} 900w/g, '').replace('-${tamanho}', '-600'), map: null };
      }
      if(arq===path.resolve('src/main.tsx')) return { code: `import { prepararArmazenamento } from './plataforma/apk/armazenamento';\nawait prepararArmazenamento();\n${code}`, map:null };
    },
    resolveId(source, importer) {
      // Telas compartilhadas que têm versão própria no app (só no build APK).
      if (importer && source === './pages/Gramatica' && importer.split('?')[0] === path.resolve('src/App.tsx')) return path.resolve('src/plataforma/apk/Gramatica.tsx');
      if (importer && source.startsWith('.') && path.resolve(path.dirname(importer.split('?')[0]), source).replace(/\.ts$/, '') === path.resolve('src/lib/audio')) return path.resolve('src/plataforma/apk/audio.ts');
      // Páginas só do site: no APK viram um componente vazio (as rotas já redirecionam no app).
      if (importer && ['./pages/Portugues', './pages/Sobre', './pages/AulasRusso', './pages/PorQue', './pages/Contato', './pages/ExAlunosUdemy', './pages/ExcluirConta'].includes(source) && importer.split('?')[0] === path.resolve('src/App.tsx')) return path.resolve('src/plataforma/apk/sem-site/Vazia.tsx');
      // v1 sem compras: troca os módulos de cobrança por versões vazias; paywall, preços e SDK de loja não entram no pacote.
      if (!cobrancaNoApk && importer && source.startsWith('.')) {
        const alvoImport = path.resolve(path.dirname(importer.split('?')[0]), source).replace(/\.tsx?$/, '');
        for (const nome of ['comprasPlay', 'AssinaturaPlay']) {
          if (alvoImport === path.resolve('src/plataforma/apk', nome)) return path.resolve('src/plataforma/apk/sem-cobranca', nome + (nome === 'comprasPlay' ? '.ts' : '.tsx'));
        }
      }
    },
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue;
        for (const id of Object.keys(chunk.modules)) {
          if (id.replaceAll('\\', '/').endsWith('/src/lib/audio.ts')) throw new Error('Motor de áudio do website incluído no APK');
          if (id.replaceAll('\\', '/').endsWith('/src/plataforma/website/checkout.ts')) {
            throw new Error('Checkout do website incluído no APK');
          }
        }
      }
    },
    closeBundle() {
      if (env.VITE_APK_BUILD_ID) fs.writeFileSync(path.join('dist-apk','linvuu-build.json'),JSON.stringify({build:env.VITE_APK_BUILD_ID,source:env.LINVUU_SOURCE_SHA || null,versionCode:env.ANDROID_VERSION_CODE || null,versionName:env.ANDROID_VERSION_NAME || null}));
      // Mantém imagens e fontes locais; áudios são carregados sob demanda pelo servidor.
      for (const nome of fs.readdirSync('public')) {
        if (['audio', 'mascots', 'fotos', 'sitemap.xml', 'robots.txt'].includes(nome)) continue;
        fs.cpSync(path.join('public', nome), path.join('dist-apk', nome), { recursive: true });
      }
      // Capas: o app usa só a de 600 px; a de 900 px fica apenas no site.
      const livros = path.join('dist-apk', 'livros');
      if (fs.existsSync(livros)) for (const f of fs.readdirSync(livros)) if (/-900\.webp$/.test(f)) fs.rmSync(path.join(livros, f));
      {
      }
    },
  }, dicionariosApk] : [])],
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
};
});

