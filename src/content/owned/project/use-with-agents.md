---
title: Use CMMF with an agent
description: Find the matching specification, schema, examples and modelling workflows for your project.
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/project/use-with-agents.md
---

Start with what your content needs to do. A Customer can appear in several Customer Stories; a Quote can belong inside one story. Agree those decisions before asking an agent to describe fields or translate them into a CMS.

Give your agent this page or the [retrieval index](/llms.txt). It links to readable Markdown, exact-version sources and complete examples. A link gives the agent a starting point; its host must support fetching URLs or reading downloaded files.

## Choose the format version first

For a new project, use the current stable edition unless you explicitly choose an experimental release. For an existing project, respect its manifest and never silently upgrade it. Numeric `specVersion: 1` means the original legacy format, not the latest 1.x version.

- [Stable 1.2.0 source index](/versions/1.2.0/llms.txt) · [documentation pack](/downloads/documentation/1.2.0.zip)
- [Experimental 1.3.0-beta.1 source index](/versions/1.3.0-beta.1/llms.txt) · [documentation pack](/downloads/documentation/1.3.0-beta.1.zip)
- [Historical 1.1.0 specification](/spec/1.1.0/): specification archive only; the current schema does not establish validation for it.

Each documentation pack contains edition-specific explanations, exact upstream source files, a manifest of SHA-256 checksums and source revisions. It is a reference bundle, not an installed validator or executable agent. Read its README for source and licence boundaries.

## Give the agent a reading order

1. Read the matching documentation overview and model-kind explanation.
2. Use the exact-version specification for normative rules and the schema for structural constraints. Tutorials explain those rules; they do not override them.
3. Read the complete Customer Story example to understand reusable Customer and story-specific Quote, then inspect the canonical Article set.
4. Validate the complete model set, including reference targets and object kinds, using the matching documented validator.
5. Record how each modelling decision will be implemented in the target CMS. A valid model does not prove that a translation preserves every requirement.

Keep schema checks, whole-model graph checks, project conventions, editorial design review and content-instance validation distinct. Passing one does not establish the others.

## Add modelling workflows when useful

[CMMF Skills](/tools/skills/) supplies Discover, Author, Validate, Review, Document and Evolve guidance for your existing host. The host supplies reasoning, authentication, permissions and file editing. Read [sources and compatibility](/tools/skills/sources-and-versions/) before installation.

Skills helpers recognise legacy `1`, `1.1.0` and `1.2.0`; they do not support experimental 1.3 beta semantics. Beta examples have a separate matching validator. Studio's walkthrough covers stable 1.2.0; beta compatibility is not established.

[Shared tools reference pack](/downloads/documentation/shared-tools.zip) contains the website's tool guidance separately from format editions. It is not an installable Skills package or evidence of host certification.

## A starting prompt

```text
Help me model content using CMMF. Start at https://cmmf.dev/llms.txt.
Inspect the project's manifest before choosing sources. For a new project,
use current stable unless I explicitly request an experimental edition.
Read the matching specification, schema and complete examples.
Ask about content intent and reuse before proposing model structure.
Preserve the declared version. Identify unsupported tooling explicitly.
Validate the complete set and distinguish model checks from content checks.
Cite the exact-version sources used and record CMS translation decisions.
```

## Check the result

Ask the agent to identify the version and source revision it used, explain why Customer is referenced while Quote is embedded, and show the complete-set validation result. Test an unresolved reference deliberately. For beta work, ask it to explain why stable Skills helper success would not establish beta validity.

These are evaluation tasks for your host, not a claim that all agents have passed them. Fetching documentation, installing Skills and following guidance depend on the host's capabilities and permissions.
