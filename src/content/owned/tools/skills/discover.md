---
title: "Discover: turn requirements into modelling decisions"
description: "Turn requirements into modelling decisions."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/discover.md
---

## Use when

A brief, workshop, content inventory or domain discussion needs to become an agreed modelling brief. Useful before YAML authoring, and when an existing model needs to be reconciled with new requirements. It is content-modelling discovery, not generic product discovery.

## Provide

The actual notes/brief and their locations; desired channels/editorial outcomes; known reuse, ownership and lifecycle needs; any current model repository/conventions; and where to save the brief. Unknowns are acceptable and should be identified.

## Prompt

> Use cmmf-discover on notes/customer-stories.md and the current models. Customers can appear in many stories. We have not agreed whether quotes belong to a story or are reusable. Save a traceable modelling brief to docs/modelling-brief.md. Identify only questions whose answers change the model.

## How it works

Reads the notes and modelling guidance; inspects existing definitions and conventions if supplied; identifies content concepts, ownership, reuse, relationships, editorial workflow and delivery needs; separates evidence from inference. It resolves canonical source when version-specific concepts or draft models are needed. It asks consequential questions and continues independent analysis. If YAML is also requested, it can proceed into authoring and validation without requiring another installed skill.

## Expected output

A brief containing candidate models and reasons for their boundaries; key fields; embedded-versus-linked intent and repeatability; supported localisation/validation/editorial needs; decisions and consequential assumptions traced to the input; and unresolved questions that change structure or constraints. It need not produce YAML.

A useful output fragment would say: “Customer identity is reusable because the notes say the same customer appears in several stories. Story-to-Customer is a reference. Quote ownership is unresolved: if quotes are reusable identities, reference them; if they exist only within a story, consider embedding. Resolve that before finalising the structure.” This is illustrative reasoning, not a fixed schema template.

## New-user success check

You can explain why each proposed model exists and which decisions remain. The report has not invented CMS fields or configuration unsupported by the brief.

## Staff acceptance

Trace each consequential boundary to evidence; check reuse against existing semantic definitions; verify that ownership, localisation, repeatability and publication requirements are explicit enough to author. A brief that hides a consequential unanswered question is not ready merely because it reads fluently.

## Limits and next step

Discovery is not schema validation and cannot prove stored content is compatible. Agree the material decisions, then request authoring; retain the brief as design evidence.



## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
