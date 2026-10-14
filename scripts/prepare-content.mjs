import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, posix, resolve, relative } from 'node:path';
import { parse, stringify } from 'yaml';
import { prepareDiagrams } from './lib/diagrams.mjs';
import { prepareExampleDownloads } from './lib/example-downloads.mjs';
import { exampleSets } from './lib/examples.mjs';
import { loadModelSet } from './lib/model-set.mjs';

const root = resolve(import.meta.dirname, '..');
const map = JSON.parse(readFileSync(resolve(root, 'content-map.json'), 'utf8'));
const lock = JSON.parse(readFileSync(resolve(root, 'cmmf-source.lock.json'), 'utf8'));
const output = resolve(root, '.generated/docs');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(resolve(dir, e.name)) : [resolve(dir, e.name)]);
const write = (path, content) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); };
const sourceRoutes = new Map(map.pages.filter(p => p.route && p.source).map(p => [p.source, p.route]));
const authoredRaw = [];
sourceRoutes.set('vendor/cmmf/examples', '/examples/');
sourceRoutes.set('vendor/cmmf/examples/models', '/examples/article/#included-models');
function rewriteLinks(text, source) {
  return text.replace(/\]\(([^\s)]+)\)/g, (match, target) => {
    if (/^(?:[a-z]+:|\/|#)/i.test(target)) return match;
    const [path, fragment] = target.split('#');
    const destination = sourceRoutes.get(posix.normalize(posix.join(posix.dirname(source), path)).replace(/\/$/, ''));
    if (!destination) throw new Error(`Unmapped relative link: ${source} -> ${target}`);
    return `](${destination}${fragment ? `#${fragment}` : ''})`;
  });
}
for (const page of map.pages) {
  if (!page.route || page.owner === 'site' || !page.source.endsWith('.md')) continue;
  let text = readFileSync(resolve(root, page.source), 'utf8');
  text = rewriteLinks(text.replace(/^# [^\n]+\n+/, ''), page.source);
  const archived = page.role === 'normative-archive';
  const isNormative = page.role.startsWith('normative');
  const meta = {
    title: page.title,
    description: page.description || `${page.title} for CMMF ${page.sourceVersion}. ${isNormative ? 'Authoritative specification text.' : 'Imported from the canonical CMMF repository.'}`,
    editUrl: `https://github.com/headless-company/content-model-master-format/edit/main/${page.source.replace('vendor/cmmf/', '')}`,
    pagefind: !archived,
  };
  if (archived) text = `:::caution[Archived specification: ${page.sourceVersion}]\nThis page describes CMMF ${page.sourceVersion}. Current learning material and the bundled model schema target 1.2.0. A matching historical schema is not included.\n:::\n\n${text}`;
  text += `\n\n<div class="source-note">Source: <a href="${page.sourceUrl}">canonical ${page.sourceVersion} material at ${lock.revision.slice(0, 8)}</a> · <a href="/raw/${page.source.replace('vendor/cmmf/', '')}">Download original Markdown</a></div>\n`;
  write(resolve(output, `${page.route.replace(/^\//, '').replace(/\/$/, '')}.md`), `---\n${stringify(meta)}---\n\n${text}`);
}
for (const file of files(resolve(root, 'src/content/owned'))) {
  let text = readFileSync(file, 'utf8');
  text = text.replace(/<!-- canonical-file: ([a-z0-9/.-]+) -->/g, (_, path) => {
    if (!(path in lock.files)) throw new Error(`Unpinned excerpt: ${path}`);
    const lang = path.endsWith('.yaml') ? 'yaml' : 'text';
    return `\n\`\`\`${lang} title="${path}"\n${readFileSync(resolve(root, 'vendor/cmmf', path), 'utf8').trimEnd()}\n\`\`\`\n`;
  });
  text = text.replace(/<!-- example-file: ([a-z0-9-]+) ([a-z0-9/.-]+) -->/g, (_, id, path) => {
    const example = exampleSets.find(e => e.id === id);
    if (!example || !/^(manifest\.yaml|models\/[a-z0-9-]+\.yaml)$/.test(path)) throw new Error(`Unknown example excerpt: ${id}/${path}`);
    return `\n\`\`\`yaml title="${path}"\n${readFileSync(resolve(root, example.source, path), 'utf8').trimEnd()}\n\`\`\`\n`;
  });
  text = text.replace(/<!-- example-relationships: ([a-z0-9-]+) -->/g, (_, id) => {
    const example = exampleSets.find(e => e.id === id);
    if (!example) throw new Error(`Unknown example: ${id}`);
    const { models } = loadModelSet(resolve(root, example.source), lock.specVersion);
    const byId = new Map(models.map(model => [model.id, model]));
    const rows = models.flatMap(model => model.fields.flatMap(field => {
      const targets = field.objectType ? [field.objectType] : field.targets || [];
      return targets.map(target => `| ${model.name} → ${byId.get(target).name} | \`${field.id}\` | ${field.objectType ? 'Embedded object' : `Linked reference · ${field.required ? 'required' : 'optional'}`} |`);
    }));
    return `| Relationship | Field | Behaviour |\n| --- | --- | --- |\n${rows.join('\n')}`;
  });
  text = text.replace(/<!-- example-fields: ([a-z0-9-]+) ([a-z0-9-]+) ([a-z0-9,-]+) -->/g, (_, id, modelId, fields) => {
    const example = exampleSets.find(e => e.id === id);
    if (!example) throw new Error(`Unknown example: ${id}`);
    const { models } = loadModelSet(resolve(root, example.source), lock.specVersion);
    const model = models.find(m => m.id === modelId);
    const selected = fields.split(',').map(field => model?.fields.find(f => f.id === field));
    if (selected.some(field => !field)) throw new Error(`Unknown example fields: ${modelId}/${fields}`);
    return `\n\`\`\`yaml title="${modelId}.yaml — fields excerpt"\n${stringify(selected).trimEnd()}\n\`\`\`\n`;
  });
  text = text.replace(/<!-- example-diagram: (customer-story|article) -->/g, (_, variant) => {
    const generatedFile = resolve(output, file.slice(resolve(root, 'src/content/owned').length + 1));
    const component = relative(dirname(generatedFile), resolve(root, 'src/components/ModelDiagram.astro'));
    return `import ModelDiagram from '${component}';\n\n<ModelDiagram variant="${variant}" />`;
  });
  let diagramImported = false;
  text = text.replace(/<!-- download-diagram: (customer-story|article) -->/g, (_, variant) => {
    const generatedFile = resolve(output, file.slice(resolve(root, 'src/content/owned').length + 1));
    const component = relative(dirname(generatedFile), resolve(root, 'src/components/DownloadDiagram.astro'));
    const importLine = diagramImported ? '' : `import DownloadDiagram from '${component}';\n\n`;
    diagramImported = true;
    return `${importLine}<DownloadDiagram variant="${variant}" />`;
  });
  write(resolve(output, file.slice(resolve(root, 'src/content/owned').length + 1)), text);
  if (!file.endsWith('/404.md')) {
    const metadata = parse(text.match(/^---\n([\s\S]*?)\n---/)[1]);
    const path = file.slice(resolve(root, 'src/content/owned').length + 1).replace(/\.mdx$/, '.md');
    const body = text.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^import (?:ModelDiagram|DownloadDiagram)[^\n]+\n/gm, '').replace(/<(?:ModelDiagram|DownloadDiagram) variant="([^"]+)" \/>/g, (_, variant) => `Model relationships: https://cmmf.dev/downloads/diagrams/${lock.specVersion}/${variant}-light.svg`);
    authoredRaw.push({ path, title: metadata.title, text: `# ${metadata.title}\n\n> Website-owned explanation for CMMF ${lock.specVersion}.\n> Source: ${metadata.editUrl}\n${body}` });
  }
}
for (const directory of ['brand', 'schemas', 'downloads', 'raw']) rmSync(resolve(root, 'public', directory), { recursive: true, force: true });
// Publish runtime artwork, icons and font licences, rather than kit studies/head snippets.
cpSync(resolve(root, 'brand/logos'), resolve(root, 'public/brand/logos'), { recursive: true });
mkdirSync(resolve(root, 'public/brand/web/cmmf'), { recursive: true });
for (const path of files(resolve(root, 'brand/web/cmmf')).filter(p => /\.(png|svg|ico)$/.test(p))) {
  cpSync(path, resolve(root, 'public/brand/web/cmmf', posix.basename(path)));
}
mkdirSync(resolve(root, 'public/brand/fonts'), { recursive: true });
for (const path of files(resolve(root, 'brand/fonts')).filter(p => p.endsWith('.txt'))) {
  cpSync(path, resolve(root, 'public/brand/fonts', posix.basename(path)));
}
mkdirSync(resolve(root, `public/schemas/${lock.specVersion}`), { recursive: true });
cpSync(resolve(root, 'vendor/cmmf/schemas/model.schema.json'), resolve(root, `public/schemas/${lock.specVersion}/model.schema.json`));
prepareExampleDownloads(root, lock);
prepareDiagrams(root, lock.specVersion);
for (const path of Object.keys(lock.files).filter(p => p.endsWith('.md'))) {
  const target = resolve(root, 'public/raw', path);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(resolve(root, 'vendor/cmmf', path), target);
}
for (const article of authoredRaw) write(resolve(root, 'public/raw/site', article.path), article.text);
const current = map.pages.filter(page => page.route && page.route.endsWith('/') && page.route !== '/' && !page.role.includes('archive') && page.status.startsWith('implemented'));
write(resolve(root, 'public/llms.txt'), `# CMMF\n\n> A portable format for content models and the intent behind them.\n\nThis website documents CMMF ${lock.specVersion}, pinned at ${lock.revision}. Specifications are normative; site-owned explanations are interpretations. Tool evidence may include development working-tree snapshots and is not a release claim.\n\n## Current documentation\n\n${current.map(page => {
  const source = page.siteSource || page.source;
  const raw = source?.startsWith('vendor/cmmf/') ? '/raw/' + source.slice(12) : '/raw/site/' + source?.replace('src/content/owned/', '').replace(/\.mdx$/, '.md');
  return `- [${page.title}](https://cmmf.dev${page.route}): ${page.owner === 'upstream' ? 'Pinned upstream material' : 'Website explanation'}. Markdown: https://cmmf.dev${raw}`;
}).join('\n')}\n\n## Machine-readable assets\n\n- [1.2.0 model schema](https://cmmf.dev/schemas/1.2.0/model.schema.json)\n- [Customer Story complete project](https://cmmf.dev/downloads/examples/1.2.0/customer-story.zip)\n- [Article complete project](https://cmmf.dev/downloads/examples/1.2.0/article.zip)\n\n## Historical material\n\n- [1.1.0 specification](https://cmmf.dev/spec/1.1.0/): archived; matching historical schema is not bundled.\n`);
console.log(`Prepared pinned CMMF ${lock.specVersion} content, website articles and exact raw assets.`);
