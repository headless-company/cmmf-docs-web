---
title: "Validate: check format and cross-model integrity"
description: "Check format and cross-model integrity."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/validate.md
---

## Use when

Establishing whether a complete model repository conforms to its declared canonical format and graph constraints, diagnosing failures, or repairing issues when explicitly requested. It does not validate stored content entries.

## Provide

The repository and manifest, matching source/cache access, intended check-only versus repair scope, and requirements that determine any ambiguous repair.

## Prompt, check only

> Use cmmf-validate to check this entire repository against its declared version. Report errors with file/model/field locations, source revision, the command and exit code. Keep modelling advice separate from invalidity.

## Prompt, repair

> Use cmmf-validate to repair errors whose intended meaning is clear from the brief. Preserve existing IDs, comments and the manifest version. Report unresolved target intent instead of inventing models, then rerun whole-repository validation.

## How it works

Resolves the declared source, inspects files, runs executable canonical schema and graph checks, and uses actual diagnostics/exit codes. It reports incomplete-graph limitations from malformed YAML. It cannot substitute an agent's visual assessment for execution. For repairs it makes scoped host edits, reruns validation and inspects the final diff. A malformed manifest that makes the version unknowable is a blocking dependency to explain, not permission to use latest.

## Expected output

A located findings report and actual command evidence, source version/revision/hashes, error/warning counts or diagnostic list, repairs/diff if requested, and remaining checks. JSON diagnostic fields are `code`, `severity`, `file`, `path`, `message`. Important codes include `YAML_PARSE_ERROR`, `MANIFEST_MISSING`, `MANIFEST_AMBIGUOUS`, `MODEL_SCHEMA_INVALID`, `MODEL_ID_DUPLICATE`, `FIELD_ID_DUPLICATE`, `TARGET_MISSING`, `OBJECT_TARGET_KIND`, `EDITORIAL_FIELD_MISSING`, `PATH_OUTSIDE_REPOSITORY`, `MODEL_SYMLINK_UNSUPPORTED`, `SOURCE_VERSION_MISMATCH` and `HELPER_VERSION_UNSUPPORTED`. A source mismatch can also surface as a source/tool failure before validation returns.

## Checks covered

YAML/read/manifest failures; canonical model schema; duplicate model/field IDs; missing reference, object and rich-text reference-embed targets; embedded target kind; label-field existence; contained paths and unsupported model symlinks. Linked cycles are not automatically invalid.

## New-user success check

`valid: true`/exit 0 is tied to an identified matching source, with warnings and limitations disclosed. A report that never ran a validator does not meet this check.

## Staff acceptance

Distinguish format/graph invalidity, project convention findings, design tradeoffs and content-instance checks. Test detection against known invalid fixtures. Verify that repairs preserve intent and do not erase fields or invent targets just to produce green output. An unsupported version must not pass as fully validated.

## Limits and next step

Validation cannot decide whether a model meets all business needs, whether content satisfies constraints, or whether deployment/migration is safe. Use Review and Evolve for those additional analyses.



## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
