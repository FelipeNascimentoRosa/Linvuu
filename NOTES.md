# NOTES — engineering decisions (English)

This file explains, in English, the decisions behind the Linvuu site so that a reviewer who does not read Portuguese can follow them. Portuguese is the working language of the repository (`AGENTS.md`, `docs/`); this is the English companion, as requested on 09/11/2026.

## 1. One interface language per domain, not per path

**Decision (founder, 29/10/2026):** `linvuu.com.br` serves Portuguese, `linvuu.com` serves English. There are no `/pt/` or `/en/` prefixes.

**Why not `/pt/...` and `/en/...`:** a path-prefix migration would move 3,784 public URLs plus 87 and 35 sitemap entries, discard whatever index history exists, and break the redirect rules that already exist for pages that belong to the other domain. The benefit would be zero: search engines treat a per-domain split as well as a path split, and the split also lets each domain carry its own currency (BRL vs USD) and its own legal text without conditions on every page.

**What enforces it:** `server/dominio.ts` returns 301 when a route exists only in the other domain (e.g. `/livros` on `.com` → `.com.br/livros`). `scripts/testar-dominio.ts` covers the rule with 20 pure cases plus 8 real HTTP requests in CI. `<html lang>` follows the domain: `pt-BR` on `.com.br`, `en` on `.com`.

**Known gap:** `/sobre` on `.com` still serves Portuguese text with `lang="en"`. The fix is an English page, not a redirect — redirecting would send the user to the other domain for a page that exists on both.

## 2. i18n: typed dictionaries, not a library

`src/i18n/pt-BR.ts` and `src/i18n/en.ts` are plain typed objects. `scripts/testar-paridade-meta.mjs` fails CI when a key exists in one language and not the other. We deliberately did **not** adopt Paraglide or i18next: the catalogue is two languages with full parity checks, and swapping the library would touch every screen for no conversion gain.

Content translation is a different layer, tracked in `docs/COBERTURA-IDIOMAS.md`: a course is only offered in a language whose *explanations* exist. `de`, `en`, `es` and `it` currently have zero English explanations, so they are not sold on `.com`.

## 3. SEO: meta is injected per request, not pre-rendered at build

`server.ts` reads `dist/index.html` and injects `<title>`, description, `robots`, `canonical`, `hreflang`, `<html lang>` and JSON-LD for the requested route before the HTML leaves the server (`src/lib/metaRota.ts`, `aplicarMeta`).

**Why not `vite-plugin-prerender`:** titles and lesson content live in JSON files that change in almost every PR. Build-time HTML would go stale between the build and the deploy, and the same meta is already needed for in-site navigation via `/api/meta`. Per-request injection keeps one source of truth: `scripts/testar-http-seo.ts` checks 3,784 HTTP responses across both domains and fails CI on mismatch.

23 schema.org types are emitted, including `EducationalOrganization`, `WebSite`, `BreadcrumbList`, `Course`, `Offer`, `Product`, `FAQPage`, `Book` and `Chapter`.

## 4. What CI already refuses to merge

`lighthouserc.cjs`: SEO ≥ 0.90 (error), performance ≥ 0.75 (error), CLS ≤ 0.10 (error), accessibility ≥ 0.90 (warning), `is-crawlable` and `robots-txt` (error), five URLs × three runs, mobile. Plus `build`, `visual`, `paridade-head`, `robots-google`, dependency audit and gitleaks.

Consequence: "unused CSS", "font-display", "images without dimensions" and "not crawlable" are already guarded. The work that is left is not technical hygiene — it is search demand (`docs/SEO_AUDIT.md`, §5) and revenue (`docs/META-1M-2027.md`).

## 5. Money decisions are single-sourced

`docs/PRECOS-DEFINIDOS.md` is the only price table. `src/config/planos.ts` mirrors it for display and `scripts/testar-contrato-billing.ts` checks the two agree. No agent changes a price, a plan or a Stripe object without an explicit instruction from the founder.

## 6. The mascot

`docs/VUU.md` records one Vuu (`public/assets/vuu/vuu.svg`). It is kept: it appears in empty states and onboarding, costs one cached SVG, and no measurement shows it hurting conversion. There is no plan to add more mascots, and no plan to remove the one that exists.

## 7. Root `NOTES.md` (this file) is documentation only

It changes nothing at runtime. If it ever disagrees with the Portuguese documents, the Portuguese documents win and this file is corrected in the same PR.
