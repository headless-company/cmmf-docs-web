---
title: Adopting the 1.3 beta
description: Select the experimental version explicitly and preserve document-level validation intent.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/beta/docs/guides/adopt-1-3-beta.md
---

An external article needs a source URL. An article needs an author or a source. Those are rules about a whole document, rather than a single field. CMMF **1.3.0-beta.1** adds optional model-level `validationHints` to describe that intent.

This is an experimental prerelease. **1.2.0 remains stable**. Publishing these docs does not promote the format to stable or change existing projects. There is no stable 1.3.0 release.

## Select an exact version

```yaml
specVersion: "1.3.0-beta.1"
namespace: example.beta
modelsPath: ./models
```

Pair that manifest with the [beta schema](/schemas/1.3.0-beta.1/model.schema.json), [beta specification](/spec/1.3.0-beta.1/) and [beta translation contract](/spec/1.3.0-beta.1/translation-contract/). Do not use `1.3`, `1.3.0`, or silently fall back to 1.2.0. The stable schema permits unknown properties and can accept a hints block without checking it. That acceptance does not establish compatibility.

Existing field constraints and relationship meanings remain unchanged. For an existing set, deliberately update its manifest, select the matching schema/checker and revalidate the complete model set. Add hints only after every consumer can preserve them. Avoid overwriting a stable project while testing.

## Choose a representation

[Document-level validation hints](/docs/guides/document-validation-hints/) explains the three exclusive forms: structured conditions/actions, a complete assertion in a named expression dialect, or prose. Every hint needs a unique ID and meaningful description. A hint does not enforce a content check by itself.

The [complete Article and Subscription example](/examples/article/) demonstrates all three forms. Its downloadable project includes the beta schema and upstream declaration checker. With Node 22.12 or newer, extract the project and run:

```sh
npm ci
npm run validate
npm run bundle
```

These project commands check model shape, hint declarations and model-set references. They do not evaluate content or expressions. The upstream checker alone has a narrower scope: it checks hint references and operator compatibility but does not resolve relationship targets. See [validation](/docs/guides/validation/).

## What changed from the RFC?

[RFC #1](https://github.com/headless-company/content-model-master-format/issues/1) records the proposal. The [tagged beta implementation](https://github.com/headless-company/content-model-master-format/tree/v1.3.0-beta.1) resolves its open questions. The beta specification governs actual behaviour:

| Topic | Implemented beta behaviour |
| --- | --- |
| Hint identity | `id` is required and unique within its model, including prose hints. |
| Representations | Structured, expression and prose forms cannot be mixed in one hint. |
| Expressions | `jsonlogic` is an example, with no preferred dialect or required evaluator. Unknown dialects must not execute. |
| Numeric comparison | Only singular `number` fields; no date-string or text coercion. |
| Presence | `require` means non-empty. Missing, `null`, `""` and `[]` are empty; `false`, `0`, whitespace and objects are not. |
| Translation | Every hint needs a model ID, hint ID, disposition and reason. Guidance alone is `degraded`. The log serialization is translator-defined. |
| Invalid declarations | Malformed hints invalidate the model declaration regardless of severity. A content violation does not invalidate its model. |

## Check consumers and translation

Editors and other consumers need explicit version selection, the matching schema, lossless hint import/export, stable IDs and clear separation of declaration checks from content evaluation. These docs describe the format, not a claim that every tool supports the beta. [Tool capability evidence](/tools/) remains separate.

For every translated hint, record `mapped`, `degraded` or `unmapped`, with a reason identifying the model and hint. Preserving guidance without the checks is degraded. Never use a hint to weaken field-level requirements, and never treat `forbid` as permission to delete content.

Report beta findings against the [upstream RFC](https://github.com/headless-company/content-model-master-format/issues/1). A later beta needs a new exact version; stable promotion is a separate release decision.

## Skills compatibility

The current [CMMF Skills helpers](/tools/skills/sources-and-versions/) do not support beta source requests or beta semantics. An explicit beta checkout does not bypass this limit. Use the matching downloadable beta project validator described above; its checks do not establish Skills compatibility.
