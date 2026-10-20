---
title: "Sources and versions"
description: "Choose matching canonical source, preserve manifest versions and report cache freshness."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/sources-and-versions.md
---

:::caution[Supported helper versions]
Suite 0.2.0 recognises legacy `1`, `1.1.0` and `1.2.0` semantics. The source parser accepts `latest`, `1` or three-part numeric versions; it rejects prerelease requests such as `1.3.0-beta.1`. Newer schemas do not establish graph/manifest support. Explicitly supplying a beta checkout does not bypass these limits. Beta readers should use their matching example validator and disclose the separate Skills limitation.
:::

The normal cycle is: **understand the request → inspect existing work/conventions → resolve canonical source when needed → reason and make authorised changes → validate the whole model set → assess impact → report evidence**. Users can enter at any skill; this is not a mandatory six-stage wizard.

## Inputs and file ownership

Inspect `manifest.yaml` or `manifest.yml`, the declared model directory, existing IDs/relationships, requirements and applicable conventions. The helper defaults the model directory to `models/` when `modelsPath` is omitted, and reads YAML/YML recursively. Model paths must remain within the selected repository. Both manifest filenames present is an ambiguity to resolve. Parse failures can make the graph incomplete.

Project conventions are discovered from root `cmmf.instructions.md`, `.txt`, `.yaml` or `.yml`, and text/Markdown/YAML guidance under `.cmmf/` or legacy `.cmmf-agent/`. These directories are for conventions, not the model storage contract. Inspect output bounds instruction content; read original files if truncated. The agent interprets conventions; the validator does not automatically enforce every natural-language rule. For example, a team rule requiring `internal_name` needs review or a separate executable check if it is a release gate.

Explicit user requests take precedence over project guidance. Explain conflicts with canonical validity rather than quietly generating invalid YAML. Preserve existing IDs, comments, unrelated files and uncommitted work. Helpers read model inputs; the host editor performs changes. Source retrieval writes to its cache, and package/build commands write derived outputs in the Skills checkout.

## Source selection table

| Situation | Required behaviour |
| --- | --- |
| New project, no version requested | Resolve latest published/current canonical source; write an explicit versioned manifest |
| Existing project | Read manifest and use that exact declared version |
| Explicit historical request | Resolve matching historical schema/spec/docs; retain requested version |
| Numeric `specVersion: 1` | Treat as original legacy format, not any current 1.x version |
| Explicit format upgrade | Validate isolated before/after snapshots against their respective matching sources |
| Missing/malformed/ambiguous manifest | Report the uncertainty; do not silently choose latest for existing work |
| Unsupported future/beta version | Report unsupported source request or helper semantics and the remaining checks; never label it full success |

Resolve once per modelling task. Read the normative spec and relevant docs from the selected revision. Do not change the source halfway through a task as upstream moves.

## Retrieval and provenance

The canonical remote is `https://github.com/headless-company/content-model-master-format.git`. `source` prefers matching release tags; historical retrieval can inspect actual schema history where tags are absent. For `latest`, it selects the highest suitable numeric release tag or, if none qualifies, the version identified by canonical README/schema at remote HEAD. It does not mix an old spec file with a current schema.

Choose a writable cache outside the target model directory. An exact-version request reuses an existing valid cached snapshot. A normal `latest` request refreshes upstream. `--offline` requires an existing pointer/snapshot and cannot establish current freshness of cached latest. Cache namespaces are separated by remote; snapshots are stored by revision. Cached schema/spec bytes are checked against recorded hashes; this is not a complete attestation of every docs file.

The `source` JSON result wraps evidence in `source`, including `root`, `version`, `revision`, `dirty`, `schemaSha256`, `specSha256`, `specFile`, `schemaFile`, `remote` and `freshness` (`local`, `fetched` or `cached`). Use `source.root` for subsequent `--cmmf-repo` arguments. A non-Git local source can have `revision: null`; retain its content hashes and disclose that limitation. A dirty local checkout needs hashes and its relevant changes recorded; commit SHA alone cannot identify those bytes.

An explicit local source checkout is valid when schema/spec/version match. Do not fetch, switch its branch or edit it as a side effect of reading it. Do not assume an adjacent clone or source environment variable. If network/helper access fails, use a genuinely identified exact cached/local source or report unavailable checks; an agent's plausible reading of YAML is not executable validation.

## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
