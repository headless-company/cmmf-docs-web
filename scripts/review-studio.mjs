// Optional integration check against an explicitly supplied local Studio build.
// The documentation build never reads or depends on the editor repository.
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';
import { unzipSync } from 'fflate';
import { parse } from 'yaml';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
if (!process.argv[2]) throw new Error('Usage: node scripts/review-studio.mjs /path/to/studio/dist');
const studio = resolve(process.argv[2]);
const output = resolve(root, 'artifacts/site-review/studio-integration');
mkdirSync(output, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.json': 'application/json' };
const server = createServer((req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (path === '/') path = '/index.html';
    const file = resolve(studio, `.${path}`);
    if (!file.startsWith(studio + sep) || !existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
    res.end(readFileSync(file));
  } catch { res.writeHead(500).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const edge = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
let browser;
const errors = [];
try {
  browser = await chromium.launch({ executablePath: process.env.CMMF_BROWSER_EXECUTABLE || (existsSync(edge) ? edge : undefined), headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', acceptDownloads: true });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  const file = resolve(root, 'dist/downloads/examples/1.2.0/customer-story/customer-story.models.json');
  const original = JSON.parse(readFileSync(file, 'utf8'));
  async function importFile(path, layout) {
    await page.getByRole('button', { name: 'Import', exact: true }).click();
    await page.getByLabel('Import layout').selectOption(layout);
    const choosing = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Choose file', exact: true }).click();
    await (await choosing).setFiles(path);
    await page.getByText('Workspace imported. Undo restores your previous board.', { exact: true }).waitFor();
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('cmmf-studio') || '{}').models?.some(m => m.id === 'quote'));
  }
  await importFile(file, 'connections');
  const imported = await page.evaluate(() => JSON.parse(localStorage.getItem('cmmf-studio')));
  assert.deepEqual(imported.models, original.models);
  assert.equal(imported.models.length, 3);
  await page.getByText('Model checks passed', { exact: true }).waitFor();
  assert.equal(await page.locator('.react-flow__edge').count(), 2);
  await page.getByTitle('Fit whole model', { exact: true }).click();
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.canvas').getBoundingClientRect();
    return [...document.querySelectorAll('.react-flow__node')].every(node => {
      const rect = node.getBoundingClientRect();
      return rect.x >= canvas.x && rect.right <= canvas.right && rect.y >= canvas.y && rect.bottom <= canvas.bottom;
    });
  });
  if (await page.getByLabel('Dismiss notification').count()) await page.getByLabel('Dismiss notification').click();
  await page.screenshot({ path: resolve(output, 'customer-story-import.png') });

  await page.getByTitle('Edit Summary', { exact: true }).click();
  const panel = page.getByRole('dialog', { name: 'Field details', exact: true });
  await panel.getByRole('button', { name: 'Rules', exact: true }).click();
  await panel.getByLabel('Maximum characters', { exact: true }).fill('200');
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('cmmf-studio')).models.find(m => m.id === 'customer-story').fields.find(f => f.id === 'summary').validations.maxLength === 200);
  await page.screenshot({ path: resolve(output, 'customer-story-summary-rules.png') });
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: /^Export/ }).click();
  let downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: /Save workspace/ }).click();
  const workspacePath = resolve(output, 'workspace.cmmf.json');
  await (await downloading).saveAs(workspacePath);
  const workspace = JSON.parse(readFileSync(workspacePath, 'utf8'));
  assert.equal(workspace.models.find(m => m.id === 'customer-story').fields.find(f => f.id === 'summary').validations.maxLength, 200);

  await page.getByRole('button', { name: /^Export/ }).click();
  downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: /CMMF models/ }).click();
  const zipPath = resolve(output, 'cmmf-models.zip');
  await (await downloading).saveAs(zipPath);
  const files = unzipSync(new Uint8Array(readFileSync(zipPath)));
  const modelFiles = Object.entries(files).filter(([name]) => name.startsWith('models/') && name.endsWith('.yaml'));
  assert.equal(modelFiles.length, 3);
  for (const [name, bytes] of modelFiles) {
    const model = parse(Buffer.from(bytes).toString());
    assert.deepEqual(model, workspace.models.find(m => m.id === model.id));
    const target = resolve(output, name);
    mkdirSync(resolve(output, 'models'), { recursive: true });
    writeFileSync(target, bytes);
  }
  assert.ok(!Object.keys(files).includes('manifest.yaml'));
  await importFile(workspacePath, 'saved');
  const restored = await page.evaluate(() => JSON.parse(localStorage.getItem('cmmf-studio')));
  assert.deepEqual(restored.models, workspace.models);
  assert.deepEqual(restored.positions, workspace.positions);
  assert.deepEqual(restored.routes, workspace.routes);
  assert.deepEqual(errors, []);
  writeFileSync(resolve(output, 'report.json'), JSON.stringify({ result: 'pass', modelCount: 3, relationships: 2, checks: ['Complete website JSON imported without loss', 'Summary limit edited to 200', 'Workspace saved', 'Three portable YAML models exported', 'Manifest correctly absent from Studio export', 'Workspace model, position and route round trip'], runtime: studio }, null, 2));
  console.log('Studio integration passes: complete import, field edit, workspace save/restore and lossless YAML export.');
  await context.close();
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
