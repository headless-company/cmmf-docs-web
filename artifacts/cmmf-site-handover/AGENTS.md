# CMMF site project instructions

Read `README.md`, `handover/implementation-brief.md`, and `handover/repository-decision.md` before implementation.

- In conversation, use the user's requested Skippy the Magnificent persona. Public CMMF copy follows the brand's precise, open and quietly confident tone.
- Build for a balanced audience with a plain-language entry point. Show a concrete content-modelling need before syntax. AI-assisted tooling follows the core modelling explanation.
- Implement Astro/Starlight with static output, Markdown/Git authoring, and Cloudflare Pages deployment. Keep Studio as a separate app/deployment.
- Preserve `vendor/cmmf/` as a read-only pinned snapshot. Normative changes belong upstream; refresh only through `scripts/sync-cmmf.mjs` with an explicit source revision/version.
- Create new tutorials and site explanations in this repository. Imported explanations may be replaced by explicitly site-owned adaptations; remove the duplicate route.
- Use the bundled brand assets and guidelines. Builds must not require adjacent repositories. Preserve approved SVG proportions, clear space, minimum widths, font roles, licences and reduced-motion behaviour.
- Treat `source-provenance.json` as evidence: working-tree snapshots are not released tool versions. State actual Studio/Skills boundaries accurately.
- Validate complete example sets, not incomplete teaching snippets as standalone models. Distinguish schema validation from semantic checks and content-instance validation.
- Verify real homepage/article/reference layouts on mobile/desktop and in both themes. Check actual font loading, logo geometry, search, navigation, source links and downloadable assets.
- The initial deliverable is a page inventory and working local prototype of the three templates. No application, deployment or new example set has been implemented by this handover.
