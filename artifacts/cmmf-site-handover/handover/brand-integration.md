# Brand integration and included assets

Read the [usage rules](../brand/guide/usage.md), [motion guidelines](../brand/guide/motion.md), [PDF brand book](../brand/guide/cmmf-brand-guide.pdf), and [tokens](../brand/tokens/cmmf.tokens.json).

`brand/` is deliberately smaller than the complete original delivery kit, but includes all logo masters, WOFF/WOFF2 fonts and licences, CSS/JSON tokens, favicon/icon sets for all three identities, supporting icons, SVG diagonal graphics, the documentation design study and the self-contained motion studies/runtime. It excludes source builders, unrelated print/raster studies and prior design rounds.

Use `brand/logos/cmmf/cmmf-horizontal-gradient-{light,dark}.svg` for the persistent header. Use the expanded core signature where it meets the 420 px minimum width; on a narrow screen use the ordinary signature and separate live full-name text. Native asset proportions and clear space are mandatory. Tool logos identify Studio/Generator; the parent site uses the CMMF identity.

Preserve `brand/tokens/` and `brand/fonts/` as sibling directories if using the supplied `brand.css` directly. Alternatively copy them together to the app asset location and import the CSS. `brand.css` supplies font faces and role variables, not a complete Starlight theme: map its variables and role selectors to the actual components and verify loaded fonts. Assets imported into Astro should retain their layout dependencies; public favicon assets need URL updates from the supplied `/brand/` assumptions.

Paper `#F6F7F3` and Ink `#192329` form the surfaces. The parent gradient is `#BA5579` → `#D07748`. Quattrocento carries dedicated reading prose (start at 20/32 px and 55–70 characters per line); Source Sans 3 carries navigation, search, tables, metadata and functional headings; Reem Kufi is for selected large display headings. Use a conventional monospace for code. No synthetic Quattrocento italic.

The documentation application artwork is a design study, not an already implemented page or proof of a working CLI/site feature. Its screenshot and SVG are visual references, not content authority.

Persistent headers should be static. If a deliberate homepage entrance is used, the supplied runtime and grouped SVGs preserve the symbol contour; reduced motion must show the final signature immediately. No replay on every page navigation. Check geometry, both themes, small widths, zoom and focus visibility.

The provenance manifest records uncommitted identity v1.2 changes and exact included bytes. Relative links in the two guide Markdown files and one study footer were adjusted for this layout. Brand assets remain under their existing ownership; font OFL files are included. Recheck brand source status only when deliberately updating the bundle.
