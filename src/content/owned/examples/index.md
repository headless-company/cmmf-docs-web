---
title: Example model sets
description: Complete, validated examples with modelling rationale, portable files and Studio import bundles.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/examples/index.md
---

Each example includes all its referenced models and a manifest for CMMF 1.2.0. The ZIP is a file project with a local validator. The separate JSON file imports the same models into Studio.

## Customer Story

Start with a real content need: explain a customer outcome, reuse the customer's profile and keep a quotation in the context of its story.

The set contains **Customer Story**, **Customer** and **Quote**. It is the example used in the [first-model tutorial](/docs/get-started/first-model/) and [Studio walkthrough](/tools/studio/).

[Explore the modelling decisions](/examples/customer-story/) · [Download the complete project](/downloads/examples/1.2.0/customer-story.zip) · [Get the Studio import JSON](/downloads/examples/1.2.0/customer-story/customer-story.models.json)

## Article

The canonical upstream set shows reusable authors, embedded SEO metadata, rich-text reference capabilities and an ordered list of related articles. It contains **Article**, **Person**, **SEO Metadata** and **Page**.

[Explore the canonical example](/examples/article/) · [Download the complete project](/downloads/examples/1.2.0/article.zip) · [Get the Studio import JSON](/downloads/examples/1.2.0/article.models.json)

## Choose the right file

| File | Use |
| --- | --- |
| Complete project ZIP | Extract it to work with YAML, the manifest, a pinned schema and the local validator |
| Model-import JSON | Import all related models into Studio in one operation; no saved layout is included |
| Saved Studio workspace | Create this with **Export → Save workspace** when you want to preserve positions and layout |

Studio does not import the project ZIP or read its manifest. These examples define models rather than actual customer records, articles or quotations. Model validation does not establish that authored content meets the declared constraints.
