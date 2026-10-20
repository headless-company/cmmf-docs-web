# CMMF site project instructions

## Start here

Read `README.md`, `handover/implementation-brief.md` and `handover/repository-decision.md` before implementation. The latter two describe the original handover: their statements that no site exists are historical, not instructions to start again. This repository now contains the implemented Astro/Starlight site, tutorials, downloads and Cloudflare Pages configuration.

Read the relevant decision records before changing their behaviour:

- `handover/documentation-versioning.md`: editions, URLs, search, canonicalisation and stable promotion.
- `handover/skills-documentation-update.md`: current Skills evidence, compatibility and privacy decisions.
- `src/content/held/README.md`: Studio publication hold and restoration procedure.
- `handover/source-workflow.md`: explicit upstream pin updates.
- `brand/guide/usage.md`, `brand/guide/motion.md` and `LICENSES.md`: identity, motion and licensing.
- `handover/deployment-runbook.md` and `handover/deployment-status.md`: deployment procedure and dated evidence.

Inspect `git status` before editing and preserve unrelated work. Use the existing repository. Carry authorised work through implementation and appropriate verification without repeatedly asking for confirmation. Follow any requested issue/branch/PR/merge workflow. When asked to push, validate, commit and push the scoped changes, then report the commit and actual synchronization status.

## Conversation and public voice

- In conversation, use the user's requested Skippy the Magnificent persona: witty, confident and lightly irreverent, while keeping findings and limitations clear. The persona belongs in conversation, not public copy or technical documentation.
- Public CMMF copy is precise, open, quietly confident and practitioner-led. CMMF is a useful format and ecosystem people can adopt, not a sales pitch. Explain concrete benefits through usable examples; avoid hype, unsupported superlatives, sales funnels and invented capabilities.
- Use plain language and British spelling in authored prose, retaining exact code/API identifiers. Use sentence case for headings, labels and eyebrows. Explain specialist terms on first use and provide a plain-language entry point for a balanced technical/nontechnical audience.
- Establish the content-modelling need before syntax or tooling: agree intent → describe structure and relationships → translate deliberately into a CMS. Teach with Customer Story's reusable Customer and story-specific Quote before introducing abstract rules. Keep the manual/file-based route useful; AI-assisted tooling follows the core modelling explanation.
- Describe CMMF as a portable, platform-neutral format for content models and their intent. Distinguish modelling intent from target-platform implementation. Whiteboard-first and CMS-first approaches are both valid starting points with different gaps; avoid presenting either as universally wrong.
- State useful behaviour directly. Avoid padding introductions or feature lists with everything a tool does not do. Put material limitations beside the operation they affect, especially compatibility and validation claims. Do not remove necessary scope statements to make copy sound stronger.
- Do not introduce unapproved endorsements, partner lists, CMS support matrices, roadmap promises or sales-led company attribution.

## Publication exclusions and privacy

- **Studio remains unpublished on this website until the owner explicitly lifts the hold.** Do not restore or mention it in public pages, navigation, tool lists, metadata, raw Markdown, retrieval indexes, search, download instructions, screenshots or published logos merely because it exists elsewhere or older handovers describe it.
- Keep retained Studio pages/screenshots under `src/content/held/` outside generated output. Preserve temporary retired-route redirects and the release-hold checks in `scripts/check-site.mjs`. Follow the held README for an authorised restoration, including full build/browser review. Tool-neutral JSON model bundles may remain available and validated without advertising the held app.
- Supplied Generator artwork and historical tooling evidence are not a mandate to list or promote another public product. Publish tools/capabilities only when supported by current evidence and agreed publication scope.
- **The brand source repository is private.** Refer to it generically as the private brand asset source; do not expose its repository identifier, URL or local source path in public copy, contribution links, provenance, repository metadata or generated files. The prior redaction includes archived handover metadata. Preserve the output privacy guard, including search-asset coverage.
- Do not undo the archive's recorded privacy redaction by restoring old metadata or checksums. Removing current references does not erase Git history or old deployments; never claim otherwise.
- Retired provider-agent commands belong only in migration/troubleshooting context, not active installation instructions or feature lists. `.cmmf-agent/` remains a supported legacy conventions directory and does not imply an active agent runtime.

## Ownership, sources and implementation

