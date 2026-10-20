import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { load } from 'cheerio';
import { createHash } from 'node:crypto';
import { checkExampleDownloads } from './lib/example-downloads.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(resolve(dir, e.name)) : [resolve(dir, e.name)]);
const pages = files(dist).filter(f => f.endsWith('.html'));
let links = 0;
const errors = [];
const map = JSON.parse(readFileSync(resolve(root, 'content-map.json'), 'utf8'));
for (const page of map.pages.filter(page => page.route && page.route.endsWith('/') && page.status.startsWith('implemented'))) {
  const file = resolve(dist, `.${page.route}`, 'index.html');
  if (!existsSync(file)) errors.push(`Inventory route was not built: ${page.route}`);
}
for (const file of pages) {
  const route = file.slice(dist.length).replace(/index\.html$/, '');
  const $ = load(readFileSync(file, 'utf8'));
  if (route !== '/' && $('.sl-markdown-content h2').length && !$('.sl-markdown-content .sl-heading-wrapper a').length) errors.push(`${route}: article heading links are missing`);
  if (route === '/tools/skills/' && !$('.starlight-aside').length) errors.push('Skills implementation status notice did not receive Starlight rendering.');
  const social = $('meta[property="og:image"]').attr('content');
  if (social !== 'https://cmmf.dev/images/social/cmmf-social-preview.png') errors.push(`${route}: missing social preview metadata`);
  for (const [selector, expected] of [
    ['meta[property="og:image:width"]', '1280'],
    ['meta[property="og:image:height"]', '640'],
    ['meta[property="og:image:type"]', 'image/png'],
    ['meta[property="og:image:alt"]', 'CMMF — Content Model Master Format'],
    ['meta[name="twitter:card"]', 'summary_large_image'],
    ['meta[name="twitter:image"]', social],
    ['meta[name="twitter:image:alt"]', 'CMMF — Content Model Master Format'],
  ]) if ($(selector).length !== 1 || $(selector).attr('content') !== expected) errors.push(`${route}: incorrect social metadata ${selector}`);
  for (const element of $('[href], [src]').toArray()) {
    const target = $(element).attr('href') ?? $(element).attr('src');
    if (!target || /^(mailto:|tel:|data:|javascript:)/.test(target)) continue;
    const url = new URL(target, `https://cmmf.dev${route}`);
    if (url.origin !== 'https://cmmf.dev') continue;
    links++;
    let destination = resolve(dist, `.${decodeURIComponent(url.pathname)}`);
    if (url.pathname === '/404/') destination = resolve(dist, '404.html');
    else if (url.pathname.endsWith('/')) destination = resolve(destination, 'index.html');
    if (!existsSync(destination)) { errors.push(`${route}: missing ${target}`); continue; }
    if (url.hash && destination.endsWith('.html')) {
      const doc = load(readFileSync(destination, 'utf8'));
      if (!doc('[id]').toArray().some(e => doc(e).attr('id') === decodeURIComponent(url.hash.slice(1)))) errors.push(`${route}: missing anchor ${target}`);
    }
  }
}
// Release hold: these pages/assets must be absent, including their raw copies.
for (const path of [
  'tools/studio/index.html', 'docs/get-started/visual-modelling/index.html',
  'raw/site/tools/studio.md', 'raw/site/docs/get-started/visual-modelling.md',
  'images/tutorials/customer-story-studio.png', 'images/tutorials/customer-story-summary-rules.png',
  'brand/logos/studio',
]) if (existsSync(resolve(dist, path))) errors.push(`Held release material was published: ${path}`);
for (const file of files(dist).filter(file => file.endsWith('.html') ||
  (file.startsWith(resolve(dist, 'raw/site') + '/') && file.endsWith('.md')) ||
  (file.startsWith(resolve(dist, 'downloads') + '/') && /\.(md|mjs)$/.test(file)))) {
  if (/\bstudio\b|cmmf-visual-editor/i.test(readFileSync(file, 'utf8'))) errors.push(`Held tool mentioned in public content: ${file.slice(dist.length)}`);
}
const lock = JSON.parse(readFileSync(resolve(root, 'cmmf-source.lock.json'), 'utf8'));
const png = readFileSync(resolve(dist, 'images/social/cmmf-social-preview.png'));
if (png.readUInt32BE(16) !== 1280 || png.readUInt32BE(20) !== 640) errors.push('Social preview must be 1280 × 640.');
for (const target of readFileSync(resolve(dist, 'llms.txt'), 'utf8').matchAll(/https:\/\/cmmf\.dev([^\s)]+)/g)) {
  const path = target[1];
  const file = resolve(dist, `.${path}`, ...(path.endsWith('/') ? ['index.html'] : []));
  if (!existsSync(file)) errors.push(`Retrieval index target does not exist: ${path}`);
}
for (const example of ['article', 'customer-story']) {
  const folder = resolve(dist, 'downloads/diagrams', lock.specVersion);
  const source = readFileSync(resolve(folder, `${example}.mmd`), 'utf8');
  if (!source.startsWith('flowchart TB\n')) errors.push(`Invalid diagram source: ${example}`);
  for (const theme of ['light', 'dark']) {
    const svg = readFileSync(resolve(folder, `${example}-${theme}.svg`), 'utf8');
    if (/<script\b|\bonload\s*=|<foreignObject\b/i.test(svg) || !svg.includes('aria-labelledby="diagram-title diagram-description"') || !svg.includes('Source Sans 3') || !svg.includes('SIL OPEN FONT LICENSE Version 1.1')) errors.push(`Invalid static accessible SVG: ${example}/${theme}`);
  }
}
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
for (const [path, sha] of Object.entries(lock.files)) {
  let destination;
  if (path.startsWith('examples/')) destination = resolve(dist, 'downloads/examples', lock.specVersion, path.slice(9));
  else if (path === 'schemas/model.schema.json') destination = resolve(dist, 'schemas', lock.specVersion, 'model.schema.json');
  else if (path.endsWith('.md')) destination = resolve(dist, 'raw', path);
  if (destination && (!existsSync(destination) || hash(destination) !== sha)) errors.push(`Download differs from canonical bytes: ${path}`);
}
if (errors.length) throw new Error(errors.join('\n'));
checkExampleDownloads(root, dist, lock);
console.log(`Checked ${pages.length} HTML pages and ${links} internal links/assets/anchors; canonical raw downloads match the source lock.`);
