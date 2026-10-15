# Temporarily unpublished material

Studio is being held back until nearer the talk, at the owner's request. Only `src/content/owned/` is copied into the generated content collection; this directory is never published.

To restore the feature in a reviewed change:

1. Move the two Markdown files back to their matching paths under `src/content/owned/` and the screenshots back to `public/images/tutorials/`.
2. Restore their `content-map.json` source paths and implemented statuses, navigation and relevant public explanations from Git history.
3. Restore Studio logo publication in `scripts/prepare-content.mjs` if the restored pages use those assets. Approved originals remain under `brand/`.
4. Remove the release-hold guard in `scripts/check-site.mjs`, restore the corresponding browser journeys and run the full build/browser checks before publishing.

Shared public pages and downloadable project instructions currently describe file-based modelling and CMMF Skills. Complete example JSON bundles remain tool-neutral and validated against the YAML models. The canonical snapshot and supplied brand assets are unchanged.

This hold removes material from the current website output. Existing Git history and older deployment URLs are not erased.
