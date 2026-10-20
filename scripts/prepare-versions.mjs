import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, dirname, relative, posix } from 'node:path';
import { parse, stringify } from 'yaml';
import { editions, stableVersion, betaVersion, versionedTopic } from './lib/versions.mjs';
import { prepareExampleDownloads } from './lib/example-downloads.mjs';
import { prepareDiagrams } from './lib/diagrams.mjs';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, '.generated/docs');
const beta = editions[1];
const lock = JSON.parse(readFileSync(resolve(root, beta.lock), 'utf8'));
const map = JSON.parse(readFileSync(resolve(root, 'content-map.json'), 'utf8'));
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(resolve(dir, e.name)) : [resolve(dir, e.name)]);
const write = (path, data) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, data); };
const stableInputs = files(output);
const routeFor = file => '/' + relative(output, file).replace(/\.(md|mdx)$/, '').replace(/\/index$/, '') + '/';
const betaOverrides = {
  '/docs/guides/validation/': 'docs/validations.md',
  '/docs/concepts/translation/': 'docs/translation-concepts.md',
  '/docs/guides/document-validation-hints/': 'docs/document-validation-hints.md',
  '/docs/guides/adopt-1-3-beta/': 'site',
  '/examples/article/': 'site',
};
const betaSources = new Map(map.pages.filter(p => p.source?.startsWith('vendor/cmmf/') && p.route).map(p => [p.source.slice(12), p.route]));
for (const [route, source] of Object.entries(betaOverrides)) if (source !== 'site') betaSources.set(source, route);
betaSources.set('docs/beta-testing.md', '/docs/guides/adopt-1-3-beta/');
betaSources.set(`spec/cmmf-v${betaVersion}.md`, `/spec/${betaVersion}/`);
betaSources.set(`spec/translation-contract-v${betaVersion}.md`, `/spec/${betaVersion}/translation-contract/`);
betaSources.set('schemas/model.schema.json', `/schemas/${betaVersion}/model.schema.json`);
betaSources.set('scripts/validate-models.mjs', `/downloads/examples/${betaVersion}/scripts/validate-models.mjs`);
betaSources.set('examples', '/examples/');
betaSources.set('examples/models', '/examples/article/#included-models');
for (const path of Object.keys(lock.files).filter(p => p.startsWith('examples/'))) betaSources.set(path, `/downloads/examples/${betaVersion}/${path.slice(9)}`);
const routes = new Set(stableInputs.map(routeFor).filter(versionedTopic));
for (const route of Object.keys(betaOverrides)) routes.add(route);
function versionLinks(text, edition) {
  // Only actual Markdown/HTML destinations; never code examples or historical version numbers.
  return text.replace(/(\]\(|\bhref=["'])(\/(?:docs|learn|examples)(?:\/[^\s)"'#]*)?)(#[^\s)"']*)?/g,
    (_match, start, path, hash = '') => `${start}${edition.prefix}${path}${hash}`);
}
function relinkImports(text, sourceFile, destinationFile) {
  return text.replace(/(import \w+ from ')([^']+)(';)/g, (match, start, path, end) =>
    path.startsWith('.') ? start + relative(dirname(destinationFile), resolve(dirname(sourceFile), path)) + end : match);
}
function imported(source, title, normative = false) {
  let text = readFileSync(resolve(root, beta.snapshot, source), 'utf8').replace(/^# [^\n]+\n+/, '');
  text = text.replace(/\]\(([^\s)]+)\)/g, (match, target) => {
    if (/^(?:[a-z]+:|\/|#)/i.test(target)) return match;
    const [path, hash] = target.split('#');
    const key = posix.normalize(posix.join(posix.dirname(source), path)).replace(/\/$/, '');
    const route = betaSources.get(key);
    if (!route) throw new Error(`Unmapped beta link: ${source} -> ${target}`);
    return `](${route}${hash ? '#' + hash : ''})`;
  });
  if (source === 'docs/validations.md') text += '\n\n## Skills compatibility\n\n[CMMF Skills](/tools/skills/sources-and-versions/) does not support beta source requests or beta helper semantics. Use the matching beta example validator for the checks described here; do not treat those checks as Skills support.\n';
  // Site publication deliberately retains the existing release hold on tool promotion.
  if (!normative) text = text.replace(/Studio and other editors/g, 'Editors');
  const sourceUrl = `${lock.repository.replace(/\.git$/, '')}/blob/${lock.revision}/${source}`;
  return `---\n${stringify({ title, description: `${title} for experimental CMMF ${betaVersion}.`, editUrl: sourceUrl })}---\n\n${text}\n\n<div class="source-note">Source: <a href="${sourceUrl}">CMMF ${betaVersion} at ${lock.revision.slice(0, 8)}</a> · <a href="/raw/${betaVersion}/${source}">Download original Markdown</a></div>\n`;
}
for (const edition of editions) {
  for (const file of stableInputs) {
    const route = routeFor(file);
    if (!versionedTopic(route)) continue;
    if (edition === beta && betaOverrides[route]) continue;
    const target = resolve(output, edition.prefix.slice(1), relative(output, file));
    let text = relinkImports(readFileSync(file, 'utf8'), file, target);
    const [, frontmatter, body] = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const meta = parse(frontmatter);
    meta.pagefind = edition === beta; // Avoid duplicate stable search results.
    if (edition === beta) {
      const upstream = map.pages.find(page => page.route === route && page.owner === 'upstream');
      if (upstream) {
        write(target, versionLinks(imported(upstream.source.slice(12), upstream.title), beta));
        continue;
      }
      meta.description = meta.description?.replaceAll(stableVersion, betaVersion);
      // The historic migration guide describes the actual 1.2 changes in both editions.
      if (!route.includes('migrate-to-1-2')) {
        text = body.replaceAll(stableVersion, betaVersion);
        for (const path of Object.keys(lock.files).filter(p => p.startsWith('examples/') && p.endsWith('.yaml') && existsSync(resolve(root, 'vendor/cmmf', p)))) {
          const old = readFileSync(resolve(root, 'vendor/cmmf', path), 'utf8').trimEnd();
          text = text.replace(old.replaceAll(stableVersion, betaVersion), readFileSync(resolve(root, beta.snapshot, path), 'utf8').trimEnd());
        }
      } else text = body;
      if (!route.includes('migrate-to-1-2')) text = text.replaceAll(`/spec/${stableVersion}/`, `/spec/${betaVersion}/`);
      text = text.replaceAll('32604441aff09a6dbfe2361e97078af5263fd321', lock.revision).replaceAll('32604441', lock.revision.slice(0, 8)).replaceAll('/raw/docs/', `/raw/${betaVersion}/docs/`);
      if (route.includes('migrate-to-1-2')) text = text.replace('The site bundles a 1.2.0 schema only.', 'For this historical migration, use the [1.2.0 schema](/schemas/1.2.0/model.schema.json).');
      if (route.includes('migrate-to-1-2')) text = '\n:::note[Historical migration guide]\nThis guide migrates older sets to stable 1.2.0. For beta adoption, use [Adopting the 1.3 beta](' + beta.prefix + '/docs/guides/adopt-1-3-beta/).\n:::\n' + text;
      if (route === '/docs/') text = text.replace('[Migration to 1.3.0-beta.1]', '[Migration to 1.2.0]');
      if (route === '/docs/') text += `\n## Experimental additions\n\nStart with [adopting the beta](/docs/guides/adopt-1-3-beta/), then read [document-level validation hints](/docs/guides/document-validation-hints/). Field constraints remain unchanged; the new declarations record conditional and cross-field intent.\n`;
      if (route === '/learn/glossary/') text += '\n## Validation hint\n\nA model-level declaration of conditional or cross-field intent, introduced in experimental 1.3.0-beta.1. Structured, expression and prose forms are exclusive. A valid declaration does not itself evaluate content. Read [document-level hints](/docs/guides/document-validation-hints/).\n';
      if (route === '/docs/guides/errors/') text += '\n## A beta hint declaration fails\n\nEvery hint needs an ID unique within its model and a non-blank description. Use exactly one representation: structured `then` with an optional `when`, an `expression` alone, or prose. Structured field IDs must exist in the same model; scalar operators cannot inspect lists and numeric comparisons require number fields. Declaration errors remain errors even with `severity: info`. These checks do not evaluate content. See [hint syntax and semantics](/docs/guides/document-validation-hints/).\n';
      if (route === '/examples/') text += '\nThe beta Article project also includes Subscription, showing a named expression dialect. [Inspect the complete beta set](/examples/article/).\n';
    } else text = body;
    write(target, `---\n${stringify(meta)}---\n${edition === beta && route.includes('migrate-to-1-2') ? text : versionLinks(text, edition)}`);
  }
}
for (const [route, source] of Object.entries(betaOverrides)) {
  if (source === 'site') continue;
  const title = route.endsWith('/validation/') ? 'Validation' : route.endsWith('/translation/') ? 'Translation' : 'Document-level validation hints';
  write(resolve(output, beta.prefix.slice(1), route.slice(1).replace(/\/$/, '') + '.md'), versionLinks(imported(source, title), beta));
}
// Normative routes stay explicitly versioned, consistent with existing published links.
for (const [source, route, title] of [
  [`spec/cmmf-v${betaVersion}.md`, `/spec/${betaVersion}/`, `CMMF ${betaVersion} specification`],
  [`spec/translation-contract-v${betaVersion}.md`, `/spec/${betaVersion}/translation-contract/`, `Translation contract ${betaVersion}`],
]) write(resolve(output, route.slice(1).replace(/\/$/, '') + '.md'), versionLinks(imported(source, title, true), beta));
const authored = files(resolve(root, 'src/content/beta'));
for (const file of authored) {
  let text = readFileSync(file, 'utf8');
  const target = resolve(output, beta.prefix.slice(1), relative(resolve(root, 'src/content/beta'), file));
  text = text.replace(/<!-- beta-file: ([a-z0-9/.-]+) -->/g, (_, path) => `\n\`\`\`yaml title="${path}"\n${readFileSync(resolve(root, beta.snapshot, path), 'utf8').trimEnd()}\n\`\`\`\n`);
  write(target, versionLinks(text, beta));
}
// Package both complete sets using the matching schema and exact upstream checker.
const customerSource = resolve(root, '.generated/customer-story-beta');
rmSync(customerSource, { recursive: true, force: true });
cpSync(resolve(root, 'examples/customer-story/models'), resolve(customerSource, 'models'), { recursive: true });
write(resolve(customerSource, 'manifest.yaml'), readFileSync(resolve(root, 'examples/customer-story/manifest.yaml'), 'utf8').replace(stableVersion, betaVersion));
const sets = [
  { id: 'article', name: 'Article and Subscription', source: beta.snapshot + '/examples', downloadPath: '', bundleFile: 'article.models.json' },
  { id: 'customer-story', name: 'Customer Story', source: customerSource, downloadPath: 'customer-story', bundleFile: 'customer-story.models.json' },
];
prepareExampleDownloads(root, { ...lock, snapshot: beta.snapshot }, sets);
prepareDiagrams(root, betaVersion, sets);
write(resolve(root, `public/schemas/${betaVersion}/model.schema.json`), readFileSync(resolve(root, beta.snapshot, 'schemas/model.schema.json')));
for (const path of Object.keys(lock.files).filter(p => p.endsWith('.md'))) write(resolve(root, 'public/raw', betaVersion, path), readFileSync(resolve(root, beta.snapshot, path)));
// Version-pinned authored Markdown supports retrieval without interpreting MDX imports.
for (const edition of editions) for (const file of files(resolve(output, edition.prefix.slice(1)))) {
  const path = relative(resolve(output, edition.prefix.slice(1)), file).replace(/\.mdx$/, '.md');
  let text = readFileSync(file, 'utf8').replace(/^import \w+ from '[^']+';\n/gm, '').replace(/<(?:ModelDiagram|DownloadDiagram) variant="([^"]+)" \/>/g, (_, variant) => `Model diagram: https://cmmf.dev/downloads/diagrams/${edition.version}/${variant}-light.svg`);
  write(resolve(root, 'public/raw', edition.version, 'site', path), text);
}
const betaPages = [...routes].map(route => ({ route: beta.prefix + route, title: route.split('/').filter(Boolean).at(-1) }));
const llms = resolve(root, 'public/llms.txt');
write(llms, readFileSync(llms, 'utf8') + `\n## Experimental CMMF ${betaVersion}\n\nOpt in explicitly; stable/latest remains ${stableVersion}. Pinned upstream revision: ${lock.revision}.\n\n${betaPages.map(page => `- [${page.title}](https://cmmf.dev${page.route})`).join('\n')}\n- [Beta specification](https://cmmf.dev/spec/${betaVersion}/)\n- [Beta translation contract](https://cmmf.dev/spec/${betaVersion}/translation-contract/)\n- [Beta schema](https://cmmf.dev/schemas/${betaVersion}/model.schema.json)\n`);
write(resolve(root, '.generated/versions.json'), JSON.stringify({ editions, routes: [...routes] }, null, 2));
console.log(`Prepared stable pinned edition and experimental ${betaVersion} docs, normative text and complete example sets.`);
