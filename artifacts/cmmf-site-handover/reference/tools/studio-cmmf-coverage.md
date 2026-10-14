# CMMF editor coverage

Checked against the CMMF 1.2.0 specification, canonical-type guide, validation guide and `schemas/model.schema.json` in the neighbouring `headless-company/content-model-master-format` checkout. The vendored schema matches that source. [Upstream repository](https://github.com/headless-company/content-model-master-format).

The palette derives its type list from that schema, and the kind selectors derive their options from the schema's model-kind enum.

## Model kinds

Both add-type buttons open a popout with all five kinds; a kind can also be changed in its inspector: `entry`, `component`, `object`, `taxonomy`, `settings`.

## Field types and controls

Every field has name, description, requiredness, localisation, repeatability (`list`), default, editorial metadata and translation hints. Default values use typed controls; structured defaults have an expandable property/item editor. Stable IDs are shown but remain generated and read only in this iteration.

| CMMF field type | Palette name | Additional controls                                                                      |
| --------------- | ------------ | ---------------------------------------------------------------------------------------- |
| `string`        | Short text   | Minimum/maximum characters, regular expression                                           |
| `text`          | Long text    | Minimum/maximum characters, regular expression                                           |
| `number`        | Number       | Minimum/maximum value, whole numbers only                                                |
| `boolean`       | Boolean      | Boolean default                                                                          |
| `date`          | Date         | Date default                                                                             |
| `datetime`      | Date & time  | Date/time default string; preserves timezone-bearing imported values                     |
| `slug`          | Slug         | Minimum/maximum characters, regular expression                                           |
| `enum`          | Options      | Allowed strings and enum default                                                         |
| `richText`      | Rich text    | Allowed marks, allowed blocks, asset embeds, reference embeds and their targets          |
| `asset`         | Asset        | MIME types, file size, image-dimension properties                                        |
| `json`          | JSON         | Structured default editor                                                                |
| `object`        | Object       | Target object model, structured default                                                  |
| `reference`     | Reference    | Target models, repeatability, ownership, order, unique references, minimum/maximum count |

Any repeatable non-reference field also gets minimum/maximum items and unique-value controls under `validations`. References use `relation` for those constraints; imported bounds in `validations` are recognised and migrated to `relation` when edited, preserving other validation metadata. `list` overrides the legacy `relation.cardinality` alias; contradictory explicit values fail the CMMF schema check.

Changing a field's type clears its previous default and incompatible known constraints. Shared properties and unknown validation metadata are retained. Legacy repeatability is normalised to `list`; reference list bounds migrate to list validations when changing to another repeatable type.

## Intent and metadata

Model inspectors expose kind, description, singleton, localisation, tags, editorial help, label field, preview field selections, governance and translation hints. Field inspectors expose the shared editorial schema (help, label and preview) and translation hints.

Governance and translation hints are intentionally open-ended CMMF objects. The editor uses typed property forms instead of requiring JSON. Additional imported validation rules remain available in an expandable property editor. Imported properties without dedicated controls are retained.

## Specification limits

CMMF's validation object is open-ended: the published specification names the twelve supported keys but deliberately does not formalise every key/type combination in JSON Schema. The editor follows the published category guidance and checks contradictory bounds and invalid item/character counts.

The spec also leaves `dimensions` structure and `fileSize` units unspecified. Dimensions therefore use a typed property editor; file-size units need an agreed translator convention. Rich-text mark/block tokens are also translator-recognised allowlists, not a fixed list invented by the editor. No vendor-specific date, permission, computed-field or workflow constraints are added.
