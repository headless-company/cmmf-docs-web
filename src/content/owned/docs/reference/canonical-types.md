---
title: Canonical field types
description: The thirteen field types in CMMF 1.2.0, their type-specific properties, and the rules shared by every field.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/reference/canonical-types.md
---

CMMF uses a common vocabulary for fields. Translators map these types to the representations supported by a target CMS. This page is an explanatory lookup guide; the [specification](/spec/1.2.0/) and [model schema](/schemas/1.2.0/model.schema.json) are the authoritative rules.

## Type lookup

| Type | Intended value | Type-specific property or consideration |
| :--- | :--- | :--- |
| `string` | Short plain text | Character limits and regular-expression constraints |
| `text` | Longer plain text | Character limits; no rich-text formatting |
| `number` | Numeric value | Minimum, maximum and integer-only constraints |
| `boolean` | True or false | A boolean default |
| `date` | Calendar date | Date-only meaning |
| `datetime` | Date and time | Agree timezone handling during translation |
| `slug` | URL-safe identifier | URL and uniqueness conventions belong to the implementation |
| `enum` | One allowed string | `values` lists the allowed options |
| `richText` | Formatted editorial content | `richTextConfig` describes allowed capabilities |
| `asset` | File or media reference | MIME type, size and dimension constraints |
| `json` | Arbitrary structured data | Less specific structure; use deliberately |
| `object` | Embedded model structure | `objectType` identifies the object model |
| `reference` | Relationship to another model | `targets` identifies permitted model IDs |

## Shared properties

| Property | Type | Use |
| :--- | :--- | :--- |
| `id` | string | Stable field identifier; required by the model schema |
| `type` | string | One canonical field type; required by the model schema |
| `name` | string | Human-readable field label |
| `description` | string | Explain the field’s purpose |
| `required` | boolean | Explicit requiredness; manifest defaults may apply when omitted |
| `localisation` | boolean | Intended localisation behaviour |
| `list` | boolean | Canonical repeatability flag for any field type |
| `default` | any | Intended default value; meaningful values depend on the field type |
| `validations` | object | Declared constraints; translator conventions still matter |
| `editorial` | object | Help text, labels and preview metadata |
| `translationHints` | object | Guidance for platform-specific interpretation |

## Objects and references

An `object` embeds values following a named model structure. A `reference` points to a model with separate identity. See [relationships and composition](/docs/concepts/relationships/) for ownership and lifecycle considerations.

| Property | Applies to | Meaning |
| :--- | :--- | :--- |
| `objectType` | `object` | ID of the object model that defines the embedded structure |
| `targets` | `reference` | Allowed target model IDs |
| `relation.ownership` | `reference` | Relationship intent: `linked` or `contained` |
| `relation.ordered` | Repeatable reference | Whether the sequence matters |
| `relation.uniqueItems` | Repeatable reference | Whether target references must be unique |
| `relation.minItems` | Repeatable reference | Minimum permitted item count |
| `relation.maxItems` | Repeatable reference | Maximum permitted item count |

Use `list` for repeatability in 1.2.0. `relation.cardinality` is a legacy compatibility option. Contradictory explicit values are invalid; see the [specification](/spec/1.2.0/) for the compatibility rules.

## Rich-text capabilities

`richTextConfig` describes an intended capability envelope. Its tokens are translator-recognised allowlists, rather than a promise that every editor provides the same controls.

| Property | Purpose |
| :--- | :--- |
| `marks` | Allowed inline formatting capabilities |
| `blocks` | Allowed block structures |
| `embeds` | Allowed asset/reference embeds and reference targets |

If this configuration is omitted, a translator may use the target’s default rich-text capabilities. Unsupported requested capabilities need an explicit translation decision.

## Validation scope

The JSON Schema checks model structure. Model IDs, target existence, object target kinds and other graph rules need semantic checks across the model set. Validating actual authored content is a separate concern.

Some validation conventions are intentionally open. In particular, agree file-size units and image-dimension structures with your translator. A structurally valid model still needs an editorial and implementation review.

[Read the validation guide](/docs/guides/validation/) or [download the current schema](/schemas/1.2.0/model.schema.json).

<div class="source-note">Website-owned reference explanation for CMMF 1.2.0. Source: <a href="https://github.com/headless-company/content-model-master-format/blob/32604441aff09a6dbfe2361e97078af5263fd321/docs/canonical-types.md">canonical type guide at 32604441</a>. <a href="/raw/docs/canonical-types.md">Original Markdown</a>.</div>
