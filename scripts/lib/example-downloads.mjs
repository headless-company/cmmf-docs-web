import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { zipSync, unzipSync } from 'fflate';
import { exampleSets } from './examples.mjs';
import { loadModelSet, validateModelSet } from './model-set.mjs';

export function exampleFiles(root, example, lock) {
  const schemaBytes = readFileSync(resolve(root, 'vendor/cmmf/schemas/model.schema.json'));
  const set = loadModelSet(resolve(root, example.source), lock.specVersion);
  validateModelSet(set, JSON.parse(schemaBytes.toString()));
  const template = resolve(root, 'examples/customer-story');
  const inputs = {
    'manifest.yaml': readFileSync(resolve(root, example.source, 'manifest.yaml')),
    'schemas/model.schema.json': schemaBytes,
    'SCHEMA-LICENSE.md': readFileSync(resolve(root, 'vendor/cmmf/LICENSE.md')),
    'validation.mjs': readFileSync(resolve(root, 'scripts/lib/model-set.mjs')),
    'validate.mjs': readFileSync(resolve(template, 'validate.mjs')),
    'bundle.mjs': readFileSync(resolve(template, 'bundle.mjs')),
    'package.json': readFileSync(resolve(template, 'package.json')),
    'package-lock.json': readFileSync(resolve(template, 'package-lock.json')),
    [example.bundleFile]: Buffer.from(`${JSON.stringify({ name: `${example.name} tutorial`, models: set.models }, null, 2)}\n`),
    'SOURCE.md': Buffer.from(`# Source evidence\n\nModel set: ${example.name}. Format: CMMF ${lock.specVersion}.\n\nSchema source: ${lock.repository}\nRevision: ${lock.revision}\nSchema SHA-256: ${lock.files['schemas/model.schema.json']}\n\n${example.id === 'customer-story' ? 'Tutorial model files are owned by the CMMF documentation website.' : 'Canonical model/manifest files retain exact upstream bytes and the upstream Apache-2.0 licence.'}\nStudio import JSON is generated from those same YAML models. Its root is a tool import bundle, not a normative manifest or saved Studio workspace.\nSCHEMA-LICENSE.md covers the upstream schema; it does not assign a licence to the whole website.\n`),
  };
  const packageJson = JSON.parse(inputs['package.json']);
  const packageLock = JSON.parse(inputs['package-lock.json']);
  packageJson.name = packageLock.name = packageLock.packages[''].name = `cmmf-${example.id}-example`;
  inputs['package.json'] = Buffer.from(`${JSON.stringify(packageJson, null, 2)}\n`);
  inputs['package-lock.json'] = Buffer.from(`${JSON.stringify(packageLock, null, 2)}\n`);
  inputs['README.md'] = example.id === 'customer-story' ? readFileSync(resolve(template, 'README.md')) : Buffer.from(`# Article model project\n\nFour canonical CMMF ${lock.specVersion} model definitions. Extract the ZIP, then use Node 22.12+ to run \`npm ci\` and \`npm run validate\`.\n\nFor Studio, import \`${example.bundleFile}\` after backing up your current board. Studio does not import ZIPs. Save workspace JSON to preserve its layout. Keep the manifest and validation files when bringing exported model YAML back into this project.\n\nSource and licence boundaries are recorded in SOURCE.md and SCHEMA-LICENSE.md.\n`);
  for (const file of set.files) inputs[`models/${file}`] = readFileSync(resolve(root, example.source, 'models', file));
  return Object.fromEntries(Object.entries(inputs).sort(([a], [b]) => a.localeCompare(b)));
}

export function prepareExampleDownloads(root, lock) {
  const base = resolve(root, 'public/downloads/examples', lock.specVersion);
  for (const example of exampleSets) {
    const entries = exampleFiles(root, example, lock);
    const folder = resolve(base, example.downloadPath);
    for (const [name, bytes] of Object.entries(entries)) {
      const target = resolve(folder, name);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, bytes);
    }
    const zip = zipSync(Object.fromEntries(Object.entries(entries).map(([name, bytes]) => [name, new Uint8Array(bytes)])), { level: 9, mtime: new Date(1980, 0, 1) });
    writeFileSync(resolve(base, `${example.id}.zip`), zip);
  }
}

export function checkExampleDownloads(root, dist, lock) {
  for (const example of exampleSets) {
    const expected = exampleFiles(root, example, lock);
    const base = resolve(dist, 'downloads/examples', lock.specVersion);
    const archive = unzipSync(new Uint8Array(readFileSync(resolve(base, `${example.id}.zip`))));
    if (JSON.stringify(Object.keys(archive).sort()) !== JSON.stringify(Object.keys(expected).sort())) throw new Error(`Incomplete example archive: ${example.id}`);
    for (const [name, bytes] of Object.entries(expected)) {
      if (!Buffer.from(archive[name]).equals(bytes)) throw new Error(`ZIP file differs from its source: ${example.id}/${name}`);
      if (!readFileSync(resolve(base, example.downloadPath, name)).equals(bytes)) throw new Error(`Download differs from its source: ${example.id}/${name}`);
    }
    const schema = JSON.parse(Buffer.from(archive['schemas/model.schema.json']).toString());
    const bundle = JSON.parse(Buffer.from(archive[example.bundleFile]).toString());
    const original = loadModelSet(resolve(root, example.source), lock.specVersion);
    if (JSON.stringify(bundle.models) !== JSON.stringify(original.models)) throw new Error(`Studio bundle differs from YAML models: ${example.id}`);
    validateModelSet({ manifest: original.manifest, models: bundle.models }, schema);
  }
  console.log('Verified both complete example ZIPs, portable validators, schemas and Studio model-import bundles against source bytes.');
}
