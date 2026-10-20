---
title: "Migrate to CMMF Skills"
description: "Replace standalone agent setup with host skills and explicit local tools."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/migration.md
---

The standalone CMMF Creation Agent has been replaced by six independently installable skills. Existing model YAML is not rewritten by this change. The normative format remains in its own repository.

| Former setup | Current workflow |
| --- | --- |
| `cmmf-agent generate` or `npm run generate` | Ask your host to use [Author](/tools/skills/author/); no replacement generate CLI exists |
| Project provider adapters and keys | Your host handles authentication and model selection |
| Implicit sibling source or `CMMF_SPEC_REPO_PATH` | Retrieve matching source or supply `--cmmf-repo` explicitly |
| Standalone terminal conversation | Host conversation and scoped authorised edits |
| Provider-generated change sets | Host edits, whole-set validation and semantic diff |

The project no longer uses `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `CMMF_AGENT_PROVIDER` or `CMMF_AGENT_MODEL`. Retain shared credentials needed by other tools; existing private environment files are left untouched.

## Update repository links

Active clone, issue, contribution and source links should use [headless-company/cmmf-skills](https://github.com/headless-company/cmmf-skills). In an existing Skills source checkout, update its remote deliberately:

```sh
git remote set-url origin https://github.com/headless-company/cmmf-skills.git
```

Existing local directory names may remain. Fresh clones use `cd cmmf-skills`. Do not run this remote command in a model project or in the documentation repository.

## Preserve conventions and model history

`.cmmf-agent/` remains a supported legacy convention directory alongside `.cmmf/` and root `cmmf.instructions.*` files. Its name does not imply a running agent. Preserve IDs, comments, manifest versions and unrelated working changes. Skill removal does not undo model edits.

Build and install complete packages using [installation](/tools/skills/). There is no established npm install, marketplace plugin or global executable from copying a folder.

## Programmatic callers

The retired `runAgent`, provider factories/types, tool-call contracts, strict legacy model types, `loadRepoGraph`, renderers and old `resolveCmmfSource` interfaces are removed. There is no replacement provider-generation API.

The current exports include `inspectRepository`, `acquireSource`, `readSource`, `validateRepository`, `semanticDiff`, `documentRepository` and `loadProjectInstructions`. Pass matching source evidence explicitly; validate both inputs before calling exported `semanticDiff`. The CLI performs that orchestration for you. See the [upstream migration reference](https://github.com/headless-company/cmmf-skills/blob/68ec28d3993eb08298ebf9a896f6a9d51b425bf0/docs/migration.md) and exported TypeScript types. This is a private workspace, not an advertised npm package.


## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
