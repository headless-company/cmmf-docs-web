---
title: "Author: create or extend model YAML"
description: "Create or extend model YAML."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/author.md
---

## Use when

Creating a model repository or making scoped additions/edits from natural-language requirements or an agreed brief. It handles portable CMMF modelling, not translating a CMS export into a live CMS configuration.

## Provide

The target repository, brief/decisions, intended scope, version request if any, project conventions, output locations and any facts about reuse/ownership. For existing work, identify files or areas that must be preserved.

## Prompt

> Use cmmf-author to add reusable authors to articles in this repository. Reuse the existing Person model if it represents the same identity. Authors may appear on multiple articles, and an article may have several authors. Keep the declared CMMF version and existing IDs. Validate the whole repository and show a semantic before/after comparison.

## How it works

Resolves/reads the required canonical source, inspects current models/conventions, reuses meaningfully equivalent structures and preserves stable IDs. For new repositories it creates an explicit manifest and models in the declared directory. It asks only questions that materially change the schema: ownership, embedding, reuse, repeatability, enum values, localisation, requiredness or ambiguous existing definitions. It applies authorised edits through the host and validates the complete resulting graph. For existing repositories it compares isolated before/after snapshots; it must not reset the worktree to manufacture the baseline.

## Expected output

`manifest.yaml`/`.yml` for a new project, model YAML files, a changed-file summary, concise rationale and assumptions, actual whole-repository validation evidence, and semantic impact for existing work. For the Article/Author/SEO brief, expect all targets to exist, shared Author identity to be referenced, and SEO to be an embedded object. Exact IDs follow the brief/conventions.

## New-user success check

Every relationship points to an included model, the manifest matches the selected source, and the output tells you which files changed and why. The validation command and result are visible.

## Staff acceptance

Compare the resulting YAML against the brief, inspect the semantic changes and preserved IDs, distinguish pre-existing problems from introduced failures, and review effective manifest defaults. Validate the entire resulting repository. Any unrequested breaking decision must be resolved with concrete impact evidence before implementation. Ordinary already-authorised edits do not need an extra confirmation ritual.

## Limits and next step

Valid files do not prove a good editing experience or consumer compatibility. Review architecture/editorial behaviour, then generate docs or make an evolution plan as needed. No content instances are created or migrated by the helper.



## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
