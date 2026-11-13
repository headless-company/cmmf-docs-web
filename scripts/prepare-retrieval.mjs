import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { parse } from 'yaml';
import { zipSync } from 'fflate';
import { editions, stableVersion } from './lib/versions.mjs';
const root = resolve(import.meta.dirname, '..');
const read = p => readFileSync(resolve(root, p));
const write = (p, data) => { mkdirSync(dirname(resolve(root, p)), { recursive: true }); writeFileSync(resolve(root, p), data); };
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const map = JSON.parse(read('content-map.json')).pages;
const pages = [];
for (const file of files(resolve(root, '.generated/docs'))) {
  if (!/\.mdx?$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  const meta = parse(text.match(/^---\n([\s\S]*?)\n---/)[1]);
  if (meta.draft) continue;
  const name = relative(resolve(root, '.generated/docs'), file).replace(/\.mdx?$/, '');
  const route = '/' + name.replace(/\/index$/, '') + '/';
  const edition = editions.find(e => route.startsWith(e.prefix + '/'));
  const entry = map.find(p => p.route === route);
  let raw;
  if (edition) raw = `/raw/${edition.version}/site/${name.slice(edition.prefix.length)}.md`;
  else if (route.startsWith('/spec/1.3.0-beta.1/')) raw = `/raw/1.3.0-beta.1/spec/${route.endsWith('/translation-contract/') ? 'translation-contract-v1.3.0-beta.1' : 'cmmf-v1.3.0-beta.1'}.md`;
  else if (entry) {
    const source = entry.siteSource || entry.source;
    raw = source.startsWith('vendor/cmmf/') ? '/raw/' + source.slice(12) : '/raw/site/' + source.replace('src/content/owned/', '').replace(/\.mdx$/, '.md');
  }
  if (!raw || !existsSync(resolve(root, 'public' + raw))) throw new Error(`Missing Markdown for ${route}: ${raw}`);
  pages.push({ route, title: meta.title, markdown: raw, edition: edition?.version || (route.startsWith('/tools/') || route.startsWith('/project/') ? 'shared' : stableVersion) });
}
pages.sort((a,b) => a.route.localeCompare(b.route));
write('.generated/retrieval.json', JSON.stringify(pages, null, 2) + '\n');
const link = p => `- [${p.title}](https://cmmf.dev${p.markdown}): Article: https://cmmf.dev${p.route}`;
const policy = 'For existing projects, respect the manifest version; never silently upgrade. For new projects use current stable unless experimental is explicitly requested. Specifications are normative; tutorials explain them. Numeric specVersion: 1 means original legacy. Skills helpers do not support beta semantics. Model checks do not validate content or prove CMS translations lossless.';
const shared = pages.filter(p => p.route.startsWith('/tools/'));
let index = `# CMMF\n\n> A portable, platform-neutral format for content models and their intent.\n\n${policy}\n\n## Start here\n\n${link(pages.find(p => p.route === '/project/use-with-agents/'))}\n`;
for (const edition of editions) {
  const lock = JSON.parse(read(edition.lock));
  const selected = pages.filter(p => p.route.startsWith(edition.prefix + '/'));
  const spec = pages.filter(p => p.route.startsWith(`/spec/${edition.version}/`));
  const heading = `${edition.version === stableVersion ? 'Stable' : 'Experimental'} CMMF ${edition.version}`;
  const content = `# ${heading}\n\n> Exact-edition documentation and normative sources.\n\n${policy}\n\nUpstream revision: ${lock.revision}. Tool guidance is shared separately.\n\n## Normative sources\n\n${spec.map(link).join('\n')}\n- [Model schema](https://cmmf.dev/schemas/${edition.version}/model.schema.json)\n\n## Explanations and complete examples\n\n${selected.map(link).join('\n')}\n- [Customer Story project](https://cmmf.dev/downloads/examples/${edition.version}/customer-story.zip)\n- [Article project](https://cmmf.dev/downloads/examples/${edition.version}/article.zip)\n\n## Reference packs and shared tools\n\n- [Edition documentation pack](https://cmmf.dev/downloads/documentation/${edition.version}.zip)\n- [Shared tool guidance](https://cmmf.dev/raw/site/tools/index.md): Compatibility is specified per tool.\n`;
  write(`public${edition.prefix}/llms.txt`, content);
  index += `\n## ${heading}\n\n- [Exact-edition index](https://cmmf.dev${edition.prefix}/llms.txt): Revision ${lock.revision}.\n- [Documentation pack](https://cmmf.dev/downloads/documentation/${edition.version}.zip)\n${spec.map(link).join('\n')}\n- [Model schema](https://cmmf.dev/schemas/${edition.version}/model.schema.json)\n${selected.map(link).join('\n')}\n`;
  const inputs = {};
  for (const page of [...selected, ...spec]) inputs['documentation' + page.markdown + ''] = read('public' + page.markdown);
  // Preserve exact upstream bytes independently of rendered explanations.
  const snapshot = edition.snapshot;
  for (const path of Object.keys(lock.files)) inputs['upstream/' + path] = read(`${snapshot}/${path}`);
  pack(edition.version, inputs, { formatVersion: edition.version, upstreamRevision: lock.revision, upstreamRepository: lock.repository });
}
index += `\n## Shared tools\n\n${shared.map(link).join('\n')}\n- [Shared tools reference pack](https://cmmf.dev/downloads/documentation/shared-tools.zip): Website guidance, not installable Skills.\n\n## Historical specification\n\n- [CMMF 1.1.0 archive](https://cmmf.dev/spec/1.1.0/): No complete documentation edition or matching current schema.\n`;
write('public/llms.txt', index);
pack('shared-tools', Object.fromEntries(shared.map(p => ['guidance' + p.markdown, read('public' + p.markdown)])), { formatVersion: null, source: 'website-owned shared tools guidance; compatibility varies by tool' });
function pack(id, inputs, provenance) {
  inputs['README.md'] = Buffer.from(`# CMMF reference pack: ${id}\n\n${policy}\n\nThis is a reference archive, not an installed validator or Skills package. Edition packs preserve exact upstream files under upstream/ and website explanations under documentation/. Shared tools guidance is separate. Read the matching complete example project's README to install and run its validator.\n\nmanifest.json records each payload file's SHA-256 and source provenance. Upstream licence notices apply to their upstream files only; they do not grant a blanket licence to website explanations, brand assets or this entire archive. No brand artwork is included.\n`);
  const sha = b => createHash('sha256').update(b).digest('hex');
  inputs['manifest.json'] = Buffer.from(JSON.stringify({ id, ...provenance, files: Object.fromEntries(Object.entries(inputs).sort().map(([p,b]) => [p,sha(b)])) }, null, 2) + '\n');
  write(`public/downloads/documentation/${id}.zip`, zipSync(Object.fromEntries(Object.entries(inputs).sort().map(([p,b]) => [p,new Uint8Array(b)])), { level: 9, mtime: new Date(1980,0,1) }));
}
console.log(`Prepared ${pages.length} article Markdown mappings, edition retrieval indexes and three reference packs.`);
