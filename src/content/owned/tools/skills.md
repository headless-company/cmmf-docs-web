---
title: "Install CMMF Skills"
description: "Build, install, verify, update and remove complete independent skill packages."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills.md
---

:::caution[Implementation and compatibility status]
Six packaged skills and deterministic helpers are implemented at suite baseline 0.2.0. Automated helper/package checks are recorded in the source handover. Installed-skill discovery and realistic modelling behaviour in Codex, Claude Code and GitHub Copilot remain pending evaluation. The helpers recognise legacy `1`, `1.1.0` and `1.2.0`; they do not support the experimental 1.3 beta. See [sources and versions](/tools/skills/sources-and-versions/).
:::

## Who needs what

| Reader | Requirements |
| --- | --- |
| Person building the suite from source | Git, Node.js 22+, pinned `npm@11.11.0`, source checkout, dependency-download access for `npm ci` |
| Person using an assembled skill | A host/environment that can load local skills, read/edit the project and run Node.js 22+; no npm installation in the model project |
| Person retrieving a canonical source | Git, writable cache outside the model directory and permitted access to the canonical remote, or an already identified exact-version cache/local source |
| Team running deterministic checks | Node runtime, built helper, model repository and an explicitly supplied matching canonical source; no LLM session required |

The package declares npm `>=11.10.0`, while `packageManager` pins `11.11.0`. Use the pin for reproducible contributor instructions. `.nvmrc` currently says `22`; use the site's separate Node requirement for the website itself. Do not instruct readers to disable dependency policy to get a successful install.

## Build from source

Run in a location chosen for the Skills checkout, separate from the model project:

```sh
git clone https://github.com/headless-company/cmmf-skills.git
cd cmmf-skills
git switch --detach 68ec28d3993eb08298ebf9a896f6a9d51b425bf0
node --version
npm --version
npm ci
npm run check
```

To reproduce this source baseline, select `68ec28d3993eb08298ebf9a896f6a9d51b425bf0` with `git switch --detach` in this fresh checkout. This is a source baseline, not a published release.

`npm run check` builds, runs tests and dependency checks, packages all six skills, and verifies every package separately. It already includes packaging/verification. For a focused rebuild use `npm run skills:package` followed by `npm run skills:verify`.

| Build output | Meaning |
| --- | --- |
| `dist/` | Compiled local tools and programmatic exports |
| `release/skills/<skill-name>/` | Complete independently installable skill |
| `release/cmmf-skills.tar.gz` | Suite archive containing `skills/` and `manifest.json` |
| `release/manifest.json` | `formatVersion`, product `name`/`version`, skill names and per-file `sha256` map |

Each packaged skill includes `SKILL.md`, shared `references/`, `LICENSE.md`, and `scripts/cmmf-tools/` containing the local runtime, JavaScript dependencies and dependency licences. The source `skills/` directories alone are not installable equivalents. The suite manifest is outside individual skill directories: preserve it separately as installation evidence. Hashes identify/check bytes; they are not a signed publisher attestation. The current manifest does not contain the source Git SHA; record that separately.

These outputs are ignored by Git and generated locally. No globally available `cmmf-tools` command is established merely by cloning, building, or copying a skill. No npm package publication is implemented by these commands.

## Install complete folders

Choose one scope and host destination. Add `<skill-name>/` beneath the listed parent.

| Host | Project parent | Personal parent | Official reference |
| --- | --- | --- | --- |
| Codex | `.agents/skills/` | `~/.agents/skills/` | [Build skills](https://learn.chatgpt.com/docs/build-skills) |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` | [Extend Claude with skills](https://code.claude.com/docs/en/skills) |
| GitHub Copilot | `.github/skills/` | `~/.copilot/skills/` | [Adding agent skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills) |

The source handover records these documented paths as checked against official pages on 20 October 2026. They are installation locations, not evidence that this suite has passed host-specific evaluation. Check the chosen host surface and settings when installing. Personal files on a laptop should not be assumed present in a cloud session; provision the complete package in the environment that actually executes it. [Claude Code's documentation](https://code.claude.com/docs/en/skills) specifically distinguishes local personal skills from cloud-session project skills.

For a fresh Codex project destination, run from the Skills checkout:

```sh
mkdir -p /path/to/model-project/.agents/skills
cp -R release/skills/cmmf-author /path/to/model-project/.agents/skills/
```

Replace `/path/to/model-project` with the actual target path. Inspect any existing destination before copying. Use the same pattern for another skill or host parent. Installing all six is optional: each package has its own references/runtime and no dependency on another installed skill.

## Verify installation and run a bounded first task

1. Check that the installed directory directly contains `SKILL.md`, `references/` and `scripts/cmmf-tools/tools/cli.js`; avoid an extra nested `<name>/<name>/` directory.
2. Use the host's documented skill list/selector or start a new session as appropriate. Confirm the named skill is visible in the intended project/environment. Visibility is an observation to record, not an assumed outcome.
3. Check helper execution independently:

```sh
node /absolute/path/to/installed/cmmf-author/scripts/cmmf-tools/tools/cli.js --help
```

4. In an empty disposable model project, ask:

> Use cmmf-author to create an Article with a required title, reusable Authors and SEO metadata embedded within each Article. Authors are shared across articles; SEO has no independent lifecycle. Use CMMF 1.2.0 for this trial. Put models in models/. Validate the complete repository and report the source revision, files changed, assumptions and actual validation result.

5. Confirm the agent used a matching canonical source and produced a manifest plus all referenced model files. Confirm that Author is referenced and SEO is embedded, and that validation used the installed helper or another identified executable validator.
6. Review the actual files and result. A clean validator establishes the checked format/graph properties; have the content team assess whether the boundaries and editing behaviour satisfy the brief.

Use an explicit known version for the repeatable onboarding trial. Separately test a `latest` request and record what it actually resolves to; do not hard-code an assertion that latest always means 1.2.0.

## Update, rollback and uninstall

Record the source SHA, suite version, package manifest and installed file hashes before rollout. Inspect the destination for local customisations and preserve them. Build/verify the selected update, compare its manifest and instructions, replace only the owned installed skill directory, and repeat the bounded task. Avoid recursive copy over an existing folder that leaves obsolete runtime files behind. Keep project conventions in project files where possible, rather than editing every installed package.

For rollback, restore the previously recorded complete package and rerun the relevant trial. Removing or rolling back a skill does not revert model edits. To uninstall, remove only that installed skill's directory; retain model files, conventions and source caches unless their removal is explicitly intended. Builds/extraction do not configure provider credentials.

Continue with [worked journeys](/tools/skills/workflows/), [local commands](/tools/skills/local-tools/) and [troubleshooting](/tools/skills/troubleshooting/).
