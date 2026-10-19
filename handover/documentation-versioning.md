# Documentation editions and canonical URLs

Decision implemented for CMMF 1.3.0-beta.1, 19 October 2026.

## Routes and release policy

| Material | URL | Canonical |
| --- | --- | --- |
| Current stable explanation | `/docs/…`, `/learn/…`, `/examples/…` | Self |
| Explicit stable edition | `/versions/1.2.0/docs/…` (and learn/examples) | Corresponding unversioned stable URL |
| Experimental edition | `/versions/1.3.0-beta.1/docs/…` (and learn/examples) | Self |
| Normative specification/contract | `/spec/EXACT_VERSION/…` | Self |
| Schema/examples/diagrams | Existing exact-version download routes | Exact version; no mutable latest alias |
| Tools, project and homepage | Unversioned | Self |

Keep the existing unversioned entry points on the latest **stable** release. A beta publication must never move those URLs, implicitly upgrade a manifest or promote the format. Stable explicitly selected URLs remain available so bookmarks and version switching retain the selected edition. Specification URLs already contain exact versions; preserve those routes rather than introducing a second copy.

The homepage and global entry links target stable. Within a selected edition, article links, navigation, pagination, examples and downloads retain that edition. Switching preserves the topic where it exists. Beta-only topics explain that selecting stable opens the stable documentation overview. Historical 1.1.0 remains a specification-only archive, not a fabricated complete documentation edition or matching validation bundle.

