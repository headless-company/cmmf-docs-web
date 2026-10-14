import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { loadModelSet, validateModelSet } from './lib/model-set.mjs';

const root = resolve(import.meta.dirname, '..');
const schema = JSON.parse(readFileSync(resolve(root, 'vendor/cmmf/schemas/model.schema.json'), 'utf8'));
const original = loadModelSet(resolve(root, 'examples/customer-story'), '1.2.0');
const copy = () => structuredClone(original);

test('valid tutorial has three models and both relationships resolve', () => {
  assert.equal(validateModelSet(original, schema).length, 3);
});
test('1.2 migration preserves legacy repeatability and rejects contradictory flags', () => {
  const legacy = copy();
  const field = legacy.models.find(m => m.id === 'customer-story').fields.find(f => f.id === 'customer');
  delete field.list;
  field.relation.cardinality = 'many';
  validateModelSet(legacy, schema);
  const migrated = structuredClone(legacy);
  const after = migrated.models.find(m => m.id === 'customer-story').fields.find(f => f.id === 'customer');
  after.list = true;
  delete after.relation.cardinality;
  validateModelSet(migrated, schema);
  assert.deepEqual(after.targets, field.targets);
  assert.equal(after.relation.ownership, field.relation.ownership);
  assert.equal(after.required, field.required);
  for (const [list, cardinality] of [[true, 'one'], [false, 'many']]) {
    after.list = list;
    after.relation.cardinality = cardinality;
    assert.throws(() => validateModelSet(migrated, schema), /false schema/);
  }
});
test('schema validity does not mask broken graph targets or object kinds', () => {
  const missing = copy();
  missing.models.find(m => m.id === 'customer-story').fields.find(f => f.id === 'customer').targets = ['customer-missing'];
  assert.throws(() => validateModelSet(missing, schema), /Missing target: customer-story.customer -> customer-missing/);
  const wrongKind = copy();
  wrongKind.models.find(m => m.id === 'quote').kind = 'entry';
  assert.throws(() => validateModelSet(wrongKind, schema), /Incorrect object kind: quote/);
  const embed = copy();
  embed.models.find(m => m.id === 'customer-story').fields.find(f => f.id === 'story').richTextConfig.embeds = [{ kind: 'reference', targets: ['absent'] }];
  assert.throws(() => validateModelSet(embed, schema), /Missing target.*absent/);
});
test('duplicate identities and missing editorial fields are rejected', () => {
  const duplicate = copy();
  duplicate.models.push(structuredClone(duplicate.models[0]));
  assert.throws(() => validateModelSet(duplicate, schema), /Duplicate model ID/);
  const field = copy();
  field.models[0].fields.push(structuredClone(field.models[0].fields[0]));
  assert.throws(() => validateModelSet(field, schema), /Duplicate field ID/);
  const preview = copy();
  preview.models[0].editorial.preview = { title: 'absent' };
  assert.throws(() => validateModelSet(preview, schema), /Missing editorial field/);
});
test('declared bounds must be coherent and counts must be whole non-negative values', () => {
  const bounds = copy();
  bounds.models.find(m => m.id === 'customer-story').fields[0].validations = { minLength: 100, maxLength: 5 };
  assert.throws(() => validateModelSet(bounds, schema), /minLength exceeds maxLength/);
  const count = copy();
  count.models[0].fields[0].validations = { maxLength: 1.5 };
  assert.throws(() => validateModelSet(count, schema), /non-negative integer/);
});
test('loader rejects version mismatches, duplicate YAML keys and paths outside the project', () => {
  const temporary = mkdtempSync(resolve(tmpdir(), 'cmmf-example-check-'));
  try {
    cpSync(resolve(root, 'examples/customer-story'), temporary, { recursive: true });
    assert.throws(() => loadModelSet(temporary, '1.1.0'), /specVersion/);
    writeFileSync(resolve(temporary, 'manifest.yaml'), 'specVersion: "1.2.0"\nnamespace: test\nmodelsPath: ../outside\n');
    assert.throws(() => loadModelSet(temporary, '1.2.0'), /stay inside/);
    writeFileSync(resolve(temporary, 'manifest.yaml'), 'specVersion: "1.2.0"\nnamespace: test\nnamespace: duplicate\nmodelsPath: ./models\n');
    assert.throws(() => loadModelSet(temporary, '1.2.0'), /unique|Duplicate/i);
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
