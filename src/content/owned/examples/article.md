---
title: The Article model set
description: Four complete models show reusable authors, embedded SEO metadata and ordered relationships between pages and articles.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/examples/article.md
---

An article links to a reusable Person and embeds SEO Metadata. A Page can link to an ordered list of related Articles. These are model definitions, rather than sample authored content.

## Included models

| Model | Kind | Main relationships |
| :--- | :--- | :--- |
| Article | `entry` | Links to Person; embeds SEO Metadata; permits Person embeds in rich text |
| Person | `entry` | Reusable profile for authorship |
| SEO Metadata | `object` | Embedded structure with article-specific or page-specific values |
| Page | `entry` | Embeds SEO Metadata; links to an ordered list of Articles |

## Download the complete set

[Download the complete Article project ZIP](/downloads/examples/1.2.0/article.zip). It includes the manifest, all four models, the pinned schema, a local validator and a combined JSON model file. After extracting, use Node 22.12+ to run `npm ci` and `npm run validate` in that folder.

Individual canonical files are also available below.

Preserve this structure and download all five files into a model project:

```text
manifest.yaml
models/
  article.yaml
  person.yaml
  seo-metadata.yaml
  page.yaml
```

- [manifest.yaml](/downloads/examples/1.2.0/manifest.yaml)
- [models/article.yaml](/downloads/examples/1.2.0/models/article.yaml)
- [models/person.yaml](/downloads/examples/1.2.0/models/person.yaml)
- [models/seo-metadata.yaml](/downloads/examples/1.2.0/models/seo-metadata.yaml)
- [models/page.yaml](/downloads/examples/1.2.0/models/page.yaml)

The site checks the complete set against the pinned 1.2.0 schema, its manifest version and relationship targets during every production build. These checks do not validate authored content or a particular CMS implementation.

## The manifest

<!-- canonical-file: examples/manifest.yaml -->

## The Article definition

The author is linked because their profile has separate identity. SEO values are embedded because they belong to the article, even though their structure can be reused.

<!-- canonical-file: examples/models/article.yaml -->

## Work with the combined model set

Download [article.models.json](/downloads/examples/1.2.0/article.models.json) to inspect all four model definitions in one JSON file. After editing the YAML, run `npm run bundle` in the extracted project to regenerate `models.json` from the validated model files.
