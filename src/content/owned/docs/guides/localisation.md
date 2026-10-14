---
title: Model what needs localisation
description: Identify which content varies by locale and keep fallback, publishing and storage choices explicit.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/docs/guides/localisation.md
---

A customer story may need translated titles and narrative, while a customer's company name stays the same. A regional website address or approved quote may vary for reasons beyond language. Establish those differences with the content team first.

## Record the intent

CMMF 1.2.0 supports boolean `localisation` on models and fields, plus a manifest default. The Customer Story tutorial sets the manifest default to `false`; it does not claim to be a multilingual example.

The following illustrates a possible field change inside that project:

```yaml title="customer-story.yaml — field excerpt"
- id: title
  name: Title
  type: string
  required: true
  localisation: true
  validations:
    minLength: 5
    maxLength: 100
```

An omitted value and an explicit `false` should remain distinguishable when resolving project defaults. The specification does not define a complete model-to-field inheritance algorithm. Document how the translator resolves model settings, field settings and manifest defaults; make field intent explicit where ambiguity would change behaviour.

## Agree the implementation policy

| Decision | Example question |
| --- | --- |
| Locale set | Which languages and regional variants are supported? |
| Requiredness | Must every locale have a title before publication? |
| Fallback | May untranslated content use a default locale? |
| Relationships | Is the same customer shared, or does the locale select a different record? |
| Slugs | Are paths translated, and where must they be unique? |
| Publication | Are locales published together or independently? |
| Assets and quotes | Are rights and approval valid in every region? |

The boolean records localisation intent. It does not define locale codes, fallback chains, translation workflows or the shape of localised content values.

## Review more than the flag

Changing localisation can alter storage, delivery APIs and existing content. Record those choices in a [translation decisions log](/docs/concepts/translation/), test real content in the target implementation and review migration impact. Model validation confirms structure and relationships; it cannot establish that all translations are present or approved.
