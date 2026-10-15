# Redirect www to cmmf.dev

Both `cmmf.dev` and `www.cmmf.dev` are registered and active in the `cmmf-docs-web` Pages project. Both currently serve the same site. The site's canonical URLs use `https://cmmf.dev`.

The remaining redirect is a Cloudflare zone rule. The approved Wrangler credential has Pages write and zone read access; it cannot create redirect rules. Zen's native controls are not reliable enough to complete this dashboard action.

In Cloudflare, select **cmmf.dev → Rules → Overview → Create rule → Redirect Rule**. Create:

| Setting | Value |
| --- | --- |
| Rule name | `Redirect www to apex` |
| Match mode | Custom filter expression |
| Filter expression | `(http.host eq "www.cmmf.dev")` |
| Redirect type | Dynamic |
| URL expression | `concat("https://cmmf.dev", http.request.uri.path)` |
| Status code | `301` |
| Preserve query string | Enabled |

Deploy the rule. Keep `www` proxied in DNS. This rule only matches `www.cmmf.dev`; it leaves the apex, Pages preview domains and Studio alone.

Expected checks:

- `https://www.cmmf.dev/` → `301`, Location `https://cmmf.dev/`.
- `https://www.cmmf.dev/docs/?source=www` → `301`, Location `https://cmmf.dev/docs/?source=www`.
- `https://cmmf.dev/docs/` → `200`, without a redirect loop.

Settings follow [Cloudflare's dashboard rule documentation](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) and [WWW-to-root example](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/), checked on 15 October 2026. The rule has been prepared, but has not been deployed or verified.
