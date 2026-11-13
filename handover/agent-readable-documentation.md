# Agent-readable documentation

## Scope, 13 November 2026

The owner authorised work on agent access, retrieval indexes, Markdown alternatives, reference packs and evaluation tasks. This change adds `/project/use-with-agents/`, a shared entry page with reading order, a starting prompt, version-selection rules and validation boundaries.

`scripts/prepare-retrieval.mjs` runs after content and edition preparation. It produces the final root retrieval index, exact-edition indexes at `/versions/EXACT_VERSION/llms.txt`, a private generated article mapping and three reference ZIPs under `/downloads/documentation/`. The root index links directly to Markdown with human article URLs alongside it. Beta articles use their actual titles and edition-specific Markdown. Existing raw paths remain supported.

Article footers expose View Markdown and the agent entry page. HTML head link relations identify the Markdown alternative and root retrieval index. The entry page is shared, has no format selector and is discoverable in either edition's search.

Each edition archive contains edition explanations plus exact pinned upstream files, source revision/repository and SHA-256 payload hashes. Shared tool guidance is a separate pack, with explicit compatibility limits. Packs are reference material rather than executable validators or installable Skills. Exact upstream bytes retain their source licences; no blanket website/brand licence or host certification is implied. These are exact-format-version reference bundles rebuilt from current authored explanations, not immutable release artefacts.

## Verification

Astro check and full build verify source pins, existing example sets and semantic failure fixtures, beta declarations, edition behaviour, exact downloads, Skills compatibility, links/anchors and output privacy. New retrieval checks verify every article's HTML/visible Markdown alternatives, indexes, archive hashes, exact upstream payloads and unpacked private-source identifiers.

The evaluation tasks in `reference/retrieval/agent-evaluation.md` cover new/existing/legacy/beta projects, unresolved targets, offline references and model-versus-content claims. Realistic host trials remain unevaluated. Automated retrieval checks are not evidence of agent discovery, installation or reasoning behaviour. Live access from this session has encountered a Fortinet network filter; no fresh public-host retrieval trial is claimed.

Local final Astro check passed with zero errors/warnings and the existing deprecated browser-platform hint. Full build passed: 92 HTML pages, 9,545 internal links/assets/anchors and 90 Markdown mappings, plus all existing pin/example/edition/Skills gates.

Broad Chromium/Microsoft Edge and WebKit reviews each passed 112 page/theme/viewport combinations and 44 axe scans with zero violations, browser errors or failed requests. After the shared entry label/selector correction, targeted checks in both engines passed all four viewport/theme combinations, including the visible Markdown navigation and shared raw-source label. Representative homepage, reading/entry and dense-reference layouts were visually inspected at mobile/desktop sizes in both themes. Reports and screenshots remain under ignored `artifacts/site-review/` and its WebKit directory.

No commit, push or deployment is claimed by this change.
