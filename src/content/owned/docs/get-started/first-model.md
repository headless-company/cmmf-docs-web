---
title: Create your first model set
description: Turn a Customer Story content brief into three related CMMF models, validate the complete project and take it into Studio.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/get-started/first-model.md
pagination:
  prev:
    label: Why CMMF
    link: /learn/why-cmmf/
  next:
    label: Inspect the model in Studio
    link: /tools/studio/
---

You will work with a small model for customer stories. By the end, you will have a versioned file project, understand its two relationships, validate the complete set and know how to inspect it visually.

You need a text editor and Node 22.12 or newer for the local validator. If you have access to a running Studio, you can [follow the model visually](/docs/get-started/visual-modelling/) in your browser without installing that validator.

## 1. Agree what the content needs to do

Use this brief:

- Explain a customer's challenge, the response and the resulting outcome.
- Reuse a customer's profile across multiple stories.
- Include an approved quotation when one is available, preserving its attribution and context.
- Provide a short title and summary for finding and presenting the story.

Before choosing a field type, decide which pieces have their own identity. The Customer can be reused and maintained independently. The Quote's values belong to this story. The Customer Story is the main content entry.

## 2. Get a complete file project

[Download the Customer Story project ZIP](/downloads/examples/1.2.0/customer-story.zip) and extract it. Open the extracted folder in your editor. It contains:

```text
manifest.yaml
models/
  customer-story.yaml
  customer.yaml
  quote.yaml
schemas/
  model.schema.json
customer-story.models.json
package.json
package-lock.json
validate.mjs
validation.mjs
bundle.mjs
README.md
SOURCE.md
SCHEMA-LICENSE.md
```

The supplied files give you a working starting point. Read and adapt them as you follow the decisions below. Keep the manifest and all three model files together; importing only the story would leave its targets unresolved.

## 3. Identify the format and model folder

Open `manifest.yaml`:

<!-- example-file: customer-story manifest.yaml -->

`specVersion` is a quoted string and identifies the format these files target. `namespace` identifies this model project; use your own namespace when adapting it for real work. `modelsPath` locates the model files relative to the manifest.

The defaults make omitted requiredness and localisation false. The story's mandatory fields opt in explicitly with `required: true`. The bundled schema and validator target exactly 1.2.0; changing the version string alone does not migrate a model.

## 4. Give the customer a reusable identity

Open `models/customer.yaml`. It is an `entry` with a required name, optional website and optional logo. Its label field is `name`, so an editor or tool can identify a customer with a meaningful value.

A customer's profile can be linked from many stories. Updating its website or logo is a change to that shared customer, rather than a change to every story definition.

[Read the complete Customer definition](/examples/customer-story/#customer). Keep the model ID `customer` stable when changing its display name, because the story's relationship refers to that ID.

## 5. Define a quotation's embedded structure

Open `models/quote.yaml`. Its kind is `object`, with three fields: required text, required attribution and an optional role. The structure can be reused, while each story has its own quote values.

The Quote model does not require every story to have a quote. The story decides whether its `quote` field is required. The inner `required` flags apply when that object is present, subject to enforcement in the content implementation.

[Read the complete Quote definition](/examples/customer-story/#quote).

## 6. Connect the story to those decisions

Open `models/customer-story.yaml`. The first fields describe the title, slug, summary and narrative. Editorial help tells the author what to write, while constraints express expectations such as the title's length.

The relationship fields carry the earlier decisions. This is an **excerpt**, rather than a complete model file:

<!-- example-fields: customer-story customer-story customer,quote -->

`customer` is a single required reference: `targets` contains the Customer model's ID, `list: false` makes it singular, and `ownership: linked` records the relationship intent. A single customer per story still permits that customer to be linked by other stories.

`quote` is an optional embedded object: `objectType` identifies the Quote structure. Its values are part of this story.

[Inspect the full model and relationship diagram](/examples/customer-story/#see-the-relationships).

## 7. Validate the complete set

Open a terminal **in the extracted project folder**. Check `node --version` reports 22.12 or newer, then run:

```sh
npm ci
npm run validate
```

`npm ci` installs the validator's locked dependencies; it does not configure an AI provider or modify a CMS. The first install needs network access. Subsequent validation runs locally using the included schema.

A valid set reports:

```text
Valid CMMF 1.2.0 model set: 3 models. Schema, manifest, IDs, references, editorial fields and constraint bounds pass.
```

This checks model definitions, including references between files. It does not check real story content, permission to use a quotation, or whether your chosen CMS can implement every capability.

## 8. Make and repair one modelling error

In `customer-story.yaml`, temporarily change `targets: [customer]` to `targets: [customer-missing]`. Run `npm run validate` again. The target is structurally a valid string, but the complete-set check reports:

```text
Missing target: customer-story.customer -> customer-missing
```

Restore `targets: [customer]` and rerun validation. This illustrates why validating each file's shape is insufficient: a relationship needs a target that actually exists in the model set.

## 9. Inspect and save the model in Studio

For the unmodified example, download [customer-story.models.json](/downloads/examples/1.2.0/customer-story/customer-story.models.json). It contains the same three models as the supplied YAML. Follow the [Studio walkthrough](/tools/studio/#import-the-complete-model-set) to import the complete set, inspect both relationships and save a workspace backup.

The supplied JSON is a snapshot. If you edit your YAML files, it does not update itself. To inspect your edited set, run `npm run bundle` to produce **models.json** from the validated YAML, then import that new file. The command is included in the project download.

Studio does not import ZIPs or the manifest. Keep this file project as the home for its version and validation setup.

## 10. Record the implementation choices

For each relationship or capability, record what your target system will do:

| Intent | Decision to record |
| --- | --- |
| One required customer | The CMS relationship representation and how requiredness is enforced |
| Embedded optional quote | Whether the CMS supports an inline group; any alternative representation |
| Limited rich text | Supported marks/blocks and any capabilities lost in translation |
| Readable story URL | Slug uniqueness, routing and migration conventions |
| An approved quotation | The editorial approval process outside this model definition |

These are decisions to make with your implementation team, rather than claims that a CMS adapter has performed the work. [Read about translation](/docs/concepts/translation/).
