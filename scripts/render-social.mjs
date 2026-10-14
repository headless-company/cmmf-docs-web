import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

// This authoring command produces a tracked PNG; normal site builds need no browser.
const root = resolve(import.meta.dirname, '..');
const font = (name, file, weight) => `@font-face{font-family:'${name}';font-weight:${weight};src:url(data:font/woff2;base64,${readFileSync(resolve(root, 'brand/fonts', file)).toString('base64')}) format('woff2')}`;
const logo = readFileSync(resolve(root, 'brand/logos/cmmf/cmmf-expanded-gradient-light.svg')).toString('base64');
const edge = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
const browser = await chromium.launch({ executablePath: process.env.CMMF_BROWSER_EXECUTABLE || (existsSync(edge) ? edge : undefined), headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><head><style>${font('Reem Kufi', 'reem-kufi-latin-600-normal.woff2', 600)}${font('Source Sans 3', 'source-sans-3-latin-400-normal.woff2', 400)}*{box-sizing:border-box}body{margin:0;background:#F6F7F3;color:#192329;font-synthesis:none;padding:56px 72px}img{display:block;width:460px;height:auto}h1{font:600 52px/1.22 'Reem Kufi';margin:52px 0 24px;max-width:1000px}p{font:400 24px/1.5 'Source Sans 3';margin:0;color:#58666B}.address{position:absolute;right:72px;bottom:54px}</style></head><body><img src="data:image/svg+xml;base64,${logo}" alt="CMMF — Content Model Master Format"><h1>A portable format for content models<br>and the intent behind them.</h1><p>Documentation · CMMF 1.2.0</p><p class="address">cmmf.dev</p></body></html>`);
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())); });
  if (!await page.evaluate(() => document.fonts.check('600 52px "Reem Kufi"') && document.fonts.check('24px "Source Sans 3"'))) throw new Error('Social preview fonts did not load.');
  mkdirSync(resolve(root, 'public/images/social'), { recursive: true });
  await page.screenshot({ path: resolve(root, 'public/images/social/cmmf-docs.png') });
  console.log('Rendered 1200 × 630 social preview with approved outlined artwork and local fonts.');
} finally { await browser.close(); }
