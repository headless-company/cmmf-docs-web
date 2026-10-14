import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { exampleSets } from './lib/examples.mjs';
import { loadModelSet, validateModelSet } from './lib/model-set.mjs';

const root = resolve(import.meta.dirname, '..');
const lock = JSON.parse(readFileSync(resolve(root, 'cmmf-source.lock.json'), 'utf8'));
const schema = JSON.parse(readFileSync(resolve(root, 'vendor/cmmf/schemas/model.schema.json'), 'utf8'));
for (const example of exampleSets) {
  const set = loadModelSet(resolve(root, example.source), lock.specVersion);
  validateModelSet(set, schema);
  console.log(`Validated ${example.name}: ${set.models.length} complete models; schema, manifest, IDs, references, editorial fields and constraint bounds pass.`);
}
console.log('Content instances and CMS mappings are outside this check.');
