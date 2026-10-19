// Stable URLs are deliberately independent of prerelease publication.
export const stableVersion = '1.2.0';
export const betaVersion = '1.3.0-beta.1';
export const editions = [
  { version: stableVersion, label: '1.2.0 · Stable', prefix: `/versions/${stableVersion}`, snapshot: 'vendor/cmmf', lock: 'cmmf-source.lock.json' },
  { version: betaVersion, label: '1.3.0-beta.1 · Experimental', prefix: `/versions/${betaVersion}`, snapshot: 'vendor/cmmf-beta', lock: 'cmmf-beta-source.lock.json' },
];
export const versionedTopic = path => /^\/(?:docs|learn|examples)(?:\/|$)/.test(path);
export function editionFor(path) {
  return editions.find(edition => path.startsWith(edition.prefix + '/') || path.startsWith(`/spec/${edition.version}/`)) || editions[0];
}
export function topicPath(path) {
  return path.replace(/^\/versions\/[^/]+/, '') || '/docs/';
}
export function editionLink(path, edition) {
  if (path.startsWith('/spec/')) return path.replace(/^\/spec\/[^/]+/, `/spec/${edition.version}`);
  const topic = topicPath(path);
  if (versionedTopic(topic)) return edition.prefix + topic;
  return edition.prefix + '/docs/';
}
