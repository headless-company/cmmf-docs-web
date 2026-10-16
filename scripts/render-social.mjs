import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

// Optional authoring command. Normal builds use the tracked approved PNG.
// The matching brand SVG has outlined lettering and no external dependencies.
const root = resolve(import.meta.dirname, '..');
const artwork = readFileSync(resolve(root, 'brand/social/cmmf-social-preview.svg')).toString('base64');
const edge = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
const browser = await chromium.launch({ executablePath: process.env.CMMF_BROWSER_EXECUTABLE || (existsSync(edge) ? edge : undefined), headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><head><style>html,body{margin:0;width:1280px;height:640px}img{display:block;width:1280px;height:640px}</style></head><body><img src="data:image/svg+xml;base64,${artwork}" alt="CMMF — Content Model Master Format"></body></html>`);
  await page.evaluate(async () => { await Promise.all([...document.images].map(image => image.decode())); });
  mkdirSync(resolve(root, 'public/images/social'), { recursive: true });
  await page.screenshot({ path: resolve(root, 'public/images/social/cmmf-social-preview.png') });
  console.log('Rendered the approved 1280 × 640 social preview from self-contained outlined brand artwork.');
} finally { await browser.close(); }
