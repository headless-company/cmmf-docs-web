import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadModelSet, validateModelSet } from './validation.mjs';

try {
  const root = fileURLToPath(new URL('./', import.meta.url));
  const schema = JSON.parse(readFileSync(new URL('./schemas/model.schema.json', import.meta.url), 'utf8'));
  const { manifest, models } = loadModelSet(root, '1.2.0');
  validateModelSet({ manifest, models }, schema);
  writeFileSync(new URL('./models.json', import.meta.url), `${JSON.stringify({ name: manifest.namespace, models }, null, 2)}\n`);
  console.log(`Wrote models.json from ${models.length} validated YAML models. Import this file into Studio; it contains no canvas layout.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
