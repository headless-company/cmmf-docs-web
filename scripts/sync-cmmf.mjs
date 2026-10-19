#!/usr/bin/env node
import { createHash, randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const options = {};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') options.check = true;
  else if (['--source', '--revision', '--spec-version', '--snapshot', '--lock'].includes(args[i]) && args[i + 1]) options[args[i].slice(2)] = args[++i];
  else throw new Error('Usage: node scripts/sync-cmmf.mjs [--check | --source /checkout] [--revision FULL_SHA --spec-version VERSION] [--snapshot vendor/DIR --lock LOCK.json]');
}
const lockPath = resolve(root, options.lock || 'cmmf-source.lock.json');
const snapshot = resolve(root, options.snapshot || 'vendor/cmmf');
if (![snapshot, lockPath].every(path => path.startsWith(root + '/'))) throw new Error('Snapshot and lock must stay inside the repository.');
const lock = JSON.parse(readFileSync(existsSync(lockPath) ? lockPath : join(root, 'cmmf-source.lock.json'), 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const paths = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  if (entry.isSymbolicLink()) throw new Error(`Symlink is not allowed in the snapshot: ${entry.name}`);
  const relative = entry.name;
  return entry.isDirectory() ? paths(join(directory, relative)).map(p => `${relative}/${p}`) : [relative];
}).sort();
function check() {
  if (!existsSync(snapshot)) throw new Error('Snapshot is missing. Run an explicit sync to restore it.');
  const actual = paths(snapshot);
  const expected = Object.keys(lock.files).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error('Snapshot file list differs from the source lock.');
  for (const [path, sha256] of Object.entries(lock.files)) {
    if (hash(readFileSync(join(snapshot, path))) !== sha256) throw new Error(`Snapshot was changed: ${path}`);
  }
}
if (options.check) {
  if (Object.keys(options).some(key => !['check', 'snapshot', 'lock'].includes(key))) throw new Error('--check cannot be combined with sync options.');
  check();
  console.log(`Verified ${Object.keys(lock.files).length} canonical files at ${lock.revision} (CMMF ${lock.specVersion}).`);
} else {
  if (existsSync(snapshot)) check(); // Preserve local edits instead of overwriting them.
  if (Boolean(options.revision) !== Boolean(options['spec-version'])) throw new Error('Updates require both --revision and --spec-version.');
  const revision = options.revision || lock.revision;
  const specVersion = options['spec-version'] || lock.specVersion;
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('Use a complete 40-character Git commit SHA.');
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.test(specVersion)) throw new Error('Use an explicit semver format version.');
  const temporary = mkdtempSync(join(tmpdir(), 'cmmf-source-'));
  const stage = join(root, 'vendor', `.cmmf-stage-${randomUUID()}`);
  const backup = join(root, 'vendor', `.cmmf-backup-${randomUUID()}`);
  let backedUp = false;
  try {
    const repo = options.source ? resolve(options.source) : join(temporary, 'upstream.git');
    const git = gitArgs => execFileSync('git', ['-C', repo, ...gitArgs], { maxBuffer: 32 * 1024 * 1024 });
    if (!options.source) {
      mkdirSync(repo);
      git(['init', '--bare', '--quiet']);
      git(['fetch', '--quiet', '--depth=1', lock.repository, revision]);
    }
    const resolvedRevision = git(['rev-parse', `${revision}^{commit}`]).toString().trim();
    if (resolvedRevision !== revision) throw new Error('The fetched commit does not match the requested pin.');
    const tree = git(['ls-tree', '-r', '-z', revision, '--', 'docs', 'spec', 'schemas', 'examples', 'scripts/validate-models.mjs', 'test/validation-hints.test.mjs', 'package.json', 'package-lock.json', 'README.md', 'CHANGELOG.md', 'LICENSE.md']).toString().split('\0').filter(Boolean);
    const files = {};
    mkdirSync(stage, { recursive: true });
    for (const row of tree) {
      const [metadata, path] = row.split('\t');
      if (!metadata.startsWith('100644 blob ') && !metadata.startsWith('100755 blob ')) throw new Error(`Unsupported upstream entry: ${path}`);
      if (!path || path.startsWith('/') || path.split('/').some(part => part === '..') || path.includes('\\')) throw new Error('Invalid upstream path.');
      const bytes = git(['show', `${revision}:${path}`]);
      mkdirSync(dirname(join(stage, path)), { recursive: true });
      writeFileSync(join(stage, path), bytes);
      files[path] = hash(bytes);
    }
    const schema = JSON.parse(readFileSync(join(stage, 'schemas/model.schema.json'), 'utf8'));
    if (schema.title !== `CMMF ${specVersion} Model Schema`) throw new Error('The schema does not match the requested format version.');
    const spec = readFileSync(join(stage, `spec/cmmf-v${specVersion}.md`), 'utf8');
    if (!spec.startsWith(`# Content Model Master Format (CMMF) ${specVersion}\n`)) throw new Error('The normative specification version does not match.');
    const manifest = readFileSync(join(stage, 'examples/manifest.yaml'), 'utf8');
    if (!manifest.includes(`specVersion: "${specVersion}"`)) throw new Error('The example manifest does not match the requested version.');
    const nextLock = { ...lock, revision, specVersion, files };
    if (existsSync(snapshot)) { renameSync(snapshot, backup); backedUp = true; }
    renameSync(stage, snapshot);
    try { writeFileSync(lockPath, `${JSON.stringify(nextLock, null, 2)}\n`); }
    catch (error) {
      rmSync(snapshot, { recursive: true, force: true });
      if (backedUp) { renameSync(backup, snapshot); backedUp = false; }
      throw error;
    }
    if (backedUp) { rmSync(backup, { recursive: true }); backedUp = false; }
    console.log(`Synced ${Object.keys(files).length} canonical files at ${revision} (CMMF ${specVersion}). Review the lock and snapshot diff before committing.`);
  } catch (error) {
    if (backedUp && !existsSync(snapshot)) renameSync(backup, snapshot);
    throw error;
  } finally {
    rmSync(temporary, { recursive: true, force: true });
    rmSync(stage, { recursive: true, force: true });
  }
}
