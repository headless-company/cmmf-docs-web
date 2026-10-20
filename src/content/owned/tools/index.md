---
title: "CMMF Skills"
description: "Six modelling workflows for your coding agent, with local checks and explicit compatibility limits."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/index.md
---

A customer can appear in several stories, while a quote may belong to just one. Those ownership decisions need to survive the move from workshop notes into model files and implementation.

CMMF Skills adds six content-modelling workflows to your existing coding agent. The host supplies conversation, authentication, permissions and file editing. Skills supply CMMF guidance, canonical source retrieval and deterministic checks. No additional LLM provider key is required; your host’s subscriptions and usage rules still apply.

| Need | Skill |
| --- | --- |
| Turn workshop notes into modelling decisions | [Discover](/tools/skills/discover/) |
| Create or extend model YAML | [Author](/tools/skills/author/) |
| Check format and model relationships | [Validate](/tools/skills/validate/) |
| Assess architecture and editorial usability | [Review](/tools/skills/review/) |
| Explain the actual model set | [Document](/tools/skills/document/) |
| Plan model changes and migration impact | [Evolve](/tools/skills/evolve/) |

Start with [installation](/tools/skills/), then follow a [worked journey](/tools/skills/workflows/). You can enter at any workflow; installing all six is optional. The [manual first-model guide](/docs/get-started/first-model/) remains a complete route without an agent.

:::caution[Implementation and compatibility status]
Six packaged skills and deterministic helpers are implemented at suite baseline 0.2.0. Automated helper/package checks are recorded in the source handover. Installed-skill discovery and realistic modelling behaviour in Codex, Claude Code and GitHub Copilot remain pending evaluation. The helpers recognise legacy `1`, `1.1.0` and `1.2.0`; they do not support the experimental 1.3 beta. See [sources and versions](/tools/skills/sources-and-versions/).
:::

## Evidence and release status

This guidance uses [CMMF Skills source at 68ec28d3](https://github.com/headless-company/cmmf-skills/tree/68ec28d3993eb08298ebf9a896f6a9d51b425bf0), workspace version 0.2.0, inspected on 20 October 2026. It is a pinned source baseline, not a claim of npm publication, a hosted binary release or host certification. The website bundles source evidence and byte hashes separately from its format snapshots.

The source handover records a successful build, ten tests, dependency-policy checks and isolated execution of all six packages. Its run used existing dependencies with Node 22.7.0/npm 10.8.2; it did not establish a fresh install under the recommended npm pin. See [team adoption](/tools/skills/team-adoption/) for the evidence still needed in your environment.

Source and issues: [headless-company/cmmf-skills](https://github.com/headless-company/cmmf-skills). Moving from the former standalone tool? Read [migration](/tools/skills/migration/).
