# Page inventory

Working inventory for `cmmf-docs-web`. Implemented prototype pages need editorial approval before launch. Planned routes are not published as placeholders.

| Route | Page or asset | Owner | Status | Source |
| --- | --- | --- | --- | --- |
| `/docs/` | Documentation | site | implemented-prototype | `src/content/owned/docs/index.md` |
| `/learn/why-cmmf/` | Why CMMF | site | implemented-prototype | `src/content/owned/learn/why-cmmf.md` |
| `/docs/get-started/project-structure/` | Project structure | site | implemented-prototype | `src/content/owned/docs/get-started/project-structure.md` |
| `/docs/concepts/model-kinds/` | Model kinds | upstream | implemented-prototype | `vendor/cmmf/docs/model-kinds.md` |
| `/docs/reference/canonical-types/` | Canonical types | site | implemented-prototype | `src/content/owned/docs/reference/canonical-types.md` |
| `/docs/concepts/relationships/` | Relationships and composition | upstream | implemented-prototype | `vendor/cmmf/docs/relationships.md` |
| `/docs/guides/validation/` | Validation | site | implemented-prototype | `src/content/owned/docs/guides/validation.md` |
| `/docs/concepts/translation/` | Translation | upstream | implemented-prototype | `vendor/cmmf/docs/translation-concepts.md` |
| `/docs/guides/visualisation/` | Visualisation | site | implemented-prototype | `src/content/owned/docs/guides/visualisation.mdx` |
| `/spec/1.2.0/` | CMMF 1.2.0 specification | upstream | implemented-prototype | `vendor/cmmf/spec/cmmf-v1.2.0.md` |
| `/spec/1.2.0/translation-contract/` | Translation contract 1.2.0 | upstream | implemented-prototype | `vendor/cmmf/spec/translation-contract-v1.2.0.md` |
| `/spec/1.1.0/` | CMMF 1.1.0 specification | upstream | implemented-prototype | `vendor/cmmf/spec/cmmf-v1.1.0.md` |
| `/spec/1.1.0/translation-contract/` | Translation contract 1.1.0 | upstream | implemented-prototype | `vendor/cmmf/spec/translation-contract-v1.1.0.md` |
| `/schemas/1.2.0/model.schema.json` | CMMF 1.2.0 model schema | upstream | implemented-prototype | `vendor/cmmf/schemas/model.schema.json` |
| `/changelog/` | Changelog | upstream | implemented-prototype | `vendor/cmmf/CHANGELOG.md` |
| `/project/format-licence/` | Format licence | upstream | implemented-prototype | `vendor/cmmf/LICENSE.md` |
| No public route | Upstream README | upstream | context-only | `vendor/cmmf/README.md` |
| `/downloads/examples/1.2.0/manifest.yaml` | vendor/cmmf/examples/manifest.yaml | upstream | implemented-prototype | `vendor/cmmf/examples/manifest.yaml` |
| `/downloads/examples/1.2.0/models/article.yaml` | vendor/cmmf/examples/models/article.yaml | upstream | implemented-prototype | `vendor/cmmf/examples/models/article.yaml` |
| `/downloads/examples/1.2.0/models/page.yaml` | vendor/cmmf/examples/models/page.yaml | upstream | implemented-prototype | `vendor/cmmf/examples/models/page.yaml` |
| `/downloads/examples/1.2.0/models/person.yaml` | vendor/cmmf/examples/models/person.yaml | upstream | implemented-prototype | `vendor/cmmf/examples/models/person.yaml` |
| `/downloads/examples/1.2.0/models/seo-metadata.yaml` | vendor/cmmf/examples/models/seo-metadata.yaml | upstream | implemented-prototype | `vendor/cmmf/examples/models/seo-metadata.yaml` |
| `/` | Home | site | implemented-prototype | `src/pages/index.astro` |
| `/examples/` | Example model sets | site | implemented-prototype | `src/content/owned/examples/index.md` |
| `/tools/` | Studio and Skills | site | implemented-prototype | `src/content/owned/tools/index.md` |
| `/learn/glossary/` | Glossary | site | implemented-guide | `src/content/owned/learn/glossary.md` |
| `/docs/get-started/first-model/` | Create your first model set | site | implemented-tutorial | `src/content/owned/docs/get-started/first-model.md` |
| `/docs/get-started/visual-modelling/` | Follow the model visually | site | implemented-tutorial | `src/content/owned/docs/get-started/visual-modelling.md` |
| `/docs/guides/embed-or-reference/` | Choosing embeddings and references | site | implemented-guide | `src/content/owned/docs/guides/embed-or-reference.md` |
| `/docs/guides/rich-text/` | Rich-text capabilities | site | implemented-guide | `src/content/owned/docs/guides/rich-text.md` |
| `/docs/guides/localisation/` | Localisation and defaults | site | implemented-guide | `src/content/owned/docs/guides/localisation.md` |
| `/docs/guides/editorial-intent/` | Editorial and governance metadata | site | implemented-guide | `src/content/owned/docs/guides/editorial-intent.md` |
| `/docs/guides/errors/` | Validation errors and fixes | site | implemented-guide | `src/content/owned/docs/guides/errors.md` |
| `/docs/guides/migrate-to-1-2/` | Migration to 1.2.0 | site | implemented-guide | `src/content/owned/docs/guides/migrate-to-1-2.md` |
| `/tools/studio/` | Studio walkthrough | site | implemented-tutorial | `src/content/owned/tools/studio.md` |
| `/tools/skills/` | Skills development-release installation | site | implemented-guide | `src/content/owned/tools/skills.md` |
| `/examples/customer-story/` | Customer Story | site | implemented-tutorial | `src/content/owned/examples/customer-story.mdx` |
| `/contributing/` | Contribution and publishing guidance | site | implemented-guide | `src/content/owned/contributing.md` |
| `/404.html` | Not found | site | implemented-prototype | `src/content/owned/404.md` |
| `/examples/article/` | Article model set | site | implemented-tutorial | `src/content/owned/examples/article.md` |
| `/downloads/examples/1.2.0/customer-story.zip` | Customer Story project ZIP | site | implemented-tutorial | `examples/customer-story/` |
| `/downloads/examples/1.2.0/customer-story/customer-story.models.json` | Customer Story Studio import | site | implemented-tutorial | `examples/customer-story/` |
| `/downloads/examples/1.2.0/article.zip` | Article project ZIP | site | implemented-tutorial | `vendor/cmmf/examples/` |
| `/downloads/examples/1.2.0/article.models.json` | Article Studio import | site | implemented-tutorial | `vendor/cmmf/examples/` |

All planned launch-content routes are implemented, including the glossary, modelling guides, errors/migration, Skills installation and contributing. Customer Story and Article downloads include the pinned schema, portable validator and a bundle command for edited YAML.

Static Mermaid-to-SVG diagrams, social preview, llms.txt with raw site Markdown, specification/contract version links, and automated accessibility checks are implemented. The deployment runbook records Cloudflare settings and external verification. Remaining launch work: editorial/licensing decisions, wider browser and assistive-technology review, committing/pushing the reviewed state, account/DNS setup and real-domain deployment verification.
