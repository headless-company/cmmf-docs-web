import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { editions } from './lib/versions.mjs';
import { checkExampleDownloads } from './lib/example-downloads.mjs';
import { loadModelSet, validateModelSet } from './lib/model-set.mjs';
import { validateModel } from '../vendor/cmmf-beta/scripts/validate-models.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const { routes } = JSON.parse(readFileSync(resolve(root, '.generated/versions.json'), 'utf8'));
const betaOnly = ['/docs/guides/adopt-1-3-beta/', '/docs/guides/document-validation-hints/'];
const sitemap = readFileSync(resolve(dist, 'sitemap-0.xml'), 'utf8');
for (const edition of editions) {
  for (const route of routes) {
    if (edition === editions[0] && betaOnly.includes(route)) continue;
    const path = edition.prefix + route;
    const $ = load(readFileSync(resolve(dist, '.' + path, 'index.html'), 'utf8'));
    const canonical = 'https://cmmf.dev' + (edition === editions[0] ? route : path);
    assert.equal($('link[rel="canonical"]').length, 1, path);
    assert.equal($('link[rel="canonical"]').attr('href'), canonical, path);
    assert.equal($('meta[property="og:url"]').attr('content'), canonical, path);
    assert.ok($('nav[aria-label="Documentation version"] a').toArray().every(a => existsSync(resolve(dist, '.' + $(a).attr('href'), 'index.html'))), path);
    assert.equal($('[data-pagefind-filter]').attr('data-pagefind-filter'), `version:${edition.version}`, path);
    assert.equal(sitemap.includes(`https://cmmf.dev${path}<`), edition !== editions[0], path);
    const sidebar = $('#starlight__sidebar a[href]').map((_, a) => $(a).attr('href')).get();
    assert.ok(sidebar.filter(href => /^\/(docs|learn|examples)\//.test(href)).length === 0, `${path}: sidebar escaped edition`);
    if (edition === editions[1]) assert.ok($('.edition-notice').length, path);
  }
}
const beta = editions[1];
const lock = JSON.parse(readFileSync(resolve(root, beta.lock), 'utf8'));
const sha = path => createHash('sha256').update(readFileSync(path)).digest('hex');
for (const [source, expected] of Object.entries(lock.files)) {
  const path = source === 'schemas/model.schema.json' ? `schemas/${beta.version}/model.schema.json`
    : source.startsWith('examples/') ? `downloads/examples/${beta.version}/${source.slice(9)}`
    : source.endsWith('.md') ? `raw/${beta.version}/${source}` : null;
  if (path) assert.equal(sha(resolve(dist, path)), expected, `Beta download: ${source}`);
}
const sets = [
  { id: 'article', name: 'Article and Subscription', source: beta.snapshot + '/examples', downloadPath: '', bundleFile: 'article.models.json' },
  { id: 'customer-story', name: 'Customer Story', source: '.generated/customer-story-beta', downloadPath: 'customer-story', bundleFile: 'customer-story.models.json' },
];
checkExampleDownloads(root, dist, { ...lock, snapshot: beta.snapshot }, sets);
for (const example of sets) {
  const set = loadModelSet(resolve(root, example.source), beta.version);
  validateModelSet(set, JSON.parse(readFileSync(resolve(root, beta.snapshot, 'schemas/model.schema.json'), 'utf8')));
  for (const model of set.models) assert.deepEqual(validateModel(model), []);
}
for (const suffix of ['', 'translation-contract/']) {
  const path = `/spec/${beta.version}/${suffix}`;
  const $ = load(readFileSync(resolve(dist, '.' + path, 'index.html'), 'utf8'));
  assert.equal($('link[rel="canonical"]').attr('href'), 'https://cmmf.dev' + path);
}
console.log('Verified edition canonicals, sitemap, navigation, version controls, complete beta graphs and exact pinned downloads.');