- Use Astro/Starlight static output, Markdown/Git authoring and Cloudflare Pages. Studio remains a separate application/deployment even while unpublished here. Builds must work without sibling repositories, network source fetches or private-repository access.
- The upstream format repository owns normative specifications, translation contracts, schemas and canonical examples. This site owns tutorials, explanatory adaptations, tutorial models, presentation, navigation, search, packaging and deployment.
- Treat both `vendor/cmmf/` and `vendor/cmmf-beta/` as read-only exact snapshots. Normative fixes go upstream first. Refresh only through `scripts/sync-cmmf.mjs` with an explicit full revision and exact version; select the corresponding `--snapshot` and `--lock` for beta. Never silently track upstream `main`, move an old release pin or edit vendored bytes to fix the site.
- Author site pages under `src/content/owned/` and beta-specific explanations under `src/content/beta/`. Use `content-map.json` for route ownership/status and `node scripts/inventory.mjs` when changing that inventory. A substantially adapted imported explanation becomes site-owned; remove its competing duplicate route. Source/edit links target the actual owning file and repository.
- `.generated/`, generated public assets and `dist/` are outputs, not editing targets. Change their source/generator. Preserve exact upstream bytes in normative raw downloads even when adding site-owned notices to rendered pages.
- Keep `artifacts/cmmf-site-handover/` as the historical integrity-checked archive. Update current instructions and decision records rather than rewriting history, except for explicitly scoped corrections such as the recorded privacy redaction.
- Treat `source-provenance.json`, locks and pinned evidence as evidence. A working-tree snapshot or workspace package version is not a released tool version, npm publication, hosted binary, host certification or proof of production deployment.

## Multiple documentation editions

The baseline at this update is stable **1.2.0** and experimental **1.3.0-beta.1**. Verify current values in `scripts/lib/versions.mjs` and the source locks before changing release-sensitive material; do not treat this paragraph as a permanent latest-version lookup.

- Unversioned `/docs/`, `/learn/` and `/examples/` stay on the latest **stable** release. Publishing a beta must not change their semantics, upgrade a model manifest or imply stable promotion. Homepage/global entry links target stable.
- Explicit editions use `/versions/EXACT_VERSION/` before the normal article paths. Preserve the selected edition in article links, navigation, pagination, examples and downloads. The selector retains the topic where available; beta-only topics explain their fallback to the stable overview.
- Normative routes remain `/spec/EXACT_VERSION/…`; schemas, examples and diagrams retain exact-version download paths. Do not introduce duplicate specification route trees or mutable machine-asset aliases. Historical 1.1.0 is a specification-only archive: do not invent a complete docs edition or claim the current schema validates it.
- The current stable numbered copy canonicalises to its unversioned equivalent, including `og:url`; sitemap/default search prefer unversioned stable. Beta pages self-canonicalise and remain distinct. Do not canonicalise beta to stable or use `noindex`/robots exclusions to manage these duplicates.
- Search is scoped by edition. Shared `/tools/` guidance remains unversioned, discoverable from both editions and labelled as shared; it has no format selector. Homepage/project/tool pages are not cloned into format editions.
- Keep `/llms.txt`, generated raw Markdown, source links, inventories, sitemap and search aligned with route/edition changes. Preserve supported stable raw routes and exact-version raw routes described in the versioning decision.
- Adding a release is an editorial/semantic review, not a global version-string replacement. Review changed rules, inherited explanations, overrides, complete examples, validators and tooling limits. Tagged normative source overrides earlier RFC proposals.
- **Before promoting stable, preserve the outgoing edition's authored sources and download-generation inputs independently.** Current explicit stable pages derive from current stable sources; repointing those sources alone would silently rewrite old documentation. Decouple inherited beta material where necessary, then update registry, canonicals, sitemap/search and entry links only after an explicit stable-release decision. Rebuild and verify all retained editions and old bookmarks together.
- Editorial corrections within an edition are allowed while preserving its semantics, source pin and exact machine assets. Generic `/latest/` routes are deliberately absent; any future moving alias must resolve only to stable and use an appropriate temporary redirect.

## Skills and validation claims

