import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import { editions } from './lib/versions.mjs';

const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const provenance = JSON.parse(read('source-provenance.json'));
const skills = Object.values(provenance).flat().find(item => item?.name === 'cmmf-skills');
assert.equal(skills.snapshotKind, 'git-commit-files');
assert.match(skills.baseGitRevision, /^[a-f0-9]{40}$/);
for (const file of skills.files) {
  const hash = createHash('sha256').update(readFileSync(resolve(root, file.bundledPath))).digest('hex');
  assert.equal(hash, file.sourceSha256, file.bundledPath);
  assert.equal(hash, file.bundledSha256, file.bundledPath);
}
const pages = JSON.parse(read('content-map.json')).pages.filter(page => page.owner === 'site' && page.route?.startsWith('/tools/') && !page.source?.includes('/held/'));
const llms = read('dist/llms.txt');
const sitemap = read('dist/sitemap-0.xml');
for (const page of pages) {
  const $ = load(read(`dist${page.route}index.html`));
  const article = $('.sl-markdown-content').text();
  assert.ok(article.length > 200, page.route);
  assert.equal($('[data-pagefind-filter]').attr('data-pagefind-filter'), 'version:shared');
  assert.equal($('.version-selector').length, 0);
  const filters = $('[data-pagefind-filter]').map((_, el) => $(el).attr('data-pagefind-filter')).get();
  for (const edition of editions) assert.ok(filters.includes(`version:${edition.version}`), page.route);
  assert.equal($('link[rel="canonical"]').attr('href'), `https://cmmf.dev${page.route}`);
  assert.ok(sitemap.includes(`https://cmmf.dev${page.route}<`), page.route);
  assert.ok(llms.includes(`https://cmmf.dev${page.route}`), page.route);
  const raw = read('dist/raw/site/' + page.source.replace('src/content/owned/', ''));
  assert.ok(raw.includes('Shared CMMF Skills guidance'), page.route);
  assert.ok(!$.html().includes('github.com/headless-company/cmmf-creation-agent'), page.route);
  if (!page.route.endsWith('/migration/')) assert.ok(!/cmmf-agent generate|npm run generate|CMMF_AGENT_PROVIDER/.test(raw), page.route);
  for (const edition of editions) assert.ok(!existsSync(resolve(root, 'dist' + edition.prefix + page.route)), 'Tool pages must remain shared');
}
// The beta validation page is imported separately; both it and copied articles must retain the limitation.
for (const prefix of ['', ...editions.map(edition => edition.prefix)]) {
  const $ = load(read(`dist${prefix}/docs/index.html`));
  assert.ok($('.sl-markdown-content').text().includes('experimental beta semantics are not supported'), prefix);
  assert.ok($('a[href="/tools/skills/sources-and-versions/"]').length, prefix);
}
for (const route of ['validation', 'adopt-1-3-beta']) {
  const $ = load(read(`dist${editions[1].prefix}/docs/guides/${route}/index.html`));
  assert.match($('.sl-markdown-content').text(), /do(?:es)? not support beta/, route);
}
assert.ok(read('dist/raw/site/tools/skills/sources-and-versions.md').includes('`1`, `1.1.0` and `1.2.0`'));
console.log(`Verified ${skills.files.length} pinned Skills evidence files, ${pages.length} shared tool routes/raw/index entries and stable/beta compatibility notices.`);
