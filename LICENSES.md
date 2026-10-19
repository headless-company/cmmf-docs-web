# Source licences and provenance

The upstream CMMF snapshot retains its [Apache-2.0 licence](vendor/cmmf/LICENSE.md). Preserve it with redistributed specification, docs, schema and examples.

Reem Kufi, Quattrocento and Source Sans 3 retain their [bundled font licences](brand/fonts/). Preserve the corresponding OFL text files with redistributed fonts.

Generated relationship SVGs embed the supplied Source Sans 3 font and retain its complete bundled OFL text in SVG metadata. The static social preview uses the approved outlined logo and renders text from bundled fonts; its regeneration script is `scripts/render-social.mjs`.

The supplied CMMF artwork comes from the user's branding workspace for the authorised CMMF site work. This handover does not assign a new open-source licence to that artwork, the handover instructions, or tool-documentation snapshots. Decide the new site's licence deliberately rather than copying the format's licence over the entire project.

Exact provenance and file transformations are recorded in `source-provenance.json`. Original guide references and a study footer link were adjusted for the bundled directory layout; logo/font/runtime bytes were not modified. Some upstream tool documents contain their original local paths; use the portable integration instructions here instead of those paths.

`src/components/Search.astro` adapts Starlight 0.42.6's search component to apply an edition filter. Its MIT copyright and permission notice is retained in [licenses/starlight-MIT.txt](licenses/starlight-MIT.txt). The independently pinned beta snapshot in `vendor/cmmf-beta/` retains its own Apache-2.0 licence and upstream source bytes.
