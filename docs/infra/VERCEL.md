# Linvuu na Vercel (migração total do Render)

**Estado:** branch `vercel/migracao-total` (a partir da main `ffff14f`), sem merge, sem
deploy, sem DNS. O Render continua a servir 100% do tráfego até a Vercel estar verificada.
Ordem de execução completa e decisões pendentes: `~/workspace/linvuu-vercel-migration-plan.md`
(fora do repo).

## Arquitectura

Uma só função serverless com o app Express completo (`api/index.ts` → `server/app.ts`),
mais os estáticos de `dist/` no CDN da Vercel. `server.ts` continua a ser o arranque
local/Render (longa duração) — a montagem do app é a mesma nos dois lados, só muda o
arranque. O Vite só é importado em desenvolvimento (`server.ts`); nunca entra no pacote
da função.

## Build (`npm run build:vercel`)

Igual ao build do Render, com duas diferenças:

1. **Não clona o áudio** (232 MB): `scripts/validar-audio-privado.mjs` só confirma que o
   repo privado continua acessível (aviso, nunca falha o build). O áudio pago vem do R2
   em runtime — ver `docs/infra/R2-AUDIO-PRIVADO.md`.
2. **No fim, `scripts/mover-arquivos-servidor.mjs` move ficheiros de `dist/` para
   `server-files/`**: `index.html`, `.vite/manifest.json`, `sitemap*.xml`, `robots*.txt`,
   `llms*.txt` e `prerender/`. Os `.br` desses ficheiros são apagados.

Porquê: a Vercel serve tudo o que está em `dist/` pelo CDN **antes** de qualquer rewrite.
Se esses ficheiros ficassem em `dist/`, o `.com` receberia o sitemap BR, os ficheiros
internos (`sitemap-global.xml`, `robots-global.txt`, `prerender/*`) ficariam públicos e
o `/index.html` responderia 200 em vez de 301. Fora de `dist/`, os pedidos chegam à
função e o comportamento actual (variante por Host + guarda 404) mantém-se — crítico
com o problema do Googlebot em curso. A função lê-os de `server-files/` via
`includeFiles` (ver `vercel.json`).

## O que a função lê do disco (`includeFiles`)

- `content/**` (82 MB de JSONs de lições/gramática)
- `conteudo/gramatica-ru.html` (livro protegido)
- `server-files/**` (HTML base, manifest, sitemaps/robots/llms por Host, pré-render)

O áudio pago **não** está incluído (R2). O áudio gratuito (`public/audio/`) fica em
`dist/` e é servido pelo CDN. Estimativa do pacote da função: 150–190 MB (limite 250 MB)
— medir no primeiro build.

## IP do visitante e rate limiting

Na Vercel a função só recebe pedidos pela edge, que põe o IP de quem se ligou a ela em
`x-vercel-forwarded-for`. O `ipDoVisitante` (`server/seguranca.ts`) usa-o como peer para
a verificação do `CF-Connecting-IP` (proxy Cloudflare ligado) e cai para `x-real-ip`.
O `trust proxy` é 2 na Vercel (visitante → Cloudflare → edge → função) e 1 no Render.
Sem isto, o limite por IP deixava de distinguir visitantes.

## Domínios e DNS (só no corte)

Os dois domínios vão para o **mesmo** projecto Vercel; o perfil por Host continua no
servidor (`server/dominio.ts`). No corte: apex A → IP da Vercel, `www` CNAME →
`cname.vercel-dns.com`, **um domínio de cada vez** (`.com` primeiro, menor tráfego).
Recomendado: DNS-only (nuvem cinzenta) na Cloudflare durante o corte; o proxy pode ser
religado depois. **Não tocar** nos registos MX/SPF/DKIM/DMARC. Não re-submeter sitemaps
nem pedir indexação.

Atenção ao teste do perfil `.com`: num URL de preview o Host é desconhecido e o servidor
cai no perfil BR. Testar o perfil global com `curl --resolve linvuu.com:443:<ip-da-vercel>`
antes de mudar o DNS de produção.

## Variáveis

Ver `docs/infra/VERCEL-VARIAVEIS.md`. Os segredos colam-se directamente no painel da
Vercel. `APP_URL` mantém-se exactamente `https://linvuu.com.br` (o `/readyz` exige-o).
A URL do webhook do Stripe **não muda**.

## Verificação (preview, tráfego zero)

- Home, `/cursos`, `/russo-online`, `/sobre`, `/assinatura`, `/gramatica` — 200, com
  title/canonical/hreflang correctos e HTML pré-renderizado (não o resumo antigo).
- `/sitemap.xml`, `/robots.txt`, `/llms.txt` — 200, variante BR.
- `/prerender/…`, `/sitemap-global.xml`, `/robots-global.txt`, `/llms-global.txt` — **404**.
- `/index.html` — 301 para `/`.
- `/api/meta`, `/healthz`, `/readyz` — 200.
- `/api/audio/:idioma/:hash.mp3` — 401 sem login, 403 sem assinatura, 302 para o R2 com assinatura.
- Duração p50/p95 da função e tamanho do pacote (logs da Vercel).

## Rollback

Repor os registos DNS da Cloudflare para o Render. O Render é o rollback até 48 h depois
do corte estar estável — só então se desliga o serviço no Render.
