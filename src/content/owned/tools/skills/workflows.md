---
title: "Worked modelling journeys"
description: "Move from brief to reviewed models, evolve existing sets and run review-only audits."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/workflows.md
---

These are illustrative teaching scenarios, not recorded host evaluations. Run them in a disposable project and preserve actual outputs before describing them as verified.

## New project: brief to reviewed model

1. Give Discover a customer-story brief: customers can appear in many stories; quotes have unresolved ownership; products already have reusable identity. Ask for a brief with traced decisions. Settle quote ownership explicitly before encoding it.
2. Ask Author to create models from that agreed brief using the trial's explicit supported version, keeping product identity reusable. Specify the target project and output locations.
3. Check the entire resulting repository with Validate. Record command, source revision, diagnostics and exit code. Fix only supported/requested repairs.
4. Ask Review to assess publication requiredness, label/help text, localisation and ownership against the agreed workflow. Resolve high-impact findings; revalidate after edits.
5. Ask Document for a team catalogue/diagram with provenance. Review YAML and generated documentation together.

Expected reviewable deliverables: an agreed brief; manifest and complete model set; validation record; architecture findings/decisions; derived catalogue/diagram. Installation of all five skills is optional: a skill can complete requested related work using its own bundled references/helpers.

## Existing repository: safe change

> Use cmmf-evolve to add a required Summary to existing Customer Stories while retaining the declared version. Propose the model change and analyse existing records, translations and consumers before implementation. Preserve uncommitted work. State missing data evidence and propose a backfill/transition plan.

Expected outcome: adding a required field is identified as breaking/backfill work, even if the new model YAML is valid. Preserve a before snapshot including relevant uncommitted user state; create the candidate after separately; validate/diff both. With no content access, the result must explicitly leave content compatibility unverified. After authorised changes and validation, regenerate team docs. Do not use `git reset` or checkout replacement to capture a baseline.

## Review-only audit

> Use cmmf-review and executable validation to audit these models against requirements.md and cmmf.instructions.md. Report invalidity first, then convention issues and design tradeoffs, each with locations and consequences. Do not edit model files. Include evidence and unresolved questions.

Expected outcome: no model changes, reproducible validation evidence, prioritised actionable findings, and an honest account of unavailable requirements/content. The report should allow a staff reviewer to accept or reject each recommendation on its evidence.

## Output record to request in every technical handoff

```text
Task and scope:
Skill(s), package version, source Git SHA and package manifest/hashes:
Host/surface/model version (if an agent was involved):
Model repository revision and relevant working-tree changes:
Canonical CMMF version/revision, schema/spec hashes and cache freshness:
Inputs and project conventions read:
Changed files or review-only confirmation:
Decisions, rationale and consequential assumptions:
Commands actually run, exit codes and diagnostics:
Semantic impact/dependents (when relevant):
Pre-existing issues versus introduced issues:
Content/consumer checks performed and still missing:
Output paths and next owner/action:
```

This is a recommended reporting template, not an implemented report-file schema or extra mandatory approval flow.

## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
