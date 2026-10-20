---
title: "Review: assess architecture and editorial usability"
description: "Assess architecture and editorial usability."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/review.md
---

## Use when

Evaluating whether model boundaries, reuse and relationships express the intended architecture and support editors. It is not general code review. A review request alone does not authorise changes.

## Provide

Actual models, requirements, project conventions, editorial/localisation context and the audience/scope of the review. Content samples and consumer details improve recommendations when available.

## Prompt

> Use cmmf-review on our Customer Story models for the content team and implementers. Focus on customer/quote ownership, reuse, label fields and requiredness against the publication workflow. Return prioritised findings with field locations, consequences and concrete improvements. Review only.

## How it works

Establishes schema/graph validity before treating design suggestions as the main result, then reviews boundaries, reuse, object/reference choices, ownership, repeatability, taxonomy/settings, localisation, rich-text capabilities and editorial metadata. It ties suggestions to practical consequences. It does not assume every cycle is invalid or every repeated structure deserves independent identity.

## Expected output

Prioritised findings, each with model/field/file location, evidence, editing or implementation impact, a concrete recommendation or unresolved decision, and a category distinguishing invalidity, convention violation and design tradeoff. Include useful sound decisions where they explain the assessment; no manufactured quota of issues. Suggested report file: `docs/model-review.md` when requested.

An illustrative finding format: “Design tradeoff — `customer_story.quote`: ownership is not recorded in the supplied requirements. Editors cannot tell whether changing a shared quote should affect other stories. Agree independent reuse versus story ownership before choosing reference or embedding.” Do not label a tradeoff a spec error.

## New-user success check

Each recommendation explains a real consequence in your model, and review-only use has not silently changed files.

## Staff acceptance

Confirm the reviewer inspected the actual files and relevant requirements, grounded each finding, applied project rules separately from canonical validity, and avoided treating preference as specification. If implementation is requested afterward, check the authorised diff and rerun validation.

## Limits and next step

A review depends on the supplied requirements and content evidence. It is not certification of a CMS editing interface. Agree improvements and request scoped Author/Evolve work where needed.



## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
