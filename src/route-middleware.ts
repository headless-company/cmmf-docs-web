import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { editions, editionFor, topicPath, versionedTopic } from '../scripts/lib/versions.mjs';

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const path = context.url.pathname;
  const edition = editionFor(path);
  if (path.startsWith(editions[0].prefix + '/')) {
    const canonical = 'https://cmmf.dev' + topicPath(path);
    for (const tag of route.head) {
      if (tag.tag === 'link' && tag.attrs?.rel === 'canonical') tag.attrs.href = canonical;
      if (tag.tag === 'meta' && tag.attrs?.property === 'og:url') tag.attrs.content = canonical;
    }
  }
  if (!path.startsWith('/versions/') && edition.version === '1.2.0') return;
  const rewrite = (href: string) => versionedTopic(href) ? edition.prefix + href
    : href.replace(/^\/spec\/1\.2\.0\//, `/spec/${edition.version}/`);
  const visit = (entries: typeof route.sidebar) => {
    for (const item of entries) {
      if (item.type === 'group') visit(item.entries);
      else {
        item.href = rewrite(item.href);
        item.label = item.label.replace('1.2.0 specification', `${edition.version} specification`);
        item.isCurrent = item.href === path;
      }
    }
  };
  visit(route.sidebar);
  if (edition.version.includes('beta')) route.sidebar.unshift({
    type: 'group', label: 'Experimental 1.3 beta', collapsed: false, badge: undefined,
    entries: [
      ['Adopting the beta', '/docs/guides/adopt-1-3-beta/'],
      ['Document-level validation hints', '/docs/guides/document-validation-hints/'],
    ].map(([label, href]) => ({ type: 'link' as const, label: label!, href: rewrite(href!), isCurrent: rewrite(href!) === path, badge: undefined, attrs: {} })),
  });
  // Pagination must use the same edition as the sidebar, including its current marker.
  const links = route.sidebar.flatMap(function flatten(item): Array<Extract<(typeof route.sidebar)[number], { type: 'link' }>> {
    return item.type === 'group' ? item.entries.flatMap(flatten) : [item];
  });
  const index = links.findIndex(link => link.isCurrent);
  route.pagination = { prev: index > 0 ? links[index - 1] : undefined, next: index >= 0 ? links[index + 1] : undefined };
});
