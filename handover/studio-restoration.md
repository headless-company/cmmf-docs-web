# Studio documentation restoration

The owner lifted the website publication hold on 11 November 2026 following Studio’s launch.

The restored publication includes the Studio walkthrough, visual-modelling tutorial, screenshots, approved logos, header/sidebar links, homepage and tutorial references, contribution ownership, raw Markdown/retrieval entries, search and project download instructions. The temporary redirects and output exclusion guard have been replaced with required-publication checks. Existing Skills guidance, private-brand protections, exact source pins and stable/beta separation remain in place.

The walkthrough retains its explicitly dated Studio source baseline. This restoration is not a fresh audit of current hosted Studio features. Studio instructions use the stable format; beta guidance and download projects disclose that beta compatibility is not established.

## Local verification, 11 November 2026

- Astro check: zero errors and warnings.
- Production build: both exact source pins, complete model sets, negative fixtures, beta declaration tests, links/anchors, raw/download bytes, edition behaviour, Skills evidence and output privacy checks pass.
- All four generated project ZIPs independently extracted; each passed `npm ci --offline --ignore-scripts`, `npm run validate` and `npm run bundle` using Node 22.23.3.
- Chromium (Microsoft Edge) and WebKit: each passed 108 page/theme/viewport combinations, 44 axe scans with zero violations, fonts/logo geometry, overflow, keyboard navigation, theme persistence, edition/shared search, topic switching/fallback, Studio tutorial journey and downloads. Reports and screenshots are under ignored `artifacts/site-review/` and `artifacts/site-review/webkit/`.
- Homepage, reading/reference layouts and Studio walkthrough were visually inspected at mobile/desktop sizes in both themes.
- The final beta compatibility notice was added after the broad browser run; the final build checks it as part of generated links/content, with a separate targeted two-engine browser review.

## Production verification, 11 November 2026

Restoration revision `ab1829c388d7044c14ada8135a2b397d00e3ad8b` was pushed to `main` and deployed by the GitHub integration. Cloudflare Pages check completed successfully for deployment `6843bf42-76d3-4068-936c-29a916ef5324` (https://6843bf42.cmmf-docs-web.pages.dev).

On https://cmmf.dev, 17 files matched the reviewed local output byte for byte: homepage, tools overview, both restored walkthroughs, beta visual guide, retrieval index, raw walkthroughs, both screenshots, social image, stable schema, sitemap and all four project ZIPs. HTTPS and www redirects, a genuine custom 404 response, absence of production noindex headers on checked files and the separate Studio endpoint passed.

Live Chromium/Microsoft Edge review passed 24 page/theme/viewport combinations (six pages at 390/1440 px in both themes), 16 axe scans with zero violations, fonts/logo geometry, overflow, keyboard navigation, theme persistence, edition/shared search, topic switching/fallback, restored Studio journey and downloads. No browser errors or failed requests were recorded. The restored live walkthrough was visually inspected at desktop/mobile sizes. Local WebKit coverage is recorded above; live WebKit was not run. Reports/screenshots are ignored artifacts under `artifacts/site-review/studio-live/`; HTTP byte hashes are in `artifacts/site-review/studio-live-http.json`.

GitHub CI is tracked separately at https://github.com/headless-company/cmmf-docs-web/actions/runs/43047900305; Cloudflare deployment success does not establish its completion.
