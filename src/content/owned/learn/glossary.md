---
title: Content modelling glossary
description: The terms used in CMMF, explained through a Customer Story and its reusable customer profile.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/learn/glossary.md
---

A customer story needs a title, an account of the outcome, a customer profile and sometimes a quote. These terms describe those pieces and the decisions behind them.

## Content model

A definition of a kind of content: its fields, constraints, relationships and editorial intent. **Customer Story** is a model; a particular story about a particular customer is a content instance. CMMF describes models. It does not store the published stories.

## Model set and manifest

A model set contains the definitions needed to understand a project together. Its `manifest.yaml` declares the format version, namespace, model directory and supported defaults. The [Customer Story set](/examples/customer-story/) includes Customer Story, Customer and Quote; checking only the story file cannot resolve its targets.

## Field and canonical type

A field is one named part of a model, such as `title` or `customer`. Its canonical type describes the value it carries: `string`, `richText`, `reference` and so on. The [type reference](/docs/reference/canonical-types/) lists the exact identifiers.

## Model kind

The role of a model. An `entry` stands alone; an `object` is embedded; a `component` is a reusable composable block; a `taxonomy` classifies content; `settings` describes configuration. [Model kinds](/docs/concepts/model-kinds/) explain these distinctions. A kind does not prescribe a CMS storage mechanism.

## Reference and target

A reference links a field to content described by another model. A Customer Story's `customer` field targets the Customer model. The profile can be reused across stories. Targets name model IDs, rather than particular content records.

## Object and composition

An object groups fields inside another model. The Quote belongs to its story and travels with it. Its field uses `objectType: quote`. See [embed or reference](/docs/guides/embed-or-reference/) for the decision behind this choice.

## Repeatability and cardinality

Repeatability means a field can contain a list: use `list: true` in CMMF 1.2.0. Cardinality describes how many items a relationship permits. Older reference fields use `relation.cardinality`; [migration guidance](/docs/guides/migrate-to-1-2/) explains the compatibility rules. Requiredness and item limits are separate decisions.

## Ownership

The intended lifecycle of a relationship. `linked` describes independently reusable content; `contained` expresses content that belongs with its container. A contained reference still needs a translation decision about how a particular CMS represents it.

## Validation

A check with a defined scope. Schema validation checks a model's structure; semantic checks inspect the complete graph; content-instance validation checks real values against constraints. See [validation](/docs/guides/validation/).

## Editorial intent and governance

Editorial metadata helps people use the model: help text, labels and preview fields. Governance records ownership and lifecycle information. Neither establishes CMS permissions or an approval workflow. See [editorial intent](/docs/guides/editorial-intent/).

## Translation and decisions log

Translation maps a CMMF model to a target platform. The decisions log records mappings, compromises and unsupported features. It makes implementation choices reviewable alongside the portable model. The [translation contract](/spec/1.2.0/translation-contract/) describes the expected record.
