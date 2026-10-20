---
title: "Document: explain the actual model set"
description: "Explain the actual model set."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/document.md
---

## Use when

Producing stakeholder documentation, model catalogues, field dictionaries and Mermaid relationship diagrams from CMMF source. The YAML remains authoritative.

## Provide

The complete repository, target audience, output path(s), desired bounded scope for a large graph, and any recorded design rationale/brief. Provide matching canonical source access.

## Prompt

> Use cmmf-document to explain the Article, Author and SEO architecture to our content team. Save a catalogue and Mermaid diagram to docs/content-model.md. Explain linked authors versus embedded SEO, effective required/localised defaults and relevant field constraints. Include source and validation evidence, and label inferred rationale.

## How it works

Resolves source, validates the graph, uses the documentation helper for an initial catalogue/diagram, and saves requested output through the host editor. It adapts language to the audience and supplements the generated overview with constraints, enum values, localisation, rich-text and editorial/governance detail from the real files. Large bounded views must say what was omitted. Invalid or incomplete graphs must not produce a complete-looking unexplained diagram.

## Expected output

Markdown catalogue, per-model field tables, Mermaid flowchart, model IDs/kinds, embedded/reference/rich-text-embed edges, repeatability and available ownership, plus audience-specific explanation and provenance/validation evidence. The helper's field table has Field, Type, Required, Localised, Repeatable and Description columns. It includes effective required/localised defaults and model editorial/governance blocks where present.

The helper prints Markdown; it has no `--output` flag. Its plain Markdown includes namespace and declared CMMF version but does not automatically embed the complete source revision/hash/validation record. The skill must add that evidence; use `document --format json` to retain the source/diagnostics alongside the Markdown. The overview is not a complete field-constraint reference on its own.

## New-user success check

You can trace diagram nodes/edges and field descriptions back to real models, distinguish embedded and linked content, and identify the generation source/date and validation result.

## Staff acceptance

Compare generated output against the files, including defaults and rich-text reference embeds; check scope omissions; verify that added rationale is supplied evidence or labelled inference. Regenerate affected documentation after model changes. Do not accept diagrams that simplify away ownership or missing targets without explanation.

## Limits and next step

Diagrams are derived views. They neither define model semantics nor evaluate stored entries. Readers can use them for review; changes return to YAML and must be revalidated before regeneration.



## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
