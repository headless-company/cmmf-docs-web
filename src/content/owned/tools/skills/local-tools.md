---
title: "Local tool reference"
description: "Run inspect, source, validate, document and diff with the correct flags and exit codes."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/local-tools.md
---

The helpers are noninteractive, provider-free commands. They read model inputs, and source retrieval maintains a separate cache. They neither invoke an LLM nor edit model YAML. The agent skills decide how to use the evidence and make authorised file edits.

## Invocation contexts

Inside a built Skills source checkout:

```sh
npm run tools -- inspect --repo /path/to/model-project --format json
npm run tools -- source --version 1.2.0 --cache /path/to/cmmf-source-cache --format json
npm run tools -- validate --repo /path/to/model-project --cmmf-repo /path/from/source.root --format json
npm run tools -- document --repo /path/to/model-project --cmmf-repo /path/from/source.root --format json
npm run tools -- diff --before /path/to/before --after /path/to/after --cmmf-repo /path/from/source.root --format json
```

In an installed skill, the same argument list goes after:

```sh
node /absolute/path/to/installed/skill/scripts/cmmf-tools/tools/cli.js
```

For example:

```sh
node /absolute/path/to/installed/skill/scripts/cmmf-tools/tools/cli.js inspect --repo /path/to/model-project --format json
```

Use absolute paths so working directory does not determine the active package or model repository. Substitute the actual `source.root` returned by retrieval; it is not the cache parent. A model project's own `npm run validate` script, such as a downloaded site example's validator, is a separate interface from the Skills source checkout command.

## Commands and actual output

| Command | Arguments | Output/meaning |
| --- | --- | --- |
| `inspect` | `--repo PATH`, optional `--format json` | Always JSON: `root`, `manifest`, `manifestFile`, raw `models`, `edges`, `instructions`, `diagnostics`. Never fetches canonical sources; parse success is not schema validity |
| `source` | `--version VERSION --cache PATH`, optional `--offline`, `--remote URL`, `--format json` | JSON `{source: ...}` or readable root/version/revision/freshness. Defaults to canonical remote; remote override is an explicit advanced/test option |
| `validate` | `--repo PATH --cmmf-repo SOURCE`, optional `--format json` | JSON `{valid, source, diagnostics}` or readable source, model/relationship counts and findings |
| `document` | Same source/repo flags, optional `--format json` | On valid input: Markdown by default or `{valid, source, diagnostics, markdown}` JSON. Invalid input returns diagnostics, not a misleading catalogue |
| `diff` | `--before PATH --after PATH --cmmf-repo SOURCE`, optional `--after-cmmf-repo SOURCE`, `--format json` | Always JSON: `{valid, sources: {before, after}, diagnostics, changes}`. Validates both repositories before computing changes; invalid sides yield `changes: []` |

Omit `--format` for the command's default output; the only accepted format value is `json`. No `--fix`, `--output`, `--provider`, `--model`, `--yes`, `generate` or live migration command exists. `--help` is a top-level invocation. Do not build tutorials around unsupported flags.

For an explicit specification upgrade, resolve each version separately and use:

```sh
npm run tools -- diff --before /path/to/before --after /path/to/after --cmmf-repo /path/to/old-source --after-cmmf-repo /path/to/new-source --format json
```

## Exit codes and automation

| Exit | Meaning | Correct response |
| --- | --- | --- |
| `0` | Success for that command; a diff has no breaking/uncertain classification | Read warnings and scope; do not extrapolate to content or architecture approval |
| `1` | Invalid model data, or a valid diff with breaking/uncertain changes | Inspect `valid`, diagnostics and changes. A reviewed breaking change is a result to handle, not a tool crash |
| `2` | Usage, source resolution or execution failure | Fix invocation/environment/source availability; validation may not have run |

The top-level CLI failure handler writes a JSON `TOOL_ERROR` message to stderr. Diagnostic arrays use `code`, `severity`, `file`, `path`, `message`; not every `path` is a JSON Pointer, so retain it as reported. Preserve stderr and process exit codes when capturing evidence. In particular, `diff` exit 1 with `valid: true` means impact review is needed; with `valid: false`, fix invalid sides before treating changes as complete. The helper does not contain an approval mechanism for breaking changes.

## Programmatic migration for implementers

The package exports `inspectRepository`, `acquireSource`, `readSource`, `validateRepository`, `semanticDiff`, `documentRepository`, `loadProjectInstructions`, canonical-remote/supported-version values and associated raw data/evidence types from `src/index.ts`/compiled `dist/index.js`.

The retired `runAgent`, provider factories/types, tool-call contracts, strict legacy model types, `loadRepoGraph`, renderer functions and old `resolveCmmfSource` interfaces are removed. There is no provider-generation API replacement. Programmatic callers must pass matching source evidence explicitly and validate both inputs before `semanticDiff`; the CLI provides that orchestration, while the exported diff function itself does not. Use the [migration guide](/tools/skills/migration/) and exported TypeScript types as the API reference. The workspace is private; no npm publication is established.

## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
