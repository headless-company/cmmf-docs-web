---
title: Contribute to CMMF
description: Send changes to the repository that owns the format, documentation or tools.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/contributing.md
---

Useful contributions include clearer explanations, reproducible validation failures and examples grounded in a real content need. Start by identifying who owns the change.

## Choose the repository

| Change | Repository |
| --- | --- |
| Format rules, canonical schema or translation contract | [Content Model Master Format](https://github.com/headless-company/content-model-master-format) |
| Tutorials, this website, navigation or presentation | [Documentation website](https://github.com/headless-company/cmmf-docs-web) |
| Agent workflows or deterministic helper behaviour | [CMMF Skills](https://github.com/headless-company/cmmf-skills) |

Each article's edit link points to its owner. Imported specifications retain a source link to the exact pinned revision. Website explanations interpret that source; they do not change its rules.

## Report a useful issue

Include the page or tool, declared CMMF version, expected behaviour and what happened. For model failures, supply a small complete set with every referenced target and the command or steps used. Remove private content, credentials and customer information before sharing it.

For a documentation discrepancy, link both the explanation and the specification section. Distinguish a proposed format change from a correction to an explanation.

## Edit the website locally

Use the Node version in `.nvmrc`, install with `npm ci`, and run `npm run dev`. Site-owned articles live in `src/content/owned/`; tutorial models live in `examples/`. Update `content-map.json` when adding or replacing a route, then run `node scripts/inventory.mjs`.

The `vendor/cmmf/` directory is a read-only snapshot. Normative changes belong upstream; refresh it through `scripts/sync-cmmf.mjs` with an explicit reviewed version and revision. Do not edit generated content or copied public downloads.

Run `npm run check` and `npm run build` before proposing a change. For layout changes, run `npm run test:browser` and inspect the relevant pages on mobile and desktop in both themes. The repository README describes browser setup and source checks.

## Write for the reader

Show the content need before syntax, label excerpts, and offer complete validated examples. Use precise British English and keep claims within verified tool capabilities. Preserve supplied brand geometry, font roles, clear space and licences. Review source ownership and licensing before adding assets or republishing third-party material.
