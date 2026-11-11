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

These are local checks. No push, deployment or production verification is claimed.
