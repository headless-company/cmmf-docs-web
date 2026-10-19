# CMMF documentation website

The public explanation and documentation site for CMMF, built in the existing `headless-company/cmmf-docs-web` repository. The static Astro/Starlight site is live on Cloudflare Pages at [cmmf.dev](https://cmmf.dev). Studio remains a separate app and deployment; its production endpoint is tracked independently.

## Run locally

Use Node 22.12 or newer. The reviewed runtime is recorded in `.nvmrc`.

```sh
nvm use
npm ci
npm run dev
```

If that Node version is not installed, run `nvm install` first. This implementation session used an ignored project-local Node 22.23.3 runtime under `.runtime/` to avoid changing the global installation.

```sh
npm run check
npm run build
npm run preview
```

`build` checks the canonical snapshot, validates both complete example sets, generates page inputs and public assets, builds search/static pages, then checks internal links/anchors and exact canonical downloads. Cloudflare Pages should use the same build command and serve `dist/`.

## Where to edit

- `src/content/owned/`: website-owned Markdown/MDX articles, tutorials and adaptations.
- `examples/customer-story/`: authored tutorial models and portable validation/bundle templates.
- `scripts/lib/`: shared complete-set checks and deterministic download packaging.
- `src/pages/index.astro`: custom homepage.
- `src/components/` and `src/styles/site.css`: shared templates and brand mapping.
- `content-map.json`: route, source, version, ownership and completion inventory.
- `brand/`: approved assets and guidelines; retain geometry, font roles and licences.
- `vendor/cmmf/`: read-only upstream snapshot. Change normative material upstream, then explicitly refresh the source pin.

Generated `.generated/`, selected `public/` directories and `dist/` are ignored. Normal builds do not fetch upstream or require sibling repositories. Run `node scripts/inventory.mjs` after changing the route inventory.

## Plan and evidence

Read [the adapted implementation plan](handover/implementation-plan.md), [page inventory](handover/page-inventory.md) and [prototype review](handover/prototype-review.md). The original [handover pack](artifacts/cmmf-site-handover/README.md) is preserved; its exported plan describes the starting state rather than the current implementation.

Canonical source: CMMF 1.2.0 at `32604441aff09a6dbfe2361e97078af5263fd321`.

```sh
npm run source:check
npm run handover:check
```

Use [the explicit source workflow](handover/source-workflow.md) for reviewed updates. Tool/brand provenance is separately recorded in `source-provenance.json`. Some bundled evidence includes uncommitted working-tree material and is not a released version.

## Verification and review

After a production build, `npm run test:browser` launches a local static server and reviews ten pages at 390 and 1440 px in both themes. It checks five representative pages with axe, verifies diagram scrolling, version switching and 404 recovery, and tests the learning journey. It uses an installed Microsoft Edge by default on macOS; set `CMMF_BROWSER_EXECUTABLE` to another Chromium executable or install Playwright Chromium with `npx playwright install chromium`. Screenshots and a JSON report are written to ignored `artifacts/site-review/`.

For a second engine, install `npx playwright install webkit` and run `CMMF_BROWSER_ENGINE=webkit npm run test:browser`. Its evidence is saved in `artifacts/site-review/webkit/`. CI runs both engines. Automated checks supplement visual and assistive-technology review; they do not establish complete accessibility conformance.

The site includes all planned launch articles, the Customer Story learning journey, an Article example, complete project ZIPs, Studio import bundles and a portable validator. Each ZIP can be extracted and used with `npm ci`, `npm run validate` and `npm run bundle`. Static SVG/Mermaid diagrams and `/llms.txt` with raw site Markdown are generated from the same sources. Specification version links preserve document type; archived schemas are not bundled.

The branded social PNG is tracked. Regenerate it with `npm run assets:social` after a reviewed visual change; it uses an isolated browser and the bundled artwork/fonts. Ordinary builds require no browser. Starlight's `markdown.processedDirs` includes `.generated/docs` so notices and heading links receive the normal transforms. After changing Markdown processor settings, run `npx astro sync --force` once to invalidate cached content.

Follow [the Cloudflare deployment runbook](handover/deployment-runbook.md) and [deployment progress](handover/deployment-status.md) for launch work. The Pages project and both website domains are active. Live browser and download verification passed; the www redirect is verified, and separate Studio availability is recorded in deployment progress.

`npm run test:examples` verifies semantic failure cases. An optional end-to-end Studio check can be run with `node scripts/review-studio.mjs /path/to/studio/dist`; it uses an explicitly supplied local build and is not a documentation-build dependency.

See [licence and provenance notes](LICENSES.md). The upstream format's Apache-2.0 licence and supplied font OFLs do not assign a blanket licence to brand artwork or the whole website.

## Documentation versions

Unversioned articles remain on stable CMMF 1.2.0. Explicit editions live at `/versions/1.2.0/` and `/versions/1.3.0-beta.1/` before the usual `docs/`, `learn/` and `examples/` paths. The selector preserves topics, labels the beta as experimental and scopes search by edition. Specifications and machine assets keep their existing exact-version route structure.

Read [the versioning decision and release workflow](handover/documentation-versioning.md) for canonical URLs, sitemap/search treatment, source ownership and stable promotion. The beta is independently pinned in `cmmf-beta-source.lock.json`; update it only through the sync helper with `--snapshot vendor/cmmf-beta --lock cmmf-beta-source.lock.json`, a full revision and exact version. Beta-only articles are authored under `src/content/beta/`. The original stable snapshot is unchanged.
