<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/brand/assets/studio-horizontal-gradient-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/brand/assets/studio-horizontal-gradient-light.svg">
  <img alt="CMMF Studio" src="docs/brand/assets/studio-horizontal-gradient-light.svg" width="550">
</picture>

# CMMF Studio

A browser-based visual editor for CMMF content models. Built with React, TypeScript, Vite and React Flow. No backend is required.

Studio uses the CMMF identity, with Source Sans 3 for interface text and Quattrocento for dedicated reading content. See [branding integration](docs/branding.md) for the font roles and asset locations. The full brand workspace is maintained separately from this application.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Use the editor

- Click **Content type** in the library or the canvas **+** to choose a kind from the popout. You can also drag an entry from the library, or drag a specific kind from the popout. New types find nearby free space and are brought into view.
- Drag coloured field types into a container. Click a palette field to add it to the selected type.
- Edit names directly on the canvas. IDs stay stable when labels change.
- Move types by their headers. Use field grips to reorder fields or move them between types.
- Drag a reference field's purple right handle to another type's left handle. Multiple targets are supported. Object fields also connect visually.
- Click a relationship to edit it. Labels show the permitted count at the destination (`0..1`, `1..1`, `0..*`, or explicit bounds). These describe field repeatability, not the inverse cardinality of the target.
- Open the sliders on a type or field for details. Multiple floating panels can stay open. Drag their title bars to move them.
- Inspectors cover purpose, all five model kinds, required/localised/list flags, defaults, reference targets, ownership, bounds, ordering, enum options, text/number/list/asset constraints, rich-text capabilities, editorial previews, governance and translation hints using forms. See [CMMF coverage](docs/cmmf-coverage.md).
- Select nodes or edges and press Delete/Backspace to remove them. Undo/redo is available in the toolbar and with Ctrl/⌘ Z / Shift Ctrl/⌘ Z. Escape closes detail panels. V selects; H pans.
- Use **Focus a content type** to jump to a model. Clicking a type on the canvas updates that same selector. Focus highlights its outgoing links, keeps incoming links visible and fades unrelated types. Hover a reference/object field to highlight its target types and exact connections. The minimap highlights offscreen targets too. Select **All types** or click blank canvas to clear focus.
- Toggle light/dark mode with the sun/moon button in the header. Your choice persists on this device; the first visit follows the system preference.
- Use the sidebar **Grid** and **Connections** auto-layout buttons. Both arrange related types together and avoid overlapping containers. Layout changes are undoable. **Fit whole model** includes outer connection routes.
- Use **Canvas guide** to load the customer-story or large ecommerce example, or start an empty workspace. These actions can be undone. The [ecommerce example](examples/README.md) has 34 models and 201 fields, with its source rationale documented.

## Save and exchange files

Changes save in this browser's local storage. There is no account, cloud storage or collaboration service. Export regular workspace backups; clearing browser data removes the local copy. A storage error is shown in the header if saving fails.

**Export → Save workspace** downloads `.cmmf.json`, including models, positions, the applied layout and generated routes. **Import** offers **Connections**, **Grid**, or **Keep saved positions** before choosing a file. Choose **Keep saved positions** for an exact workspace layout round trip. A missing/incomplete layout is arranged by relationships instead. JSON and YAML imports also accept individual CMMF models or a `{ models: [...] }` bundle. Import replaces the current board and can be undone. Malformed models are rejected before replacement.

**Export → CMMF models** downloads a ZIP containing one YAML file per model. Layout and Studio-specific data do not appear in these files. Each model is checked against the vendored CMMF 1.2.0 schema, with extra checks for model/field ID collisions, unresolved targets, empty enum options and contradictory bounds. Fix issues before exporting. ZIP import is not implemented; use workspace JSON for a complete round trip.

The schema in `src/model.schema.json` is copied from the neighbouring `headless-company/content-model-master-format` checkout's `schemas/model.schema.json` (CMMF 1.2.0). Source: https://github.com/headless-company/content-model-master-format. CMMF's canonical `list` flag drives repeatability; legacy `relation.cardinality` is read as a fallback and removed when repeatability is edited. Extra imported metadata is retained even where this first version has no dedicated controls.

## Build and host

```sh
npm run build
npm run preview
```

Host the generated `dist/` directory on any static web host. All modelling and file operations run in the browser. Fonts are bundled locally. This version uses the host root path; configure Vite's `base` for a subdirectory deployment. No deployment or external service has been configured.

## Verify

```sh
npm test
npx playwright install chromium
npm run dev
# In another terminal:
npm run test:browser
```

Unit tests cover CMMF validation, import boundaries, deterministic graph layouts, collision-free placement, cycles, disconnected types and routed lines avoiding unrelated containers. Browser tests cover field/container drag payloads, reordering, multiple movable inspectors, reference connections, cardinality changes, deletion, local persistence, YAML ZIP export, import layout choices, dark-mode persistence, kind popouts, focus synchronization, field-hover highlights and large-board layout undo. Screenshots are written to `artifacts/`.

## Layout behaviour

**Grid** starts from relationship neighbourhoods, then reduces link lengths while packing readable rows. **Connections** uses [ELK's layered layout](https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html) with generous spacing, field-level ports, crossing reduction and orthogonal routes around containers. The engine is loaded on demand. Reference fields and object composition supply the displayed graph; rich-text embed capabilities remain inspector metadata.

Measurements from the canvas determine container sizes; imports use field-count estimates until rendered. The algorithms preserve model data. Dense cyclic models can still have long return connections: these are not perfect crossing-free drawings. Focus, hover, the minimap and zoom help inspect neighbourhoods.

Generated routes are saved with workspaces. Moving containers or changing the graph structure clears routes so stale paths are not displayed. Click **Connections** to regenerate them. Layout metadata and theme preferences are excluded from CMMF YAML export.

## First-version boundaries

Desktop pointer interaction is the primary target. Palette buttons provide a click alternative to dragging. This is a local single-user editor. There is no live multiplayer, CMS adapter, migration tool, authentication or remote persistence. Stable IDs are currently generated and read only. Unknown imported metadata is preserved, and open-ended metadata uses typed property forms. Asset validation conventions still need agreement with a translator; see the coverage notes. Model validation checks schema and direct references, rather than making semantic or platform-specific judgements about your model.
