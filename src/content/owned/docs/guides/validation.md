---
title: Validate the model at the right level
description: Separate schema checks, whole-model semantic checks and validation of actual authored content.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/guides/validation.md
---

Validation answers different questions at different stages. Be explicit about which checks a tool performs.

## Model structure

The [CMMF 1.2.0 JSON Schema](/schemas/1.2.0/model.schema.json) checks the structure of an individual model: required properties, known type identifiers and conditional property rules.

The bundled source does not include a separate manifest schema. A project validator needs its own documented manifest and version checks.

## Relationships across the set

Whole-model checks inspect information a single-file schema cannot resolve. These include duplicate IDs, missing reference targets, incorrect object-target kinds, rich-text embed targets and missing editorial label fields.

Run checks on the complete set. A teaching excerpt may deliberately omit fields or targets and should not be treated as a standalone model document.

## Declared content constraints

Model fields can express content constraints such as character limits, numeric bounds, list limits and MIME types. These are intentions to carry into an implementation.

| Category | Common keys |
| :--- | :--- |
| Text | `minLength`, `maxLength`, `regex` |
| Number | `min`, `max`, `integerOnly` |
| Lists | `minItems`, `maxItems`, `uniqueItems` |
| Assets | `mimeTypes`, `dimensions`, `fileSize` |

The schema deliberately does not formalise every key/type combination. File-size units and dimension structures need an agreed translator convention. Reference item bounds can be expressed under `relation`; see the [specification](/spec/1.2.0/) for the precise rules.

## Authored content and implementation

Checking a model does not establish that real articles or assets satisfy its declared constraints. That requires content-instance validation or enforcement by the target system.

A translator should preserve supported constraints and record unsupported or lossy mappings. Editorial usefulness, relationship choices and platform fit still need a review.

The site's production build checks both complete example sets for schema validity, manifest version, duplicate model/field IDs, editorial field references, relationship targets and coherent constraint bounds. The [Customer Story project](/examples/customer-story/) includes the same checks as a portable local validator. It does not perform content-instance validation or certify CMS mappings.

## Work with Skills

For agent-assisted checks, use [Validate](/tools/skills/validate/). Keep format/graph validity, team conventions, architecture quality and content/migration safety separate. Natural-language conventions are not automatically enforced by the helper. The downloadable example validator is a separate interface from Skills commands.