A separate domain or build per version adds operational overhead for this small static site. Starlight locale emulation would conflate release versions with languages. This implementation uses generated content collections, a small edition registry and Starlight route middleware; no additional versioning plugin is needed. [Starlight documents route middleware](https://starlight.astro.build/guides/route-data/) for changing route data and navigation.

## Why keep both stable URL forms?

Moving every existing article to a numbered canonical URL would require redirects across the public site and make discovery links change at each stable release. Keeping only unversioned articles would make precise release selection impossible. Providing both gives stable discovery URLs plus explicit edition links.

The current stable numbered copy is equivalent to the unversioned article, so its HTML canonical and `og:url` point to the unversioned article. The sitemap and default search include only the preferred stable copies. Beta pages have distinct semantics and self-referencing canonicals: do not canonicalise them to stable. Do not use `noindex` or robots exclusions as a duplicate-management substitute. These choices follow [Google's canonicalisation guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): canonical links and redirects are strong signals, sitemap inclusion is weaker, internal links should be consistent, and canonical preferences are not guarantees of search-engine selection.

The deliberate exception to linking only to the stable canonical is the explicitly selected stable edition: its internal links preserve release context. Ordinary site entry points and search use unversioned stable URLs. This makes the tradeoff explicit rather than silently losing a reader's version selection.

## Content and provenance

`cmmf-source.lock.json` / `vendor/cmmf/` remain the original stable pin. `cmmf-beta-source.lock.json` / `vendor/cmmf-beta/` independently pin `v1.3.0-beta.1` at `a0c7a3d87fe46d74b5e78ac851e8b156201376a4`. Both snapshots are read-only and checked before builds. The sync helper accepts explicit `--lock` and `--snapshot` locations as well as an exact prerelease version. Its schema, specification and example-manifest agreement checks still apply.

`scripts/lib/versions.mjs` owns edition metadata. `scripts/prepare-versions.mjs` generates explicit stable copies and the beta edition. Unchanged site-owned explanations inherit the existing authored material; beta-specific guides live in `src/content/beta/`. Changed upstream explanations (validation, translation, document hints) render from the beta pin. Normative texts and raw downloads retain the exact upstream bytes. Generated page inputs and assets are not authored sources.

The RFC is [issue #1](https://github.com/headless-company/content-model-master-format/issues/1), read on 19 October 2026. It contains the original proposal and a later implementation checklist. The tagged normative beta overrides earlier suggestions: IDs required; representations exclusive; no preferred expression dialect; numeric comparisons only on number fields; explicit emptiness and absent-value semantics; every disposition includes model ID, hint ID and reason. The adoption guide explains these differences. Publishing the docs does not merge or promote the upstream format branch.

Both complete beta download projects contain the matching schema and exact upstream checker, plus the site's model-graph checks. The Customer Story model definitions are unchanged; only its generated beta manifest selects the new schema. Article's upstream set contains five models including Subscription. Project validators/bundlers check hint declarations without evaluating content or expressions. Tool provenance remains separate; publishing this edition does not claim beta support in another application.

## Search, retrieval and verification

Each indexed page carries a Pagefind `version` filter. Search selects the current edition automatically; stable numbered duplicates are excluded from indexing. Archived 1.1.0 specs stay excluded. The adapted Starlight search component retains its dialog, keyboard and visual behaviour and adds the edition filter; its MIT notice is retained under `licenses/`.

`/llms.txt` distinguishes stable and experimental entry points. Raw explanatory Markdown is available beneath `/raw/EXACT_VERSION/site/`; beta normative Markdown is beneath `/raw/1.3.0-beta.1/spec/`. Stable's existing `/raw/spec/` URLs remain supported. HTML pages remain the canonical SEO targets.

`npm run build` verifies both pins, stable examples, upstream beta regression tests, complete beta examples, all HTML links/anchors and raw-byte integrity. `scripts/check-versions.mjs` checks canonical/OG URLs, sitemap exclusions, edition navigation, selector destinations and both beta download sets. Browser review covers stable and beta reading/reference pages at mobile/desktop sizes in both themes, scoped search, switching/fallback and downloads. These are local/CI checks; live publication is verified separately.

## Adding a release or promoting stable

1. Pin and review the new exact upstream commit/version through the sync helper into a separate snapshot/lock. Never move an old tag or edit vendored bytes.
2. Add the edition to the registry and review all changed rules, explanations, examples, schema/checker and tool boundaries. Extend the generation/override mapping and regression checks; a new version is an editorial update, not just a string substitution.
3. Before promoting stable, preserve the outgoing stable site's authored explanations and download-generation inputs as an independent edition. The initial stable numbered copies currently derive from the current stable sources; do **not** repoint those sources and accidentally relabel old content. Decouple the beta overrides from inherited stable pages as needed.
4. Only after an explicit stable release decision, move the unversioned stable routes to the new release. Change the outgoing edition to self-canonical, update the new stable duplicate canonicals, sitemap/search and global entry links. Rebuild old and new editions together; verify old bookmarks, exact downloads and no cross-version leaks.
5. Continue to allow editorial corrections within a release's docs while preserving its format semantics, source pin and exact machine assets. A docs edition is version-specific, not an immutable website deployment.

Generic `/latest/` routes are deliberately absent. If introduced later, they should resolve only to stable. A moving alias needs a temporary redirect; permanent redirects are appropriate only for permanently retired routes. Version-specific references in external integrations should use the explicit URLs.

## Local review evidence, 19 October 2026

Both Chromium and WebKit passed 52 template/theme/viewport combinations each, with 32 automated accessibility audits per engine and zero violations or page errors. The beta reading guide, beta dense specification and pinned stable overview were inspected visually alongside the existing templates. Both engines passed edition-scoped search, topic switching, the beta-only fallback, navigation, downloads, fonts and logo geometry. Reports and screenshots are ignored artifacts in `artifacts/site-review/` and `artifacts/site-review/webkit/`.

All four project ZIPs were independently extracted into temporary directories. Each passed `npm ci`, `npm run validate` and `npm run bundle`; both beta projects rejected a deliberately invalid hint field reference with `unknown-field`. The public annotated beta tag was independently resolved through GitHub to the exact pinned commit. The original 239-file handover integrity check still passes. Production publication evidence is recorded separately after deployment.
