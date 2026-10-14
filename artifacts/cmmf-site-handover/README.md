# CMMF documentation site handover

Start here. This directory can become the root of a new `cmmf-site` repository. It is a verified handover and source seed, not an implemented website.

The user chose `cmmf.dev`, a balanced audience with a plain-language entry point, Cloudflare Pages, and Markdown/Git maintenance. Studio belongs at `studio.cmmf.dev` and remains a separately deployed application.

**Read in this order**

1. [Repository decision](handover/repository-decision.md).
2. [Implementation brief](handover/implementation-brief.md).
3. [Complete website plan](handover/website-plan.md).
4. [Content audit](handover/content-audit.md) and [proposed routes](content-map.json).
5. [Brand integration](handover/brand-integration.md), [usage rules](brand/guide/usage.md), and [brand book](brand/guide/cmmf-brand-guide.pdf).
6. [Source and update workflow](handover/source-workflow.md).

**Create the project**

Extract/copy this directory into your chosen new project directory. The pack contains no `.git` directory. From that new directory:

```sh
node scripts/verify-handover.mjs
node scripts/sync-cmmf.mjs --check
git init
git add .
git commit -m "Seed CMMF documentation site handover"
```

Node 22+ and Git are sufficient for the included helpers; they have no npm dependencies. No framework dependencies have been installed or chosen at exact versions yet. The next agent should scaffold Astro/Starlight into this existing project without overwriting the handover, source snapshots or brand assets.

Give the next agent [this opening prompt](handover/next-agent-prompt.md). It requests a concrete page inventory and a running homepage/article/reference prototype before completing the full site.

**Included**

- `vendor/cmmf/`: exact upstream docs, specification, schema, examples and licence at the locked Git revision.
- `brand/`: approved logos, local fonts and font licences, tokens, web icons, diagonal graphics, documentation design study, motion runtime/studies, and current guidelines/PDF.
- `reference/tools/`: Studio and Skills documentation evidence for writing accurate tool pages. These snapshots are context, not site articles or executable tool releases.
- `source-provenance.json`: source commits, local modification status, exact hashes and documented guide-link transformations.
- `cmmf-source.lock.json`: authoritative source pin and file hashes.
- `SHA256SUMS`: initial handover integrity records. After implementation edits, use the canonical-source check rather than expecting original handover hashes to stay unchanged.

Brand identity v1.2 and Skills guidance include working-tree changes that were not committed at export time. The included files make this handover self-contained; do not treat the base Git revisions as published releases of those changes.

No credentials, dependency directories, private Git history or unrelated project files are included. [Licence/provenance notes](LICENSES.md) distinguish the source materials. Hosting/account setup and the site repository name remain choices for the user.
