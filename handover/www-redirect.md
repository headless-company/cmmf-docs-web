# Redirect www to cmmf.dev

Both `cmmf.dev` and `www.cmmf.dev` are registered and active in the `cmmf-docs-web` Pages project. The user deployed the `Redirect www to apex` rule in Cloudflare on 15 October 2026; live HTTPS checks confirm it works.

## Deployed settings

The rule uses **Custom filter expression** with the visual condition builder:

| Setting | Value |
| --- | --- |
| Rule name | `Redirect www to apex` |
| Field | URI Full |
| Operator | wildcard |
| Value | `https://www.cmmf.dev/*` |
| Redirect type | Dynamic |
| Expression | `concat("https://cmmf.dev", http.request.uri.path)` |
| Status code | `301` |
| Preserve query string | Enabled |

The condition's expression preview is `(http.request.full_uri wildcard r"https://www.cmmf.dev/*")`.

A builder value contains a URL pattern, not a filter expression. The Dynamic redirect's Expression field contains a Rules language expression, not a wildcard-template URL such as `https://cmmf.dev/${1}`. Cloudflare's separate Wildcard pattern editor accepts that template syntax, but it is not the editor used for this rule.

This rule only matches HTTPS requests to `www.cmmf.dev`. HTTP is separately redirected to HTTPS by Cloudflare. It leaves the apex, Pages preview domains and Studio alone. Keep `www` proxied in DNS.

## Verified behaviour

- `https://www.cmmf.dev/` → `301`, Location `https://cmmf.dev/`.
- `https://www.cmmf.dev/docs/?source=www` → `301`, Location `https://cmmf.dev/docs/?source=www`.
- `https://www.cmmf.dev/learn/why-cmmf/?source=www&test=1` → `301`, preserving the entire path and query string.
- `https://cmmf.dev/docs/` → `200`, without a redirect loop.

Checks used Cloudflare's authoritative address with certificate verification enabled because the local network's resolver still held Porkbun's old delegation. The local machine-readable result is `artifacts/site-review/www-redirect-check.json` (ignored).

The restricted Wrangler credential cannot edit redirect rules. The user completed the dashboard action after Zen's automated clicks failed. Settings follow [Cloudflare's dashboard rule documentation](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) and [Dynamic URL redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/#dynamic-url-redirect), checked on 15 October 2026.
