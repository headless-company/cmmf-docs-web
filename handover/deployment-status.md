# Deployment progress

Updated 15 October 2026.

- The deployment domain is confirmed as `cmmf.dev`.
- The user added the domain to their Cloudflare account and completed the registrar nameserver update. Cloudflare's overview now shows the domain as protected/active. A public recursive DNS query may still return the previous delegation while its cache expires.
- The imported records shown are Porkbun parking records: two apex A records (`207.207.210.229`, `207.207.210.107`) and wildcard/`www` CNAMEs to `pixie.porkbun.com`.
- No DNS records have been changed by this implementation session. The user will change nameservers at the registrar after the assigned Cloudflare values are retrieved.
- Assigned nameservers were read directly from the activation screen: `ali.ns.cloudflare.com` and `ram.ns.cloudflare.com`. The user has been given both values for the registrar update.
- Native Zen screenshots work, but coordinate clicks fail with `noWindowsAvailable`; keyboard navigation did not advance the page. The user opened the activation screen. Further dashboard setup may need the same UI assistance or authenticated CLI access.
- The initial 552-file site commit `bf35806` was published to `headless-company/cmmf-docs-web` after the user explicitly approved that exact public publication. The first push attempt was rejected by automatic approval review; the approved retry succeeded.
- GitHub Actions run `38654244648` passed installation, Astro checks, source/example/build gates and Chromium review. Linux WebKit reported an import failure at the final error assertion. The browser harness now waits for Starlight's idle-loaded Pagefind UI before navigation/context teardown and includes failed-request diagnostics; the updated local WebKit run passes all 40 combinations.
- Existing Wrangler authentication is expired and cannot refresh. A restricted CLI login has been proposed to work around Zen's non-responsive automation controls; the user must approve the login in their browser. No credentials are recorded in this repository.
- Pages project creation, GitHub connection, custom-domain association and production-domain verification are still pending. No external deployment has been made.

Use [the deployment runbook](deployment-runbook.md) for settings and verification. Local completion evidence remains in [the prototype review](prototype-review.md).
