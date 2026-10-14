---
title: Organise a model project
description: Keep a manifest alongside the model definitions for your own content project.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/get-started/project-structure.md
---

A model project contains your manifest and models. You do not need to copy the entire CMMF specification repository into it.

```text
my-content-model/
  manifest.yaml
  models/
    article.yaml
    person.yaml
    seo-metadata.yaml
    page.yaml
```

The manifest identifies the format version and namespace, locates model files and supplies supported defaults. The canonical example uses:

<!-- canonical-file: examples/manifest.yaml -->

Use a namespace for your own project. Keep `specVersion` explicit and use a schema and tools that support that version. `modelsPath` is relative to the manifest.

## Put each model in a file

Each model has a stable `id`, a name, a kind and its fields. Relationship targets refer to model IDs, so keep identifiers stable when changing labels.

Version the complete model set together. A change to a target model can affect other models that reference or embed it. Validate the set after editing, rather than checking only the file you touched.

## Keep source ownership clear

The canonical CMMF repository owns the specifications, schema and reference examples. Your project owns its model definitions and modelling decisions. This website owns its tutorials and explanatory adaptations.

Start from the [complete Article example](/examples/), then read the [manifest rules in the specification](/spec/1.2.0/#4-manifest-specification).
