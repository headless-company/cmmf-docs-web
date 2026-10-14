---
title: Work with CMMF Skills
description: Build and install complete development packages, then try a modelling workflow with explicit source and validation boundaries.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills.md
---

Skills give a coding agent CMMF-specific instructions and local tools. Begin with a content brief or an existing model set; use the agent to propose and review changes, then inspect the files and validation evidence yourself.

:::caution[Development release]
The supplied CMMF evidence verifies packaged helper execution. Discovery and realistic modelling behaviour in Codex, Claude Code and GitHub Copilot still need host evaluation. Host skill support does not establish that this particular suite has passed that evaluation.
:::

## Choose a workflow

| Skill | Job |
| --- | --- |
| `cmmf-discover` | Turn workshop notes into a modelling brief |
| `cmmf-author` | Create model files from an agreed brief |
| `cmmf-validate` | Inspect structure and whole-model errors |
| `cmmf-review` | Review modelling choices and editorial usability |
| `cmmf-document` | Produce a catalogue and relationship documentation |
| `cmmf-evolve` | Assess a proposed model change and its impact |

The host supplies reasoning, authentication and file access. The local helpers do not require another LLM provider key. Host permissions, subscriptions and usage limits still apply.

## Build a reviewed package

Obtain the [Skills repository](https://github.com/headless-company/cmmf-creation-agent), review its current README and select the revision you intend to evaluate. Use its reviewed Node/npm requirements; the documented helper runtime needs Node 22 or newer.

Run these commands inside that checkout:

```sh
npm ci
npm run check
npm run skills:package
npm run skills:verify
```

Packaging creates self-contained directories under `release/skills/`, plus `release/cmmf-skills.tar.gz` and a file-hash manifest. Dependencies and their licences are included in the packages; installed helpers do not need a separate npm installation.

This site does not offer a Skills binary download: its evidence includes working-tree documentation at base commit `53cf3928`, rather than a reproducible published suite release. Review the source checkout and its generated manifest before installation.

## Install the complete directory

Copy the entire packaged skill, including references, licences and helpers. Copying only `SKILL.md` or the development source directory leaves out the packaged runtime.

| Host | Project directory | Personal directory |
| --- | --- | --- |
| Codex | `.agents/skills/` | `~/.agents/skills/` |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| GitHub Copilot | `.github/skills/` | `~/.copilot/skills/` |

These local directory conventions are documented by [OpenAI](https://learn.chatgpt.com/docs/build-skills), [Anthropic](https://code.claude.com/docs/en/skills) and [GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills), checked on 15 October 2026. Check the instructions for your specific host and environment when installing.

For example, from the Skills checkout, copy Author into a model project's Codex directory:

```sh
mkdir -p /path/to/model-project/.agents/skills
cp -R release/skills/cmmf-author /path/to/model-project/.agents/skills/
```

Replace the example path with your project's location. Inspect an existing destination before copying. Preserve local customisations when updating; uninstall by removing only the installed directory you own. Use the host's skill selector to confirm discovery before expecting a workflow to run.

## Try a bounded task

Extract the [Customer Story project](/downloads/examples/1.2.0/customer-story.zip) into a working directory. Install `cmmf-review` and `cmmf-validate` there, then ask:

> Use cmmf-review to assess this Customer Story set against its README brief. Explain the linked customer and embedded quote decisions. Propose improvements without changing files.

Inspect the proposed changes. When authorising an edit, state its scope and ask for complete-set validation, the source version/revision, changed files and remaining uncertainty. Run the project's `npm run validate` yourself after installing its dependencies.

## Keep source resolution explicit

New projects default to the latest CMMF source. Existing projects use the manifest-declared version. An explicit historical request needs matching schema, specification and revision evidence. Offline cache reuse does not establish that “latest” is still fresh.

The documented helper semantics recognise legacy `1`, `1.1.0` and `1.2.0`; unsupported versions must be reported rather than silently upgraded. Keep source caches outside model directories.

Helpers inspect, resolve sources, validate, compare and document models. They do not validate actual content instances, transfer content, run live CMS migrations or provide CMS import/export adapters. Review those implementation decisions separately. See the [validation guide](/docs/guides/validation/) and [tool evidence](/tools/#evidence-and-release-status).
