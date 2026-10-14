#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lines = readFileSync(resolve(root, 'SHA256SUMS'), 'utf8').trim().split('\n');
for (const line of lines) {
  const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
  if (!match || match[2].startsWith('/') || match[2].split('/').includes('..')) throw new Error('Invalid checksum record.');
  const actual = createHash('sha256').update(readFileSync(resolve(root, match[2]))).digest('hex');
  if (actual !== match[1]) throw new Error(`Handover integrity check failed: ${match[2]}`);
}
console.log(`Verified all ${lines.length} handover files. Use sync-cmmf.mjs --check for ongoing canonical-source checks after editing the project.`);
