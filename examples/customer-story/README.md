# Customer Story tutorial model

Three CMMF 1.2.0 model definitions: Customer Story links to a reusable Customer and embeds an optional Quote. These files define content structure; they do not contain customer records or a finished story.

## Validate the file project

Use Node 22.12 or newer. In this extracted folder:

```sh
npm ci
npm run validate
```

The validator checks the complete set against the included pinned schema and checks manifest/version, IDs, targets, object kinds, editorial field references and constraint bounds. It does not check real content instances, factual claims, permission to use a quote, or a CMS mapping.

After editing the YAML models, run `npm run bundle` to create an updated `models.json` for Studio import. The bundled `customer-story.models.json` is the original example snapshot and does not update itself.

## Open the set in Studio

Use `customer-story.models.json` as a single model-import file. In Studio, back up your existing board with **Export → Save workspace**, then choose **Import → Connections → Choose file** and select that JSON file.

Studio does not import this ZIP or a folder of YAML files. The JSON bundle carries all three models, but is not a Studio workspace and contains no saved layout. Studio does not import the manifest's project settings.

Export **Save workspace** for model data plus layout. Export **CMMF models** for individual YAML files. Keep this project's manifest, validator and schema alongside exported models; Studio's model ZIP does not include them.

## Learn and inspect

- Tutorial: https://cmmf.dev/docs/get-started/first-model/
- Studio walkthrough: https://cmmf.dev/tools/studio/
- Model rationale: https://cmmf.dev/examples/customer-story/

`SOURCE.md` identifies the exact schema version and source revision. `SCHEMA-LICENSE.md` applies to the bundled upstream schema. Tutorial models and validation helpers are website-owned; no blanket licence is assigned to the whole website by that schema licence.
