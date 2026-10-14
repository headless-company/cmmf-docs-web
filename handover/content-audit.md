# Content audit and launch backlog

Canonical source at export: CMMF 1.2.0, with nine explanatory Markdown files including the index, four versioned spec/contract files, one current model schema, and a manifest plus four example models. `content-map.json` identifies initial destinations and authoritative source links.

Reuse existing kinds/types/relationships/validations/translation explanations; add decisions, linked examples and a coherent tutorial order. Adapt the repository-structure article to distinguish a user model project from the format source repository. The visualisation article's future-editor language is stale relative to the current Studio.

Priority new pages, all currently unimplemented:

| Page/group | Purpose |
| --- | --- |
| Home and Learn overview | Explain the problem, modelling intent and ecosystem to a non-specialist. |
| First model, visual and YAML routes | Create a small valid model set, validate it, import it into Studio, save/export it. |
| Glossary | Clarify entry/component/object/reference/taxonomy/settings/manifest/translator terminology. |
| Embed or reference | Explain identity, reuse, ownership and lifecycle tradeoffs. |
| Rich text/localisation/defaults | Show practical authored examples of these options. |
| Editorial/governance metadata | Preserve why fields exist and who owns the model. |
| Error guide | Real invalid inputs with precise corrections. |
| Studio guide | Actual create/edit/connect/import/export flow and local-storage behaviour. |
| Skills guide | Development release, complete skill-directory installation, explicit source version policy. |
| Migration guide | 1.1.0 → 1.2.0 repeatability migration and legacy compatibility. |
| Contribution guidance | Editing source-owned articles, examples, normative files and site content. |

The Customer Story example is a recommended shared teaching narrative, not an included finished model set. The supplied canonical Article/Person/SEO/Page examples are real files; diagrams/snippets should read from those sources. Full example ZIP downloads must retain the manifest and referenced models. Studio does not currently import those ZIPs: use its documented workspace JSON/YAML/model import mechanisms and do not invent a ZIP import tutorial.

Studio has local browser persistence, visual editing and export, but no hosted collaboration, remote persistence or CMS adapter in the documented release. Skills-first work is a development release with host behavioural evaluation still pending. Use `reference/tools/` as evidence; refresh its provenance before changing claims.

The current schema validates model structure, not every semantic rule or actual content instance. There is no separate manifest schema in this snapshot. Complete-example checks need manifest/version handling and graph/ID/reference checks alongside schema validation. Teaching snippets are excerpts, not necessarily standalone valid model documents.

The snapshot includes historical 1.1.0 spec and contract text but only the current schema. Retrieve a matching historical source revision before offering historical schema validation or versioned example bundles. New versions must update content, downloads and recorded source evidence together.
