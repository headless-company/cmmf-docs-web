import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { unzipSync } from 'fflate';
import { load } from 'cheerio';
import { editions } from './lib/versions.mjs';
const root = resolve(import.meta.dirname, '..');
const read = p => readFileSync(resolve(root,p));
const pages = JSON.parse(read('.generated/retrieval.json'));
for (const page of pages) {
  const html = load(read(`dist${page.route}index.html`));
  if (page.route === '/project/use-with-agents/') assert.equal(html('.version-selector').length, 0, 'Agent entry guidance is shared');
  assert.equal(html('link[rel="alternate"][type="text/markdown"]').attr('href'), 'https://cmmf.dev' + page.markdown, page.route);
  assert.equal(html(`.site-footer a[href="${page.markdown}"]`).text(), 'View Markdown', page.route);
  assert.equal(html('link[rel="describedby"]').attr('href'), 'https://cmmf.dev/llms.txt');
  assert.ok(existsSync(resolve(root,'dist' + page.markdown)), page.markdown);
}
for (const edition of editions) {
  const index = read(`dist${edition.prefix}/llms.txt`).toString();
  assert.ok(index.includes(`schemas/${edition.version}/model.schema.json`));
  const lock = JSON.parse(read(edition.lock));
  assert.ok(index.includes(lock.revision));
  const archive = unzipSync(read(`dist/downloads/documentation/${edition.version}.zip`));
  verify(archive);
  for (const path of Object.keys(lock.files)) assert.deepEqual(Buffer.from(archive['upstream/' + path]), read(edition.snapshot + '/' + path));
  for (const page of pages.filter(p => p.route.startsWith(edition.prefix + '/'))) {
    assert.ok(index.includes('https://cmmf.dev' + page.markdown));
    assert.deepEqual(Buffer.from(archive['documentation' + page.markdown]), read('dist' + page.markdown));
  }
  assert.ok(!Object.keys(archive).some(p => p.startsWith('guidance/')), 'Shared tools must be separate');
}
verify(unzipSync(read('dist/downloads/documentation/shared-tools.zip')));
for (const path of ['llms.txt', ...editions.map(e => e.prefix.slice(1) + '/llms.txt')]) {
  for (const url of read('dist/' + path).toString().matchAll(/https:\/\/cmmf\.dev([^\s)]+)/g)) {
    const target = url[1];
    assert.ok(existsSync(resolve(root,'dist' + target + (target.endsWith('/') ? 'index.html' : ''))), target);
  }
}
function verify(archive) {
  for (const [path, bytes] of Object.entries(archive)) assert.ok(!/\bcmmf[-_]brand(?:ing)?(?![-\w])/i.test(Buffer.from(bytes).toString()), `Private source identifier in pack: ${path}`);
  const manifest = JSON.parse(Buffer.from(archive['manifest.json']).toString());
  assert.equal(Object.keys(archive).length, Object.keys(manifest.files).length + 1);
  for (const [path, hash] of Object.entries(manifest.files)) assert.equal(createHash('sha256').update(archive[path]).digest('hex'), hash, path);
}
console.log(`Verified ${pages.length} Markdown alternates, edition indexes, reference pack payload hashes and exact upstream bytes. Host behaviour remains unevaluated.`);
