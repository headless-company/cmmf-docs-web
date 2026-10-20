> Exported handover context. For the current repository and implementation state, use [implementation-plan.md](implementation-plan.md) and [page-inventory.md](page-inventory.md).

# Separate repositories, explicit source ownership

Recommendation: create `cmmf-site` separately. This supersedes the first plan's suggestion to put the application under `site/` in the format repository.

| Repository | Owns |
| --- | --- |
| content-model-master-format | Normative specs, translation contracts, machine schemas, small reference example sets, release history and essential contributor guidance. |
| cmmf-site | Explanation/learning content, tutorial examples, presentation/layout/components, navigation, search, downloadable presentation of upstream assets and deployment. |
| cmmf-visual-editor | Studio application and its release/deployment lifecycle. |
| cmmf-skills | Agent skills, deterministic helpers and their release evidence. |
| Private brand asset source | Canonical artwork, tokens and brand guidelines. |

Separation suits the ecosystem: site releases and frontend dependencies need not change the format's repository or imply a format release. The website can evolve its explanations while agents and implementers continue to use a small authoritative source repository.

The cost is keeping imported material current. Handle that with a tracked source lock and read-only vendored snapshot, not a live fetch of `main` on every build. This pack includes the current docs so the first implementation is self-contained and works offline. The sync helper can reconstruct the canonical snapshot from the exact commit.

Existing explanatory docs remain upstream during this handover. Initially render them from the snapshot. If an article is adapted substantially, the site owns that adaptation and stops also rendering the imported version at a competing route. Once the site is useful, a separate upstream change can replace superseded learning docs with site links while retaining format-critical reference context.

Normative files stay upstream. Do not edit vendored specifications or schemas to make a website feature work. Changes go upstream first, then arrive in the site through a reviewed pin update. Tutorial-specific model sets belong to the site; canonical examples remain upstream and should be embedded/downloaded from the snapshot rather than retyped.

One repository would be simpler for atomic spec-and-doc changes. Given the user's preference for a focused format repo and independent tools/brand repos already present, the explicit pinned-source model is the better fit.
