---
title: Follow the model visually
description: Inspect the Customer Story example in Studio, make a safe field change and export a workspace backup.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/get-started/visual-modelling.md
pagination:
  prev:
    label: First-model tutorial
    link: /docs/get-started/first-model/
  next:
    label: Studio walkthrough
    link: /tools/studio/
---

You can explore the same three-model example without starting in a text editor. Use a desktop browser for Studio's canvas interactions.

[Open Studio](https://studio.cmmf.dev). If that deployment is unavailable, follow the [local setup instructions](/tools/studio/#open-studio) first, then return here.

## Open the complete set

Download [customer-story.models.json](/downloads/examples/1.2.0/customer-story/customer-story.models.json). In Studio, save any existing board with **Export → Save workspace** before importing. Choose **Import**, select **Connections** for the layout, then choose the JSON file with **Choose file**.

You should see Customer Story, Customer and Quote. This tutorial uses the website's downloaded example; Studio's built-in customer-story demo is a different model and is not a substitute for these files.

## Read the relationships

Follow Customer Story's `customer` field to Customer. It is a required single reference. The `1..1` label describes the number of values allowed in that field, not how many other stories can use that customer.

Follow the `quote` field to Quote. It is an optional object whose values belong inside the story. The Quote's text and attribution fields are required when a quote is present.

Click a relationship or open a field's sliders to inspect its settings. Use **Focus a content type** to concentrate on Customer Story; hover a relationship field to highlight its exact connection.

## Make a small change

Open Summary's field inspector, choose **Rules**, then change **Maximum characters** from 250 to 200. This records a tighter editorial constraint. It does not alter any authored customer stories, because the editor is working with model definitions.

Use Undo to restore the supplied value if you want to return to the original example. Renaming a field changes its display label; its ID stays stable.

## Save both kinds of file

Use **Export → Save workspace** to preserve the current models and canvas layout. For a layout round trip, import that workspace with **Keep saved positions**.

Use **Export → CMMF models** for portable YAML. Extract its ZIP and replace the corresponding files under your project's `models/` folder, retaining `manifest.yaml` and the validator. Run `npm run validate` from that project if you are using the file workflow.

[Continue with the full Studio walkthrough](/tools/studio/) for creating fields, connecting models and understanding local storage and validation boundaries.
