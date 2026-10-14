import { readFileSync, readdirSync, lstatSync, realpathSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { parseDocument } from 'yaml';
import Ajv from 'ajv';

function yamlFile(path) {
  const document = parseDocument(readFileSync(path, 'utf8'), { uniqueKeys: true });
  if (document.errors.length) throw new Error(`${path}: ${document.errors.map(e => e.message).join('; ')}`);
  return document.toJS();
}

export function loadModelSet(folder, version) {
  const manifest = yamlFile(resolve(folder, 'manifest.yaml'));
  if (manifest?.specVersion !== version) throw new Error(`Manifest specVersion must be the string "${version}".`);
  if (typeof manifest.namespace !== 'string' || !manifest.namespace.trim()) throw new Error('Manifest namespace must be a non-empty string.');
  for (const [key, value] of Object.entries(manifest.defaults || {})) {
    if (!['required', 'localisation'].includes(key) || typeof value !== 'boolean') throw new Error(`Unsupported manifest default: ${key}`);
  }
  if (typeof manifest.modelsPath !== 'string') throw new Error('The example manifest must identify modelsPath.');
  const modelPath = resolve(folder, manifest.modelsPath);
  if (!modelPath.startsWith(resolve(folder) + sep)) throw new Error('modelsPath must stay inside the model project.');
  if (lstatSync(modelPath).isSymbolicLink()) throw new Error('Model directories must not be symlinks.');
  if (!realpathSync(modelPath).startsWith(realpathSync(folder) + sep)) throw new Error('modelsPath resolves outside the model project.');
  const files = readdirSync(modelPath).filter(file => /\.ya?ml$/.test(file)).sort();
  if (!files.length) throw new Error('No model YAML files found.');
  const models = files.map(file => {
    const path = resolve(modelPath, file);
    if (lstatSync(path).isSymbolicLink()) throw new Error('Model files must not be symlinks.');
    return yamlFile(path);
  });
  return { manifest, models, files };
}

export function validateModelSet({ manifest, models }, schema) {
  if (schema.title !== `CMMF ${manifest.specVersion} Model Schema`) throw new Error('Schema and manifest versions do not match.');
  const validate = new Ajv({ strict: false, allErrors: true }).compile(schema);
  const byId = new Map();
  for (const model of models) {
    if (!validate(model)) throw new Error(`${model?.id || 'Model'}: ${JSON.stringify(validate.errors)}`);
    if (byId.has(model.id)) throw new Error(`Duplicate model ID: ${model.id}`);
    byId.set(model.id, model);
    const ids = new Set();
    for (const field of model.fields) {
      if (ids.has(field.id)) throw new Error(`Duplicate field ID: ${model.id}.${field.id}`);
      ids.add(field.id);
      if (field.type === 'reference' && !field.targets.length) throw new Error(`Empty reference targets: ${model.id}.${field.id}`);
      if (field.type === 'enum' && (!field.values.length || field.values.some(v => !v.trim()) || new Set(field.values).size !== field.values.length)) throw new Error(`Empty, blank or duplicate enum options: ${model.id}.${field.id}`);
      for (const rule of [field.validations || {}, field.relation || {}]) {
        for (const [low, high] of [['minLength', 'maxLength'], ['min', 'max'], ['minItems', 'maxItems']]) {
          if (typeof rule[low] === 'number' && typeof rule[high] === 'number' && rule[low] > rule[high]) throw new Error(`${model.id}.${field.id}: ${low} exceeds ${high}`);
        }
        for (const key of ['minLength', 'maxLength', 'minItems', 'maxItems']) if (rule[key] !== undefined && (!Number.isInteger(rule[key]) || rule[key] < 0)) throw new Error(`${model.id}.${field.id}: ${key} must be a non-negative integer`);
      }
    }
    for (const id of [model.editorial?.labelField, ...Object.values(model.editorial?.preview || {})].filter(Boolean)) if (!ids.has(id)) throw new Error(`Missing editorial field: ${model.id}.${id}`);
  }
  for (const model of models) for (const field of model.fields) {
    const targets = [...(field.targets || []), ...(field.objectType ? [field.objectType] : []), ...(field.richTextConfig?.embeds || []).flatMap(e => e.targets || [])];
    for (const target of targets) if (!byId.has(target)) throw new Error(`Missing target: ${model.id}.${field.id} -> ${target}`);
    if (field.objectType && byId.get(field.objectType).kind !== 'object') throw new Error(`Incorrect object kind: ${field.objectType}`);
  }
  return models;
}
