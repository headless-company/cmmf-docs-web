---
title: Preserve editorial intent
description: Add useful help text, labels, previews and ownership without confusing metadata with implementation rules.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/guides/editorial-intent.md
---

Two fields can have the same type and very different jobs. A summary intended for search results needs different guidance from a summary intended to help an editor choose a story. Preserve that purpose alongside the structure.

## Help people make the right choice

The Customer Story summary explains where the text will be used:

<!-- example-fields: customer-story customer-story summary -->

`validations.maxLength` states a constraint. `editorial.helpText` explains the task. Help text supports the author; it does not enforce the character limit.

Useful guidance names the destination, expected content and any evidence or approval needed. Prefer “Explain the result in a sentence or two for listings and previews” to “Enter a summary”.

## Make records recognisable

The tutorial model uses this metadata:

```yaml title="customer-story.yaml — metadata excerpt"
editorial:
  labelField: title
  preview:
    title: title
    description: summary
governance:
  owner: content-team
  maturity: proposed
```

Label and preview values refer to field IDs in the same model. Renaming `summary` requires reviewing this metadata as well as downstream consumers. The example validator checks those field references. A translator still decides how the target CMS displays them.

## Record ownership and maturity

Governance can tell a reviewer who maintains a model and whether it is proposed, active or being retired. In 1.2.0 governance is an open object; these examples are useful conventions, rather than a prescribed status vocabulary.

Agree the values and their meaning within your team. A `status` property does not create an approval workflow, and an `owner` property does not grant permissions.

## Keep implementation choices reviewable

Use `translationHints` to advise a translator about preferred representations. Hints are non-authoritative: they cannot override the field's core meaning. Record any resulting choice in the [translation contract](/spec/1.2.0/translation-contract/).

Review the [complete Customer Story model](/examples/customer-story/) with an author, then inspect its metadata in [Studio](/tools/studio/). The model should explain its purpose to someone who was not in the original workshop.
