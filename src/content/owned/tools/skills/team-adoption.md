---
title: "Team adoption and assurance"
description: "Assess fit, run bounded host trials and distinguish validation from architecture and migration safety."
editUrl: https://github.com/headless-company/cmmf-docs-web/edit/main/src/content/owned/tools/skills/team-adoption.md
---

## Decide whether it fits

| Team need | Fit at this baseline | Evidence still needed locally |
| --- | --- | --- |
| Portable model authoring/review within an existing coding host | Implemented skill workflow | Host discovery, real modelling quality and team conventions trial |
| Deterministic schema and repository graph checks | Implemented helpers with automated tests | Matching canonical version and coverage of the team's actual model patterns |
| Architecture and editorial guidance | Skill reasoning with project context | Content-team review and real requirements; not guaranteed by helper tests |
| Derived catalogues/relationship diagrams | Implemented generator plus skill explanation | Accuracy/scope review and added detailed field constraints |
| Model evolution and migration planning | Implemented diff and planning workflow | Content sampling, consumer inventory, backfill feasibility and rollout ownership |
| Stored entry validation or live content migration | Not implemented | Separate tooling and operational implementation |
| CMS import/export/translation | Not implemented | Separate target selection and translation work |
| Universal host support, native plugins or marketplace install | Not established/implemented | Host-specific evaluations or future packaging |
| Experimental 1.3 beta helper support | Not supported at this baseline | Deliberate helper/source support work and fixtures before claiming compatibility |

A team can run the helper checks independently of an agent. Staff members should require evidence at four separate levels: (1) executable format/graph validity, (2) compliance with team conventions, (3) modelling/editorial suitability, and (4) content/consumer migration safety where relevant. None substitutes for the others.

## Trial protocol

Run in a disposable repository using one complete built package at a time, matching the [evaluation cases](https://github.com/headless-company/cmmf-skills/blob/68ec28d3993eb08298ebf9a896f6a9d51b425bf0/evals/core-workflows.md). Record host product/surface/version, model/version, skill source SHA and manifest hashes, canonical source/version/hashes, prompt/inputs, artefacts, commands, diagnostics and verdict. Mark each intended host **not run**, **pass**, **fail** or **blocked** with reason; helper execution is not a substitute for host discovery.

| Evaluation | Observable pass criteria |
| --- | --- |
| Discover: customer stories, shared customers, unresolved quote ownership | Reusable customer identity, traced decisions, meaningful ownership question, no invented CMS config |
| Author: Article/shared Authors/embedded SEO | Correct versioned manifest, complete target set, reference versus embedding matches intent, actual whole-set validation |
| Validate: malformed YAML, duplicate IDs, missing reference and rich-text target | Aggregated located findings; incomplete graph disclosed; no invented repairs |
| Review: unclear ownership, weak editorial identification, indiscriminate requiredness | Grounded prioritised consequences; validity distinguished from advice; no unauthorised edits |
| Document: validated Article/Author/SEO | Actual IDs/kinds, correct edges/defaults/ownership/repeatability, source and validation evidence |
| Evolve: extract reusable Customers from embedded details | Concrete proposal, mappings/deduplication/backfill, dependent and consumer analysis, no content-migrated claim |
| Team convention requiring `internal_name` | Agent finds/applies or reports the rule; generic schema validation is not claimed to enforce arbitrary prose |
| Existing legacy and explicit historical source | Exact version respected; no silent manifest upgrade or mixed schema/spec |
| Network failure with/without exact cache | Identified cached source used honestly or blocked source checks stated; no invented freshness |
| Missing Node or unsupported helper version | Clear limitation and genuine alternative evidence if available; no full validation claim |
| Existing unrelated working changes | Preserved; snapshots/diffs do not reset or overwrite user work |

Host checks are pending in the repository's recorded evaluation status. Publish actual trial results separately with dates and artefacts before expanding support claims. A single successful prompt is a bounded observation, not universal certification.

## Release and model-change checks

For suite maintainers, `npm ci` with the pinned runtime and `npm run check` are the normal release preparation checks. Dependency policy requires a reviewed lockfile, ignored install scripts, seven-day minimum package age and the existing axios ban. The build clears stale compiled agent/provider entrypoints; packaging verifies all six independent runtimes. Do not bypass policy in public onboarding.

For a model repository, a CI job can run the built/installed validator against a pinned matching canonical source, retain JSON/exit evidence, and fail invalid changes. Keep canonical source retrieval/refresh explicit so a routine build does not depend on moving upstream. If diff is included, distinguish invalidity from reviewed breaking/uncertain results; the team must decide how an intentional migration is reviewed. Convention rules need their own enforcement where required. No such target-project CI pipeline is installed automatically by copying a skill.

Before accepting a modelling change, require: scope and decisions match the brief; retained IDs and version are intentional; complete validation passed or the exact limitation is accepted; diff/backfill/dependent implications are understood; generated docs match the accepted YAML; any content migration has separate evidence and an owner. Do not impose a new mandatory approval ritual on ordinary local edits already requested by the user.

## Related guidance

[Installation](/tools/skills/) · [Sources and versions](/tools/skills/sources-and-versions/) · [Worked journeys](/tools/skills/workflows/) · [Team acceptance](/tools/skills/team-adoption/)
