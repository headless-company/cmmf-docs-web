import { readFileSync } from 'node:fs';
import { checkManifest } from '../vendor/cmmf-beta/scripts/validate-models.mjs';
import { loadModelSet, validateModelSet } from './lib/model-set.mjs';
const { diagnostics } = await checkManifest('vendor/cmmf-beta/examples/manifest.yaml');
if (diagnostics.length) throw new Error(JSON.stringify(diagnostics));
validateModelSet(loadModelSet('vendor/cmmf-beta/examples', '1.3.0-beta.1'), JSON.parse(readFileSync('vendor/cmmf-beta/schemas/model.schema.json', 'utf8')));
console.log('Complete beta examples pass schema, hint semantics and model graph checks.');
