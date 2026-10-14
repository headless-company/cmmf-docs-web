# Implementation plan for cmmf-docs-web

This is the working plan for the existing `headless-company/cmmf-docs-web` repository. It supersedes the repository creation/scaffolding assumptions in the exported handover. The original pack under `artifacts/cmmf-site-handover/` remains intact as export evidence.

## Repository and sources

- Use the current repository root for the Astro application. Do not create a new repository or initialise Git again.
- Track `src/`, `brand/`, `vendor/cmmf/`, the source lock, route map, scripts and dependency lockfile here.
- Treat `vendor/cmmf/` as read-only. Builds check its hashes and consume its pinned 1.2.0 files without fetching upstream.
- Preserve `source-provenance.json`, brand/tool snapshots and their licence boundaries. A base commit is not a release of uncommitted snapshot content.
- Keep authored articles under `src/content/owned/`. Generate the combined Starlight collection under ignored `.generated/docs/`; generate public assets under ignored `public/` subdirectories. Canonical files never receive site frontmatter.
- Source links for imported material point to its upstream pin. Edit links target the owning repository. Site adaptations replace imported routes and retain their canonical provenance.

## First deliverable

1. Adapt the source-to-route map into a page inventory with ownership and implementation status.
2. Install compatible Astro 7.3.8 and Starlight 0.42.6, pin dependencies in `package-lock.json`, and require supported Node 22.12+; `.nvmrc` selects 22.23.3.
3. Build a custom homepage, a sustained-reading article and a dense reference page with real content. Use the complete canonical Article/Person/SEO/Page set to prove source-driven excerpts and downloads. The next slice now supplies the complete Customer Story set and its file/visual tutorials and Studio walkthrough.
4. Ingest the remaining canonical material, add current-version search and exclude archived specification pages from its index, and serve exact raw/versioned files.
5. Check model structure and graph rules, internal links/anchors, font loading, logo geometry, theme persistence, search, keyboard navigation and downloads. Inspect the three templates at small/wide sizes in both themes.
6. Document local operation and the remaining launch backlog. Deliver a reviewable local prototype before expanding all launch content.

## Brand application

Use the supplied outlined CMMF signatures with native proportions and clear space. The persistent header is static. The expanded signature appears only when its 420 px minimum width fits; mobile uses the ordinary signature and live full-name text.

Paper and Ink carry surfaces and reading contrast. The supplied rose/orange gradient remains in parent artwork. Source Sans 3 serves navigation, metadata, tables and operational headings; Quattrocento serves sustained prose; Reem Kufi is reserved for selected opening headings. Fonts and licences are local. No synthetic Quattrocento italic. Diagrams explain relationships with labels and text as well as styling. Required markers follow field names.

## Subsequent launch work

All planned launch-content routes are implemented: Customer Story models, file/visual tutorials, Studio walkthrough, glossary, modelling/localisation/rich-text/editorial guides, errors/migration guidance, Skills installation and contribution guidance. Follow `page-inventory.md` for source ownership and current status.

The diagram pipeline uses `beautiful-mermaid` at build time to generate themed, accessible SVGs and Mermaid source from both complete model graphs. It needs no browser or client renderer. The source-derived homepage diagram remains an HTML explanation with selected fields. Agent retrieval (`llms.txt` and raw site Markdown), a branded social PNG, robots, specification/contract version switching and automated axe checks are implemented. Browser checks cover Chromium and WebKit. Complete project ZIP bundles include portable validators and model-import JSON. Historical schemas still require their own verified source snapshots; the current schema is not labelled historical.

Production uses the existing repository and Cloudflare Pages static `dist/` output. Studio remains a separate project/deployment. Follow `deployment-runbook.md` for build settings, preview review, domain association, verification and rollback. Account/DNS details and preservation of existing records are required before domain setup; no deployment is implied by the local build.

## Review decisions

The user remains the initial editorial reviewer. Optional Headless Company attribution is left out of the initial prototype pending a preference. No CMS adapters, host certifications or hosted Studio collaboration are claimed. Website licensing beyond the supplied format/font licences remains to be decided.
