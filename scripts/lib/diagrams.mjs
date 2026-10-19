import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderMermaidSVG } from 'beautiful-mermaid';
import { loadModelSet } from './model-set.mjs';
import { exampleSets } from './examples.mjs';

export function prepareDiagrams(root, version, sets = exampleSets) {
  const folder = resolve(root, 'public/downloads/diagrams', version);
  mkdirSync(folder, { recursive: true });
  const font = readFileSync(resolve(root, 'brand/fonts/source-sans-3-latin-400-normal.woff2')).toString('base64');
  const mediumFont = readFileSync(resolve(root, 'brand/fonts/source-sans-3-latin-500-normal.woff2')).toString('base64');
  const licence = readFileSync(resolve(root, 'brand/fonts/Source-Sans-3-OFL.txt'), 'utf8').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  for (const example of sets) {
    const { models } = loadModelSet(resolve(root, example.source), version);
    const ids = new Map(models.map((model, i) => [model.id, `m${i}`]));
    const safe = value => value.replace(/["<>\[\]\n]/g, '');
    const nodes = models.map(model => `  ${ids.get(model.id)}["${safe(model.name)} · ${model.kind}"]`);
    const relationships = models.flatMap(model => model.fields.flatMap(field => {
      const targets = field.objectType ? [field.objectType] : field.targets || [];
      const embeds = (field.richTextConfig?.embeds || []).flatMap(embed => embed.targets || []);
      return [...targets, ...embeds].map(target => {
        const verb = field.objectType ? 'embeds' : embeds.includes(target) ? 'rich-text reference' : 'links';
        return `  ${ids.get(model.id)} -->|"${safe(field.id)} · ${verb}${field.list ? ' · list' : ''}"| ${ids.get(target)}`;
      });
    }));
    const source = `flowchart TB\n${[...nodes, ...relationships].join('\n')}\n`;
    const description = relationships.map(line => line.replace(/m\d+/g, id => safe(models.find(model => ids.get(model.id) === id).name)).replace(/\s+-->/g, '').replace(/[|"\s]+/g, ' ').trim()).join('; ');
    writeFileSync(resolve(folder, `${example.id}.mmd`), source);
    for (const [theme, bg, fg] of [['light', '#F6F7F3', '#192329'], ['dark', '#192329', '#F6F7F3']]) {
      let svg = renderMermaidSVG(source, { bg, fg, muted: fg, font: 'Source Sans 3', padding: 32 });
      svg = svg.replace('<svg ', '<svg role="img" aria-labelledby="diagram-title diagram-description" ');
      svg = svg.replace(/(<svg[^>]*>)/, `$1<title id="diagram-title">${example.name} model relationships</title><desc id="diagram-description">${description}</desc><metadata>Embedded Source Sans 3 font licence:\n${licence}</metadata><style>svg{font-synthesis:none}@font-face{font-family:'Source Sans 3';font-weight:400;src:url(data:font/woff2;base64,${font}) format('woff2')}@font-face{font-family:'Source Sans 3';font-weight:500;src:url(data:font/woff2;base64,${mediumFont}) format('woff2')}</style>`);
      writeFileSync(resolve(folder, `${example.id}-${theme}.svg`), svg);
    }
  }
}
