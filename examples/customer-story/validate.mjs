import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadModelSet, validateModelSet } from './validation.mjs';

try {
  const root = fileURLToPath(new URL('./', import.meta.url));
  const schema = JSON.parse(readFileSync(new URL('./schemas/model.schema.json', import.meta.url), 'utf8'));
  const { manifest, models } = loadModelSet(root, '1.2.0');
  validateModelSet({ manifest, models }, schema);
  console.log(`Valid CMMF ${manifest.specVersion} model set: ${models.length} models. Schema, manifest, IDs, references, editorial fields and constraint bounds pass.`);
  console.log('This checks model definitions. It does not validate authored content, quote approval or CMS implementation.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
