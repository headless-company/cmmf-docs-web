---
title: Article and Subscription model set
description: A complete beta project demonstrating structured, prose and expression validation hints.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/beta/examples/article.md
---

An external article needs a source URL, and search exclusion needs an explanation. A subscription's quarterly price may depend on its monthly price. The canonical **1.3.0-beta.1** set records these needs without pretending every CMS can enforce them.

[Download the complete beta project](/downloads/examples/1.3.0-beta.1/article.zip) · [Combined model JSON](/downloads/examples/1.3.0-beta.1/article.models.json) · [Matching schema](/schemas/1.3.0-beta.1/model.schema.json)

## Included models

The set contains **Article, Page, Person, SEO Metadata and Subscription**, plus a manifest, schema, declaration checker, validator, bundler and pinned package dependencies. Keep all five definitions together so references resolve.

<!-- beta-file: examples/manifest.yaml -->

## Article: conditional and cross-field intent

This is one model from the complete set, rather than a standalone project. Its Person and SEO Metadata dependencies are included in the download.

<!-- beta-file: examples/models/article.yaml -->

## Subscription: an expression escape hatch

This rule uses a named dialect. The checker validates its wrapper; it does not execute the expression or establish support in a CMS.

<!-- beta-file: examples/models/subscription.yaml -->

## Validate the project

Use Node 22.12 or newer:

```sh
npm ci
npm run validate
npm run bundle
```

The project checks the complete model graph as well as schema shape and beta hint semantics, including direct field references, unique hint IDs, operator/operand types and regex syntax. It does not evaluate content or expressions. `npm run bundle` writes `models.json` from the same validated YAML definitions.

The exact upstream manifest and model bytes are preserved. `SOURCE.md` records commit and schema hash; `SCHEMA-LICENSE.md` covers upstream material. [Validation guidance](/docs/guides/validation/) distinguishes these checks from content validation. [Translation](/docs/concepts/translation/) explains the required disposition for every hint.
