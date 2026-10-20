---
title: "Evolve: plan or implement intentional change"
description: "Plan or implement intentional change."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/evolve.md
---

## Use when

Analysing/removing/splitting/renaming models or fields, changing constraints/ownership, or explicitly upgrading the specification. Supports a concrete plan and scoped authorised model edits; it does not execute live content transfer.

## Provide

The current repository, proposed outcome, requirements/content constraints, consumer/integration information, content samples/counts when available, upgrade intent if any, and whether you want a plan or implementation. Identify rollout/backfill constraints and decisions already approved.

## Prompt

> Use cmmf-evolve to plan moving embedded customer details out of stories into reusable Customers. Preserve story IDs. Explain deduplication, old-to-new mappings, translations, dependent models, consumers, backfill, verification and rollback. Produce the proposed model changes and semantic impact report. Do not claim content has been migrated.

## How it works

Captures isolated before/after snapshots without resetting user work, resolves matching sources for each side, validates both, then uses semantic diff for additive/breaking/uncertain changes and transitive incoming dependent models. It supplements that evidence with content, consumer, editorial and migration analysis. For planning, it returns a concrete proposal and steps; for authorised implementation, it edits scoped files and validates the result. It does not silently upgrade the manifest or delete fields to silence errors.

## Expected output

Proposed or implemented model diff; semantic change records with `code`, `classification`, `model`, optional `field`, `message`, `dependents`; concrete old-to-new field/identity mappings; deduplication/ownership decisions; backfill and translation needs; external consumer impact; rollout/verification/rollback sequence; assumptions, missing content evidence and source/validation records. Suggested files: `docs/change-impact.md` and `docs/migration-plan.md` when requested.

## Interpretation

Required-field additions, removals, structure/ownership/localisation/repeatability changes and removed allowed values can be breaking. Constraint, rich-text and metadata changes can be uncertain. Additive output is evidence of the helper's classification, not proof that every consumer remains compatible. Dependent models come from the before graph; unrepresented consumers, CMS configuration and application code need separate inventory. Renames are not automatically inferred as data mappings from matching prose.

## New-user success check

The plan tells you what happens to existing data, who/what changes, in what order, how to test the transition and how to recover. A green model validator alone is insufficient.

## Staff acceptance

Validate both model sets, inspect the diff classes and missing evidence, sample existing content where available, verify deduplication and retained IDs, assign consumer/backfill owners, and set measurable cutover/rollback criteria. Resolve unapproved consequential breaking decisions using the concrete proposal. Content migration completion requires actual content/consumer evidence beyond this skill.

## Limits and next step

Model files and migration plans do not move content. Execute any live migration through the team's separately authorised implementation and operational process, then verify data, consumers and editorial workflow before retiring old structures.

## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
