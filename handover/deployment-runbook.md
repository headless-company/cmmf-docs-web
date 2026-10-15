# Cloudflare Pages deployment

The site is ready for a static Pages build from the existing `headless-company/cmmf-docs-web` repository. This document is a runbook, not deployment evidence. See [deployment-status.md](deployment-status.md) for the current account/zone and repository progress.

## Build settings

| Setting | Value |
| --- | --- |
| Repository | `headless-company/cmmf-docs-web` |
| Root directory | Repository root |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | `22.23.3`, also recorded in `.nvmrc` |
| Production site URL | `https://cmmf.dev` |

Set `NODE_VERSION=22.23.3` in the Pages build environment if needed. Use the committed npm lockfile. No Astro server adapter, Pages Functions or runtime credentials are required. Ordinary builds do not fetch canonical content or require adjacent repositories. The tracked social PNG is already rendered; `npm run assets:social` is an optional authoring command requiring a browser, not part of the production build.

The build checks the source pin, complete examples, semantic regression cases, links/anchors, provenance-preserving downloads and retrieval/metadata assets. GitHub CI additionally runs Astro's type/content checks. Browser review is a separate local/CI gate.

These settings follow [Cloudflare's Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), checked on 15 October 2026.

## Review and connect

1. Review the site-owned copy and licensing decision, then commit and push the reviewed repository state before connecting the project.
2. In the selected Cloudflare account, create a **Pages** project using Git integration and the settings above. Keep Studio in its own project.
3. Check the generated `pages.dev` deployment before attaching a domain. Open the homepage, an article, dense reference, search and both downloadable project ZIPs. Confirm that `/404.html` exists in the output.
4. Inspect the existing `cmmf.dev` DNS zone and export the current records before changing domain settings. Preserve mail and unrelated services. An apex custom domain requires the domain to be a zone in the same Cloudflare account; use the Pages **Custom domains** flow to associate it. The docs apex record is CNAME `@` to `cmmf-docs-web.pages.dev` (Cloudflare flattens it at the apex). A DNS record by itself does not register the domain with Pages.
5. Keep `studio.cmmf.dev` associated with the independent Studio deployment. Check its existing status rather than assigning the docs project to that subdomain. The user added `www.cmmf.dev`; both domains are registered with Pages. Complete the prepared apex redirect in [www-redirect.md](www-redirect.md).

The domain process follows [Cloudflare's custom domain documentation](https://developers.cloudflare.com/pages/configuration/custom-domains/). No account-specific project ID or DNS value is invented here.

## Verify the real deployment

Check HTTPS and response status on `cmmf.dev`, navigation at 390 and 1440 px in both themes, current-version search, font loading, and the Studio outbound link. Confirm canonical and social URLs use `https://cmmf.dev`.

Request a deliberately nonexistent URL: it should return a **404** response with the custom recovery page, rather than a successful homepage response. Pages uses the emitted root `404.html` for this behaviour. The authored `404.md` is marked draft to keep it out of Starlight's ordinary production routes while its dedicated 404 renderer still consumes it. This resolves the duplicate static-route warning without modifying installed dependencies.

Check `/llms.txt`, raw site Markdown, the versioned schema, Mermaid/SVG diagrams, social image, robots and sitemap. Compare downloaded schema and ZIP contents against the reviewed build. Pages normalises HTML URLs, including `/learn/why-cmmf/index.html` to `/learn/why-cmmf/`; verify actual redirects on the domain. Test download content types, including the text rules in `public/_headers`.

Cloudflare adds `X-Robots-Tag: noindex` to preview URLs. Verify this on a branch preview and the absence of unintended noindex on production. Leave Pages' default cache behaviour in place. These behaviours are described in [Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/); text headers use the supported [`_headers` file](https://developers.cloudflare.com/pages/configuration/headers/).

Record the deployed Git revision, Pages deployment URL/ID, domain checks and date here or in a release note. The initial production deployment and verification are recorded in [deployment-status.md](deployment-status.md).

## Roll back

Use the last verified Pages production deployment to roll back a bad site build. For source/content fixes, restore or correct the repository change, rerun checks and deploy a reviewed revision. A docs rollback does not roll back Studio or a live CMS. Keep the prior DNS record export available if domain setup itself needs to be reverted.
