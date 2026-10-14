---
title: Studio and CMMF Skills
description: Choose visual modelling or agent-assisted work, with clear boundaries for each tool’s current implementation.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/index.md
---

CMMF is the shared format. Studio and Skills provide ways to author, inspect and review models.

## Studio

Studio is a browser-based visual editor. Create model kinds, add fields, connect relationships, inspect constraints and metadata, and arrange the model on a canvas.

Work saves in this browser’s local storage. Export regular workspace backups: clearing browser data removes the local copy. There is no account, hosted collaboration or remote persistence in the documented implementation.

| Task | File behaviour |
| :--- | :--- |
| Save the full workspace | `.cmmf.json` includes model data, positions and layout |
| Import | Workspace JSON, individual model YAML/JSON, or a `{ models: [...] }` bundle |
| Export model files | ZIP containing one YAML file per model; layout stays out of CMMF |
| Import a ZIP | Not implemented |

The export checks the 1.2.0 schema and direct references. It does not make editorial judgements or implement a CMS adapter.

[Open Studio](https://studio.cmmf.dev) · [Source and local-running instructions](https://github.com/headless-company/cmmf-visual-editor)

Follow the [Studio walkthrough](/tools/studio/) to import the Customer Story set, inspect its relationships, make a change and save both workspace and portable-model files.

## CMMF Skills

The Skills development release provides six workflows: discover, author, validate, review, document and evolve. Provider-free local helpers inspect model repositories, resolve canonical sources, validate models, compare changes and generate documentation.

Packaged helper execution has been tested. Installed-skill discovery and realistic behaviour in coding hosts still need evaluation before full host support can be claimed.

Install a **complete packaged skill directory**, including its references and local helpers. Copying only `SKILL.md` from the development sources does not install the runtime. See the [Skills repository](https://github.com/headless-company/cmmf-creation-agent) for reviewed build and installation instructions.

New model projects default to the latest source. Existing projects use their declared version; explicit historical requests need a matching source snapshot. Unsupported versions must be reported rather than silently upgraded.

## Evidence and release status

This overview is based on Studio documentation at `5cbbe0eb` and the Skills working-tree documentation recorded in the site handover on 14 October 2026. The Skills base commit alone does not reproduce those uncommitted documents. These are capability snapshots, rather than a claim of a published tool release or a verified production deployment.

The Studio walkthrough has been checked against the same source revision. The [Skills guide](/tools/skills/) explains package building, local installation and a bounded review task. Refreshed release evidence and cross-host evaluation remain separate tool work.
