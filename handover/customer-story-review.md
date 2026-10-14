# Customer Story learning journey

Implemented the accepted next slice in `cmmf-docs-web`: a complete three-model tutorial set, file tutorial, visual route and Studio walkthrough. Website styles and supplied artwork are preserved, including sentence-case eyebrows.

## Pages

- `/docs/get-started/first-model/`: brief → model boundaries → manifest/files → validation → intentional error/repair → Studio → implementation decisions.
- `/docs/get-started/visual-modelling/`: inspect the same set on the canvas, change a constraint and save/export.
- `/examples/customer-story/`: source-generated diagram, relationship table, complete definitions and downloads.
- `/tools/studio/`: import, inspect, edit, validate/export, save/restore layout, and local-storage boundaries; illustrated with screenshots from the verified local run.
- `/examples/` now lists both Customer Story and Article; the canonical Article explanation lives at `/examples/article/`.

The homepage's example and learning link now lead into Customer Story. Navigation and explicit tutorial pagination connect the new pages.

## Model and file ownership

Authored source lives under `examples/customer-story/`: Customer Story links to Customer and optionally embeds Quote. Its three models have twelve fields in total. The pinned upstream snapshot and original handover are unchanged.

The build checks both complete example sets and generates both project ZIPs and Studio model-import JSON. Sources, excerpts, diagrams and downloadable model data share the same definitions. ZIPs contain the complete manifest/models, pinned schema, source/licence evidence, npm lockfile and standalone validation/bundle commands.

Studio imports the JSON model bundle, not the ZIP or manifest. Its YAML export omits the project manifest and validator; the walkthrough explicitly retains them. `npm run bundle` creates a fresh `models.json` after YAML edits, avoiding a stale import snapshot.

## Evidence

- `npm run check`: no errors, warnings or hints.
- `npm run build`: 24 pages; 1,605 internal links/assets/anchors pass. Both ZIPs and import JSON are compared to source files and the schema pin.
- `npm run test:examples`: five meaningful tests cover valid sets, broken references/rich-text embeds, wrong object kind, duplicate IDs, missing editorial fields, contradictory bounds, version mismatches, duplicate YAML keys and paths outside the project.
- System `unzip -t`: no errors in the Customer Story archive.
- Extracted-project `npm ci`, `npm run validate` and `npm run bundle`: pass using the project's own dependencies.
- The documented `customer-missing` target produces exit code 1 and the promised error; restoring the target passes. Regenerated JSON preserves all models.
- Website browser review: 28 combinations across seven pages at 390/1440 px in both themes; original additional widths, keyboard menus, theme persistence, search and exact downloads also pass. The homepage → example → ZIP download → first tutorial → Studio guide journey passes.
- Optional local Studio integration: the website's JSON imports losslessly as three models and two relationships; Summary's limit changes to 200; workspace JSON saves/restores models, positions and routes; exported YAML preserves the edited model data. Its lack of a manifest is verified.
- The original handover still verifies all 239 files and the canonical source pin still verifies all 24 files.

Studio integration used the existing local build at `../cmmf-visual-editor/dist`, with source/documentation evidence at `5cbbe0eb4f88db479c0d451c9ad77adff17172ff`. The editor repository was not modified. Browser state was isolated. This is local compatibility evidence, not certification of a hosted release. The docs build never depends on that adjacent checkout.

Browser results and integration artifacts are under ignored `artifacts/site-review/`. The two published walkthrough images are tracked under `public/images/tutorials/`. They were captured with `scripts/review-studio.mjs` from the same import bundle used by the tutorial; the editor UI artwork was not redrawn.

The existing Starlight 404 duplicate-render warning remains recorded for launch cleanup. Production deployment, other planned guides and editorial review remain separate work. No commit or push was performed.
