# Implementation brief for the new site

**Agreed:** domain `cmmf.dev`; Studio subdomain `studio.cmmf.dev`; balanced audience with a plain-language entry point; Markdown/Git authoring; Cloudflare Pages is acceptable. Separate site repository is the updated recommendation for this handover.

**Recommended, still adjustable:** Astro/Starlight static output; Pagefind search; Mermaid-to-SVG diagrams; Customer Story as the primary teaching example, followed by Article/Person/SEO; discreet optional Headless Company attribution. No implementation of these has begun.

**Current deliverable state:** the complete plan, audit, proposed routes, exact canonical snapshot, brand assets/guidance and tooling evidence are bundled. The sync/integrity helpers are implemented. There is no Astro scaffold, website content expansion, validated Customer Story example set, live site, Cloudflare project or new Git repository yet.

First implement:

1. Inspect the bundle and verify its integrity and source lock.
2. Select supported current Astro/Starlight versions from official documentation; use an appropriate supported Node runtime, commit the dependency lockfile, and preserve the existing project files when scaffolding.
3. Build the page inventory from `content-map.json`, adding new learning/tutorial/tool pages with ownership and completeness status.
4. Prove content ingestion from `vendor/cmmf/`: add title/description/route metadata at build time; map relative Markdown links to website routes; source/edit links point to the actual authoritative repo/file. Generated inputs are build output.
5. Create a real homepage, one reading article, and one dense reference page. Use bundled identity assets, local font faces, Paper/Ink surfaces and the prescribed reading/interface roles.
6. Review actual desktop/mobile layouts in both themes. Verify loaded fonts, readable tables/code, expanded-logo mobile fallback and keyboard navigation.
7. Continue with all canonical content, search, example downloads, new launch guides and CI checks.

The homepage explains workshop intent → CMMF model → CMS implementation. Suggested introductory description: “A portable format for content models and the intent behind them.” Prefer a concrete modelling walkthrough over generic promotional copy.

Launch features: search, responsive menus, article contents/heading links, theme choice, code copying, accessible diagrams, downloads, visible version status, source/edit/report links, sitemap/canonical metadata/social previews, useful 404, versioned schema and raw Markdown/spec routes. Historical 1.1.0 spec pages must not suggest the bundled current schema validates that historical version.

Post-launch candidates: direct example handoff to Studio (requires editor support), browser validator with explicitly stated scope, verified CMS mapping guides, and additional recipes.

Completion gates: all internal links/anchors resolve, complete example sets validate structurally and across references, raw downloads match canonical bytes, current-version search works, the three templates are visually checked on small/wide screens in both themes, and the main learning/lookup/Studio journeys work. Hosting launch additionally checks HTTPS, redirects and real-domain search/downloads.

Open inputs: launch deadline; target Cloudflare account/current DNS records; new repository name/owner; footer credit; teaching example preference; any priority CMS mapping target; editorial reviewer. Reasonable defaults can support local implementation while account-dependent publishing waits for the actual setup.
