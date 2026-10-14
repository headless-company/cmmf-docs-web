---
title: Give rich text a clear job
description: Describe the formatting and embeds an editor needs, then record how those capabilities translate to a CMS.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/guides/rich-text.md
---

A story needs paragraphs, headings and quotations. It may need emphasis and links. It rarely needs every capability an editor can offer. Define the editorial job before choosing the controls.

## Describe the intended capabilities

The Customer Story tutorial uses this field, shown as an excerpt from its complete model:

<!-- example-fields: customer-story customer-story story -->

`marks` allows inline formatting; `blocks` allows structural content. The tokens describe translator-recognised capabilities. The schema checks their shape, rather than guaranteeing that every CMS recognises the same token vocabulary.

Omitting `richTextConfig` leaves capabilities to translator-defined defaults. Optional allowlists let you state more intent. Agree and document the meaning of an empty allowlist with the translator, rather than assuming its editor behaviour.

## Decide which embeds belong

The canonical Article example additionally allows assets and references to Person:

<!-- example-fields: article article body -->

An embed's `kind` must be `asset` or `reference`. A reference embed needs `targets`, and those targets must exist in the complete model set. This describes allowed model types, rather than selecting individual people or assets.

An independently managed callout or person can suit a reference embed. A layout block with several carefully structured fields may suit a component model instead of unrestricted rich text. Make that choice with the authors who will maintain the content.

## Keep a translation record

For each capability, record whether the target editor supports it, how it is represented, and what happens when it cannot be preserved. For example, an unsupported `quote` block might be rejected, or mapped to an explicitly agreed alternative. The decisions log should make that loss visible.

Rich text configuration does not standardise the stored rich text document or render HTML. The consuming application needs its own renderer and content checks. See the [translation contract](/spec/1.2.0/translation-contract/) and [validation guide](/docs/guides/validation/).
