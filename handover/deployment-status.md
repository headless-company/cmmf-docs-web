# Deployment progress

Updated 15 October 2026.

## Published site

- Production domain: **https://cmmf.dev**. Both `cmmf.dev` and `www.cmmf.dev` are registered and active in Pages, including domain verification and certificate validation.
- Pages project: `cmmf-docs-web`, ID `08f9c1e7-34eb-4251-9fbf-bac41d035079`.
- Pages address: https://cmmf-docs-web.pages.dev.
- Initial production deployment: `6930dda4-91fa-404e-a752-7c02b7082fe6`, https://6930dda4.cmmf-docs-web.pages.dev, deployed successfully at 23:41 UTC on 14 October 2026.
- Deployed source revision: `4c3f29c259212ca56d77aa718d7664c3e4426de5` on `main` in `headless-company/cmmf-docs-web`.
- GitHub integration is configured for automatic production builds from `main` and branch previews. Build command `npm run build`, output `dist`, repository root, `NODE_VERSION=22.23.3` for production and preview. The initial deployment successfully cloned and built the repository. A later push will verify the automatic trigger; an actual branch-preview deployment has not been reviewed yet.

## Verification

- [GitHub Actions run 38655088672](https://github.com/headless-company/cmmf-docs-web/actions/runs/38655088672) passed every gate, including Chromium and Linux WebKit browser review.
- The live Pages address passed 40 template/theme/viewport combinations, 20 automated WCAG audits with zero violations, search, navigation, keyboard interactions, theme persistence, font loading, logo geometry and project download checks. No browser errors or failed requests were recorded.
- The live apex domain passed the three primary templates at 390 and 1440 px in both themes (12 combinations), 12 automated WCAG audits with zero violations, and the search/navigation/download interactions. No browser errors or failed requests were recorded. Screenshots were inspected visually.
- Live schema, both project ZIPs, diagram source/SVG, raw Markdown, social image, robots, sitemap and retrieval files matched the local reviewed build byte for byte. Eleven files, including the homepage, were independently compared on `cmmf.dev`.
- A missing URL returns HTTP 404 with the custom recovery page. `/learn/why-cmmf/index.html` returns HTTP 308 to `/learn/why-cmmf/`. The apex redirects HTTP to HTTPS. Production HTML has no unintended `noindex` header.
- Authoritative Cloudflare addresses were used for the apex checks while the local recursive resolver still returned Porkbun parking addresses. Certificate verification remained enabled. Public resolvers `1.1.1.1` and `8.8.8.8` report the assigned Cloudflare nameservers; `1.1.1.1` resolves both website names to Cloudflare.
- Generated screenshots and machine-readable reports are local, ignored artifacts under `artifacts/site-review/live-pages/`, `live-domain/`, `live-http.json` and `live-domain-http.json`.

## Account and DNS

- The deployment domain is `cmmf.dev`; `comfy.dev` was explicitly corrected as a typo.
- Cloudflare reports the zone active, with nameservers `ali.ns.cloudflare.com` and `ram.ns.cloudflare.com`. The user completed the registrar update.
- The user reports adding `@` and `www` DNS records. Both domain names serve the docs site over valid HTTPS when queried through Cloudflare. Imported Porkbun parking records had previously been observed; this session did not edit DNS records.
- The restricted Wrangler login succeeded. `whoami` confirms the account email supplied by the user, Pages write plus account/user/zone read permissions, and encrypted credential storage with its key in macOS Keychain. No credential is recorded in the repository.
- The restricted credential cannot list or edit DNS records or create redirect rules. A DNS inventory attempt returned HTTP 403, so no complete DNS export was obtained. Preserve unrelated records when making further dashboard changes.
- Zen native controls remain unreliable. The user handled the OAuth consent and domain DNS; Pages project creation, Git connection, build and custom-domain registration were completed through authenticated provider APIs.

## Remaining work

- `www.cmmf.dev` currently serves the same site with apex canonical URLs. A permanent redirect to `cmmf.dev` is prepared in [www-redirect.md](www-redirect.md), awaiting the user's dashboard action and live verification. This requires redirect-rule write access beyond the approved CLI scopes.
- `studio.cmmf.dev` is a separate deployment. Its HTTPS endpoint failed the current outbound check; Studio has not been deployed or associated with this docs project. Its production availability remains a separate follow-up.
- Recheck an actual branch preview's `noindex` behaviour when a preview branch is deployed.

## Publication history

The initial 552-file commit `bf35806` was published to the public repository after explicit approval of that exact publication. Automatic approval review rejected the first push; the approved retry succeeded. Initial CI run `38654244648` passed build and Chromium checks but failed Linux WebKit with an idle module-import race. Commit `4c3f29c` makes the browser harness wait for Pagefind before navigation and context teardown, adds diagnostics and passes the complete rerun. Site runtime code was unchanged by that fix.

Use [the deployment runbook](deployment-runbook.md) for build settings and rollback. Local implementation evidence remains in [the prototype review](prototype-review.md).
