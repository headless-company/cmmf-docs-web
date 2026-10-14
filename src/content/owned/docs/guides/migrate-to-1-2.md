---
title: Migrate a model set to 1.2.0
description: Replace legacy reference cardinality with field-level repeatability while preserving relationship intent.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/guides/migrate-to-1-2.md
---

CMMF 1.2.0 makes field-level `list` the canonical repeatability flag for every type, including references. It retains `relation.cardinality` as a compatibility alias on references. Migration should preserve the meaning of the model and make any implementation changes visible.

## Establish the starting version

Read the manifest and keep a version-controlled baseline of the complete set, its translator configuration and decisions log. For 1.1.0, consult the [archived specification](/spec/1.1.0/) and [matching translation contract](/spec/1.1.0/translation-contract/).

The site bundles a 1.2.0 schema only. A historical validation result needs a separately verified matching schema. The original numeric `specVersion: 1` denotes the pre-semver release; it should not be silently treated as 1.1.0 or 1.2.0.

## Normalise reference repeatability

These are field excerpts illustrating the same repeatable relationship before and after migration. They are not complete standalone models.

```yaml title="Before — legacy reference excerpt"
- id: related_stories
  type: reference
  targets: [customer-story]
  relation:
    cardinality: many
    ordered: true
    ownership: linked
```

```yaml title="After — CMMF 1.2.0 reference excerpt"
- id: related_stories
  type: reference
  targets: [customer-story]
  list: true
  relation:
    ordered: true
    ownership: linked
```

For `cardinality: one`, remove the alias and omit `list`, or make singular intent explicit with `list: false`. Preserve ordering, ownership, uniqueness and item bounds. Primitive and object lists already use field-level `list`.

If both flags are present and disagree, resolve the intended relationship with the model's owner. Conflicting values are invalid; a migration must not choose one silently.

## Update and check the complete set

After reviewing the changes, use the quoted manifest version `specVersion: "1.2.0"`. Validate every model against the 1.2.0 schema, then check IDs, targets and metadata across the graph. The [example projects](/examples/) provide a portable checker whose documented scope can serve as a starting point for your own project.

Compare the before and after model meanings: the same targets, requiredness, repeatability and lifecycle should remain unless a deliberate model change was approved. Review generated platform schemas and translator handling of the compatibility alias.

## Separate format migration from content migration

A notation change does not itself move content or update a live CMS. Test any changed translator output and delivery behaviour in the target environment, plan a rollback and preserve the decisions log. See the [changelog](/changelog/) for the normative release changes.
