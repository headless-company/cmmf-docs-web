---
title: Start with the content, keep the intent
description: A shared model gives content designers, architects and developers something concrete to agree on before implementation.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/learn/why-cmmf.md
---

An editorial team wants to publish articles. Every article needs a title, a body and an author. The author should have a reusable profile. Each article also needs its own search metadata.

Those sound like small decisions. Together, they describe how the content will be created, reused and maintained. They are the beginnings of a content model.

## The decisions come before the CMS

A workshop might describe an author as “a person we can reuse across articles”. A CMS implementation might express that as a relationship field, a linked entry or a reference. Another platform may use different names and controls for the same idea.

When the model lives only inside the implementation, its original reasoning becomes harder to find. Was the author linked because their profile needs an independent lifecycle? Or because linking was the easiest control available at the time?

CMMF gives that discussion a portable form. **Content Model Master Format** describes the structure, relationships, constraints and editorial intent of a model in YAML or JSON-compatible data.

## Make two relationships explicit

The Article example makes a useful distinction:

- **Article → Person:** a reference to someone with their own identity. A person can be associated with more than one article.
- **Article → SEO Metadata:** an embedded object. Its values belong inside the article that uses it.

The SEO structure is reusable; the values inside it are specific to each article. Reusing a structure and sharing a content item are different modelling decisions.

In the canonical example, the `author` field uses `type: reference` with `targets: [person]`. The `seo` field uses `type: object` with `objectType: seo-metadata`. Read the [complete example files](/examples/) when you are ready to see how those choices are expressed.

## Carry the reasons with the structure

A useful model tells people more than the type of each field. It can record a description, help for an editor, a label field, governance information and hints for translation.

For example, the Article title is required and has a length constraint. Its editorial preview uses the title, summary and hero image. A developer can see the expected structure; an editorial reviewer can see how the content is intended to be understood and selected.

The model becomes a shared object of discussion. Content designers can assess the authoring experience. Architects can inspect relationships and reuse. Developers can identify where implementation decisions still need making.

## Translate deliberately

CMMF does not make every CMS behave the same way. A target may represent an embedded object as a nested field group or a schema fragment. A rich-text editor may support fewer capabilities than the model requests.

Translation is where those differences are resolved and recorded. A useful decisions log states the intended behaviour, the chosen representation and any compromise. It makes a later review or migration easier because the reasoning survives alongside the implementation.

The [translation concepts](/docs/concepts/translation/) and [translation contract](/spec/1.2.0/translation-contract/) describe that boundary. They do not promise that an adapter already exists for your CMS.

## Choose a way to work

You can maintain model files in Git or use CMMF Skills to assist an agent with modelling and review. Each route works with the same format; the choice depends on the people and the task.

Start with the content need, agree the structure and relationships, then validate the complete model set. Structural validation and relationship checks help catch errors. Whether the model is useful for your editorial team still requires judgement.

- [Create your first Customer Story model set](/docs/get-started/first-model/).
- [Explore the working Article example](/examples/article/).
- [Learn the model kinds](/docs/concepts/model-kinds/).
- [Look up the canonical field types](/docs/reference/canonical-types/).
- [Explore CMMF Skills](/tools/).

<div class="source-note">Website-owned explanation for CMMF 1.2.0. Based on the canonical format and Article example; modelling recommendations remain subject to editorial review.</div>
