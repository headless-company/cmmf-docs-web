# Prototype review

The first implementation is a local prototype for the existing `cmmf-docs-web` repository. Editorial approval and production deployment are still pending.

Review targets:

- `/`: bespoke homepage, source-derived relationship excerpt and a labelled Article/Person/SEO diagram.
- `/learn/why-cmmf/`: sustained-reading article using Quattrocento.
- `/docs/reference/canonical-types/`: dense lookup page using Source Sans 3, with horizontally scrollable tables where required.

## Delivered

The site now renders 33 pages, including all planned launch-content routes, the three templates, canonical concepts/specifications, examples, tools and a useful 404. Search excludes archived 1.1.0 specification pages. Relative canonical links are mapped to website routes; source/edit/issue links retain ownership. Raw canonical Markdown, schema and example files preserve their bytes. Site-owned Markdown and a retrieval index are published separately.

The 15 October 2026 continuation adds the glossary; embed/reference, rich-text, localisation, editorial, errors and migration guides; Skills installation; contributing; themed static Mermaid/SVG exports; social preview; robots; paired specification version links; accessibility checks and a Cloudflare deployment runbook.

The running production preview for this implementation session is `http://127.0.0.1:4322/`. Run `npm run preview` for a new session; use the URL printed by Astro if the preferred port is already occupied.

## Verification

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| `npm run build` | 33 pages; 2,753 internal links, assets and anchors pass |
| Canonical source integrity | 24 files match the 1.2.0 pin `32604441…` |
| Complete example validation | Seven models across two sets pass schema, manifest, IDs, references, editorial fields and bounds |
| Raw downloads | Schema, examples and original Markdown match canonical hashes |
| Original handover integrity | All 239 files still match their export checksums |
| Brand and tool provenance | All 198 working-copy files match recorded exported hashes |
| Browser review | Chromium and WebKit: 80 page/theme/viewport combinations pass at 390/1440 px |
| Automated accessibility | 40 axe scans across five representative pages, both themes and widths, both engines; no WCAG A/AA violations reported |
| Additional responsive checks | Three templates have no document overflow at 320, 768 and 1060 px |
| Interactions | Keyboard skip link, site/docs menus, theme persistence, keyboard table/diagram scrolling, paired version switching, 404 recovery, search and downloads pass |
| Migration regression | Six model-set tests pass, including legacy repeatability preservation and contradictory-flag rejection |
| Retrieval and metadata | llms.txt targets, accessible static SVGs with embedded font licences, social metadata and 1200 × 630 PNG pass |
| Preview routing | New guides/assets return 200; unknown address returns 404 with the custom recovery page |

Actual font loading and computed roles were checked. Article prose uses Quattrocento at 20/32 px within a 576 px reading measure on desktop, and 19/30.4 px on mobile. Reference content and tables use Source Sans 3. Homepage display text uses Reem Kufi 600.

Header signatures measure 144 px on desktop and 112 px on mobile. The desktop expanded signature is approximately 531 px wide, above the 420 px minimum. Narrower layouts use the ordinary signature and live full-name text. Visible logo aspect ratios match the SVGs’ native 550:256 geometry. Static headers and reduced-motion behaviour were checked; no identity animation is introduced.

Full-page and viewport screenshots, alongside measured browser results, are available under ignored `artifacts/site-review/`. Representative files:

- [Homepage, desktop/light](../artifacts/site-review/home-1440-light-viewport.png)
- [Homepage, mobile/dark](../artifacts/site-review/home-390-dark-viewport.png)
- [Article, desktop/dark](../artifacts/site-review/article-1440-dark-viewport.png)
- [Reference, mobile/light](../artifacts/site-review/reference-390-light-viewport.png)
- [Browser report](../artifacts/site-review/report.json)
- [WebKit report](../artifacts/site-review/webkit/report.json)
- [Skills guide, desktop/light](../artifacts/site-review/skills-1440-light-viewport.png)
- [Static diagrams, mobile/dark](../artifacts/site-review/diagram-detail-390-dark.png)
- [Social preview](../public/images/social/cmmf-docs.png)

## Review limits and next work

The visual foundation was accepted for a first version; all site eyebrows retain sentence case and normal letter spacing. All planned launch routes are implemented. Automated contrast and accessibility checks plus Chromium/WebKit layout and interaction checks pass. These do not establish full accessibility conformance: assistive-technology review, real devices and production-domain checks remain launch work.

The custom 404 content is intentionally marked draft so Starlight excludes its ordinary production route while the dedicated renderer still uses it. The duplicate-render warning is resolved. `markdown.processedDirs` enables Starlight notices and heading links for the generated content directory; after changing those processor settings, clear the content cache with `npx astro sync --force`. Browser checks caught and resolved collapsed SVG frames and WebKit table keyboard behaviour. The WebKit skip-link test uses macOS Option+Tab, matching link navigation with default system settings.

The local machine's initial Node 22.7 x64 runtime was below Astro's requirement. An ignored project-local 22.23.3 x64 runtime was used. Optional native packages needed the matching CPU selection during installation; future installs should keep Node and native dependency architectures consistent. No global Node installation was changed.

No Cloudflare account, DNS, production deployment, commit or push was performed.
