# Skills documentation update

Tracking: [issue #2](https://github.com/headless-company/cmmf-docs-web/issues/2). Branch: `docs/cmmf-skills-migration`.

## Scope and source

Implements the 20 October 2026 `cmmf-skills/docs/docs-site-handover.md`, based on Skills commit `68ec28d3993eb08298ebf9a896f6a9d51b425bf0`, suite workspace version 0.2.0. The full revision was verified on GitHub during implementation. Nineteen committed source files are preserved under `reference/skills/<sha>/` with exact source/bundled SHA-256 values in `source-provenance.json`. Earlier working-tree evidence remains explicitly historical. Format pins and vendored source bytes are unchanged; the original integrity-checked archive is unchanged.

The existing `/tools/` and `/tools/skills/` routes now lead to twelve additional pages: six individual workflows, worked journeys, sources/versions, local commands, adoption, migration and troubleshooting. The manual learning route remains useful. Contribution/source links use `headless-company/cmmf-skills`. Legacy command names occur only in the migration comparison; `.cmmf-agent/` retains its supported convention-directory meaning.

Stable and beta articles link into shared tool documentation rather than duplicating it per format edition. Tool pages carry both edition tags in Pagefind, alongside a shared marker, so each edition’s search can retrieve them and display a shared-guidance badge without a format selector. Beta overview, adoption and validation pages disclose unsupported helper semantics. No broad format-version substitution can turn these shared compatibility statements into beta support claims. The beta validation note is a site-owned addition after importing the pinned upstream text; its raw upstream download stays exact.

Navigation, inventory, raw Markdown/retrieval index, canonical URLs and sitemap generation include every new route. Existing editor publication holds remain enforced.

## Verification

- `npm run check`: zero errors/warnings; existing deprecated `navigator.platform` hint remains.
- `npm run build`: both canonical pins, complete stable/beta example sets, negative semantic fixtures, beta declaration tests, internal links/anchors, exact downloads and edition checks pass.
- New `scripts/check-skills.mjs`, included in build: nineteen evidence hashes, fourteen shared tool routes and raw/index entries, canonical URLs, no active old repo URLs, and stable/beta compatibility notices pass.
- `npm run handover:check`: all 239 original archive files pass without rewriting hashes.
- Isolated export of the pinned Skills source: `npm run check` passes ten tests, dependency policy and all six independent packages using Node 22.23.3/npm 10.8.2 with existing dependencies reused. This is not a clean install under the recommended npm 11.11.0 pin.
- Complete Article and Customer Story copies: packaged `inspect`, `validate` and `document` pass. A controlled required-field addition yields valid input, a breaking semantic diff and exit 1. A beta source request yields exit 2. Durable normalised stdout/stderr, commands, source hashes and package manifest are in [trial evidence](../reference/skills/evaluations/2026-10-20/README.md).

`npm run test:browser` passed the final complete Chromium/Edge run: 100 page/theme/viewport combinations (25 pages at 390/1440 px in both themes), 44 axe scans with no violations, actual font and logo geometry checks, overflow, keyboard/navigation/theme persistence, stable/beta search for shared Skills, raw/download checks and held-route recovery. Representative mobile/desktop views were visually inspected in both themes, including installation, Author, local tools and adoption. Screenshots and full JSON are under ignored `artifacts/site-review/`. WebKit is configured in CI and was not run locally for this update.

## Limits

Codex, Claude Code and Copilot installation/discovery/realistic behavioural evaluations were not run; they remain pending. No live canonical retrieval/cache trial, content-instance validation, CMS translation or content migration was performed. Local exported-source validation honestly reports `revision: null`, retaining schema/spec hashes; the site’s independent source lock identifies its upstream revision. No deployment or production verification is claimed by this change.
