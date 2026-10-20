---
title: Understand validation errors
description: Repair common structure and whole-model failures using the portable example validator.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/guides/errors.md
---

Start from a [complete example project](/examples/), install its locked dependencies with `npm ci`, then run `npm run validate`. Keep a working copy before experimenting. The messages below refer to the downloadable example validator; other tools may phrase them differently.

## A target cannot be found

```text
Missing target: customer-story.customer -> customer-missing
```

The `customer` field names a model ID that is absent from the loaded set. In the tutorial its `targets` should be `[customer]`. Check the target model's `id`, the manifest's model directory and whether every file was included. A filename alone does not define the target ID.

## An object targets the wrong kind

```text
Incorrect object kind: quote
```

An `objectType` must resolve to an `object` model. Restore `kind: object` on Quote if it is intended to be embedded. If the brief instead requires independent quote entries, review the relationship design and use a reference deliberately.

## An ID is repeated

```text
Duplicate model ID: customer-story
Duplicate field ID: customer-story.title
```

Model IDs must be unique within the set; field IDs must be unique within their model. Remove accidental duplicate definitions. If these are distinct concepts, choose distinct IDs and update references and editorial metadata together.

## A preview points to an absent field

```text
Missing editorial field: customer-story.absent
```

The model's `labelField` or preview refers to a field that does not exist. Use the current field ID, or remove a preview role the model no longer provides.

## Bounds contradict each other

```text
customer-story.title: minLength exceeds maxLength
```

The maximum cannot be lower than the minimum. Agree the intended bounds, then change the values. Character and item counts in the example validator must also be non-negative integers. This checks the declared rules; it does not inspect actual story text.

## A schema rule fails

Schema failures include an AJV error array. Its `instancePath` identifies the property location; `keyword` names the failed rule. Look for the actionable error in the array, since a conditional rule may produce several related messages.

Common causes include missing `objectType`, missing reference `targets`, an unknown canonical type, or conflicting `list` and legacy `relation.cardinality`. See [the type reference](/docs/reference/canonical-types/) and [migration guide](/docs/guides/migrate-to-1-2/).

## The version or YAML cannot be read

The example validator requires the manifest string `"1.2.0"`. A different declared version needs matching source material and tooling; changing the label alone is not a migration. YAML parser errors identify the file and location. Check indentation, repeated keys and quoted strings before debugging relationships.

Run validation again after each repair. Then review editorial usefulness and any CMS mapping separately. A passing check has the [scope described here](/docs/guides/validation/).

## Work with Skills

For package installation, source resolution, unsupported helper versions and diff exit codes, see [Skills troubleshooting](/tools/skills/troubleshooting/).
