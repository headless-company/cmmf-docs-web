---
title: "Skills troubleshooting"
description: "Diagnose installation, source, validation and semantic diff problems."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/troubleshooting.md
---

| Symptom | Likely cause and recovery |
| --- | --- |
| Skill not visible | Wrong host parent/scope, extra nested directory, different execution environment or host settings. Inspect the installed tree and official host guidance; record discovery separately from helper execution |
| References/helper missing | Only source `SKILL.md` or development `skills/` folder copied. Install the complete assembled `release/skills/<name>/` |
| `node` unavailable/too old | Provide Node 22+ in the actual host execution environment; a terminal on another machine is not enough |
| `npm ci` rejects engines | Check Node/npm and use the pinned npm 11.11.0; do not disable `engine-strict` as an onboarding fix |
| `cmmf-tools` not found | Copying a skill does not register a global executable. Use its absolute `node .../scripts/cmmf-tools/tools/cli.js` entrypoint or `npm run tools --` in the built Skills checkout |
| `generate`/provider flags rejected | Retired interface. Ask the host to use Author; use the documented local command flags |
| Source fetch fails | Check Git/network permissions and remote access. Use a valid exact-version cache/local source if available; otherwise report unavailable validation |
| Offline latest appears cached | Expected: offline cache does not prove upstream freshness. Label it cached; refresh explicitly when network is available |
| Cache hash mismatch | Cached schema/spec changed. Preserve evidence if needed, then acquire a clean source; do not edit hashes just to accept altered files |
| Source mismatch | Manifest and schema are different versions. Resolve matching source or perform an explicitly requested upgrade; do not rewrite the manifest to silence the error |
| Beta request rejected | Prerelease strings are not accepted by the current source parser and helper beta semantics are not supported. Use beta-specific tooling/evidence where actually available and disclose Skills limits |
| Inspection returns models but validation fails | Inspection is tolerant and not canonical validation. Read parse/schema/graph diagnostics; the graph may be incomplete |
| Missing reference/object/rich-text target | Supply the actual intended model or correct the relationship using requirements. Do not invent a meaningless target |
| Model path/symlink rejected | Keep declared model files within the selected repo using ordinary files; inspect path diagnostic rather than following external links |
| Convention text truncated | Read the actual instruction file; the inspect summary is bounded |
| Diff exits 1 | Check `valid`: invalid sides need repairs; valid breaking/uncertain changes need impact review. It is not automatically a command failure |
| Documentation looks incomplete | Helper overview omits detailed constraints; ask for evidence-based field/rich-text/localisation explanations and explicit scope |
| Markdown not written to disk | Document prints stdout. Ask the host to save it, or deliberately capture output outside model directories while retaining exit/JSON evidence |
| Changed YAML, no content migrated | Expected boundary. Use the mapping/backfill plan with separate content migration implementation and verification |
| Existing customisations lost after update | Restore preserved complete package/customisations, move team conventions into project guidance, and compare package manifests before replacing owned folders |

## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