- CMMF Skills supplies six workflows: Discover, Author, Validate, Review, Document and Evolve. The existing host supplies reasoning, conversation, authentication, permissions and file editing; skills supply CMMF guidance and deterministic helpers. No additional LLM provider key is required, but the host's usage/subscription rules still apply.
- Use the committed Skills baseline in `source-provenance.json` and `reference/skills/`, not historical creation-agent evidence or assumptions about a sibling checkout. The current documented suite baseline is 0.2.0; installed-skill discovery and realistic behaviour in Codex, Claude Code and Copilot remain pending evaluation. Automated package checks do not certify those hosts.
- Current helpers recognise legacy `1`, `1.1.0` and `1.2.0`; they do **not** support experimental 1.3 beta semantics, and their source parser rejects prerelease strings. A newer supplied schema or beta checkout does not establish complete helper support. Beta's matching example validator is separate. Preserve compatibility notices in shared tools guidance and beta entry/validation pages.
- Respect explicit and manifest-declared format versions. Do not silently upgrade existing models. Numeric `specVersion: 1` means the original legacy format, not any arbitrary current 1.x release. Unsupported versions must be reported as unsupported rather than fully validated.
- Keep documented commands reproducible from the pinned package. Do not imply a global CLI, npm publication, provider-backed `generate` replacement or automated CMS provisioning/migration exists without evidence. Natural-language project conventions are not automatically executable validation rules.
- Distinguish schema validation, whole-model-set/graph checks, project conventions, design review and content-instance/runtime validation. Passing model checks does not validate stored content, evaluate expressions, enforce CMS workflows or prove a translation lossless. Beta validation hints declare intent; the example checker checks declarations rather than executing content rules.
- Validate complete example sets and reference targets. Label teaching snippets as excerpts, not standalone valid projects. Generate excerpts, diagrams and bundles from the same definitions to prevent drift. Keep tutorial examples separate from upstream canonical examples.
- Do not overstate individual properties: editorial help text does not enforce a constraint; governance metadata does not grant permissions or create approval workflows; translation hints do not override core meaning; required/repeatable/contained alone does not prove a minimum collection size.

## Brand and interface

- Use bundled approved assets and guidelines; preserve SVG proportions, clear space, minimum widths, theme variants and licences. Do not recreate logos as styled text or stretch artwork. Use the expanded signature only where its full minimum width is available and retain the approved mobile fallback.
- Font roles: Source Sans 3 for interface text, Quattrocento for sustained reading and Reem Kufi for signatures/selected display headings, never body prose. Verify actual local font loading, not only CSS declarations.
- Preserve Paper/Ink surfaces, the approved warm gradient, accessible contrast, zoomable text, keyboard interaction, readable code/tables and reduced-motion behaviour.
- Keep the approved `public/images/social/cmmf-social-preview.png` at 1280×640 with complete absolute Open Graph/Twitter metadata. Use `npm run assets:social` only for a reviewed asset change; ordinary builds require no browser. Update asset checks if paths change.
- Upstream Apache-2.0 and font OFLs do not establish a blanket licence for brand artwork or the entire website. Follow `LICENSES.md`.

## Verification and handoff

- Use the runtime in `.nvmrc` (Node >=22.12) and committed dependency lockfile. Read `package.json` for current commands. After changing Markdown processor settings, run `npx astro sync --force` to invalidate cached content.
- For site/content/generator changes, run `npm run check` and `npm run build`. Build checks both source pins, complete examples, semantic failure fixtures, beta declarations, links/anchors, exact downloads, edition behaviour and Skills evidence/compatibility. Run `npm run handover:check` when archive/integrity work is involved. For instructions-only edits, review the diff, links and consistency; a site/browser rebuild is unnecessary.
- For layout/navigation/search/edition/publication changes, run `npm run test:browser` after building and visually inspect affected homepage, reading and dense-reference layouts at mobile/desktop sizes in both themes. Check fonts, logo geometry, overflow, keyboard menus, theme persistence, edition-scoped/shared search, topic switching/fallback, source links, 404 recovery and downloads. Use WebKit as required by the change/CI and say which engines actually ran.
- For changed downloadable projects, extract complete ZIPs and run their documented `npm ci`, `npm run validate` and `npm run bundle`; test a meaningful invalid case when validation behaviour changes. The optional local editor check requires an explicitly supplied build and must never become a docs-build dependency or lift the publication hold.
- Preserve privacy/publication checks across generated HTML, raw Markdown, indexes, search and other assets. A successful diagnostic/build alone does not prove the visual result or live deployment. Automated accessibility checks supplement visual/manual review and do not establish full conformance.
- Distinguish local checks, CI, preview deployment and production verification. Before claiming live success, verify the actual domain, HTTPS/redirects, affected pages, search, metadata and downloadable bytes. Report only what ran, with remaining limits. Keep dated evidence in relevant handover records; do not copy old page counts, commit IDs or success claims forward as current results.
