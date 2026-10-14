# Skills-first implementation progress

Date: 2026-10-13. This is the first development milestone, not a completed cross-host release.

## Baseline

The pre-existing worktree included changes to README, project guide, prompt, repository discovery/tests, types, and a new prompt test. Those changes were retained. Project instruction discovery was extracted into a shared module without removing its existing conventions or tests.

The original TypeScript build passed. The test runner failed before executing tests because installed esbuild was darwin-arm64 while the active Node process was x64. The test runner now compiles with TypeScript and executes the emitted tests directly through Node. Dependency verification also uses compiled JavaScript. All 12 pre-existing tests pass through this path.

## Delivered

- A separate provider-free CLI with `inspect`, `source`, `validate`, `diff`, and `document`; human-readable/JSON diagnostics and explicit exit codes.
- Raw/tolerant model loading, aggregated parse failures, data preservation, repository path containment, and scoped project convention discovery.
- Whole-repository validation for duplicate IDs, missing relationship/object/rich-text embed targets, object target kind, and editorial label fields, alongside canonical schema validation.
- Manifest/source version matching including explicit legacy handling. An existing numeric legacy manifest cannot accidentally pass against the current 1.2.0 schema.
- Canonical source retrieval: latest/current resolution, historical schema snapshots, per-revision cache, offline reuse, source hashes, and detection of altered cached spec/schema files. The skill instructions use this retrieval as part of the normal workflow.
- Semantic diff with effective manifest defaults, repeatability aliases, additive/removed targets and enum values, ownership/structure changes, uncertain constraint/metadata changes, and transitive dependent models.
- Generated Markdown catalogues and Mermaid diagrams from the validated graph.
- Six core skill sources with portable metadata, scoped workflows, and maintained shared references.
- Independent skill packages with local JavaScript runtime/dependencies/license files, release file hashes, and a complete-suite archive. Installed usage needs no npm installation or additional LLM API keys.
- CI checks for package assembly and isolated skill execution, plus a behavioural evaluation checklist.

## Verification

- `npm run check`: build, 18 tests, and dependency-policy verification pass. The six new integration tests include source history/cache behaviour, malformed/invalid repositories, rich-text/cyclic references, path escapes, raw extension preservation, and semantic impact analysis.
- `npm run skills:package` and `npm run skills:verify`: package six skills, check metadata/references/hashes, and run inspect/validate/document/diff with each installed separately in a temporary directory outside this checkout. Provider keys, source path variables, and `NODE_PATH` are removed during those checks.
- Local canonical integration: four example models validate with no diagnostics against the clean sibling CMMF 1.2.0 source at `32604441aff09a6dbfe2361e97078af5263fd321`.
- Live canonical fetch: latest/current resolves to CMMF 1.2.0 at `6d501cd51a16d07522d367866d6c6ab40236d82d`. The same example repository validates against that fetched schema with no diagnostics. The live network check required sandbox network escalation; no credentials were added.
- The bundled skill-creator Python validator could not run because PyYAML is absent. The standalone package verifier checks actual YAML frontmatter, names/descriptions, local links, hashes, and executable behaviour using the repository's reviewed YAML dependency.

Build products are under ignored `release/`; source snapshots and test compilation are under ignored `.tmp/`. No global skills were installed and no existing model repository was edited during verification.

## Remaining gates

Phase 0/1 tooling foundations and a first phase 2/3 skill/package implementation are delivered. Release gates remain:

1. Installed-skill discovery and realistic model-authoring/review behaviour in Codex, Claude Code, and GitHub Copilot. Automated execution of helper files does not establish these host behaviours.
2. Broader canonical historical-format fixtures and modelling trials; historical retrieval and legacy handling currently have synthetic integration coverage, while canonical 1.2.0 has a live integration check.
3. Refinement of quality guidance and documentation views from those trials, including any required native host metadata/plugin packaging.
4. Removal of the old provider adapters, interactive agent, and obsolete configuration/tests once replacement workflows are evidenced. The legacy generation path still uses its old strict types and version limitations; use the new tools/skills for current CMMF.
5. CMS import/translation target selection and later migration/fixture/board capabilities from the plan.

Suggested next slice: install the packaged author/validate/review skills in a disposable target project, execute the recorded realistic cases through each host available to the user, and use the resulting artefacts to refine the skills before retiring the legacy agent.
