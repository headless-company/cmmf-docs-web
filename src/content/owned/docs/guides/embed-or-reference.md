---
title: Embed or reference?
description: Decide whether information belongs with one piece of content or needs an independent, reusable identity.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/guides/embed-or-reference.md
---

Several stories may concern the same customer. Each story's quote, however, belongs in the context of that particular outcome. Those needs lead to two different relationships.

## Start with the lifecycle

Ask who edits the information, where it is reused, and what should happen when its container changes or disappears.

| Question | Customer profile | Story quote |
| --- | --- | --- |
| Reused independently? | Across several stories | Usually specific to one story |
| Updated in one place? | Name and logo should stay consistent | Wording and attribution need their original context |
| Useful outside this container? | Yes | Only if the brief explicitly requires a quote library |
| Teaching example choice | Linked reference | Embedded object |

These choices follow this brief. A reusable quote library would be a different model, with its own identity, consent and lifecycle decisions.

## Express the relationships

The following fields are excerpts from the [complete Customer Story set](/examples/customer-story/), rather than standalone model documents.

<!-- example-fields: customer-story customer-story customer,quote -->

The `customer` field links to an entry and is required and singular. The `quote` field embeds the fields of an object model and is optional. `objectType` must identify a model whose kind is `object`.

## Separate ownership from storage

A reference can carry `relation.ownership: contained` when the linked item's lifecycle belongs to its container. That intent does not turn the field into an `object`, or prescribe a database table. A translator might use an embedded representation or a separate content type, with the choice recorded in its decisions log.

Use `linked` when independent reuse is intended. Review [relationship rules](/docs/concepts/relationships/) and the [translation contract](/spec/1.2.0/translation-contract/) before deciding how a CMS will enforce deletion or publication behaviour.

## Add lists when the brief requires them

Use field-level `list: true` for repeatable objects or references in 1.2.0. Decide order, duplicates and item bounds separately. A required list and a list with a minimum number of items express different concerns; confirm how the target system enforces both.

After changing a relationship, [validate the complete set](/docs/guides/validation/), review every dependent model and inspect the graph in [Studio](/tools/studio/). A successful schema check alone cannot establish that the target model exists.
