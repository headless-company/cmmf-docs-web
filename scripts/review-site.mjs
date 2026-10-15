import { createServer } from 'node:http';
import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const engine = process.env.CMMF_BROWSER_ENGINE || 'chromium';
const browserType = { chromium, webkit }[engine];
if (!browserType) throw new Error(`Unsupported CMMF_BROWSER_ENGINE: ${engine}`);
const output = resolve(root, 'artifacts/site-review', engine === 'webkit' ? 'webkit' : '.');
mkdirSync(output, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.wasm': 'application/wasm' };
const server = createServer((req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(dist, `.${path}`);
    if (!file.startsWith(dist + sep) && file !== dist) { res.writeHead(403).end(); return; }
    if (path.endsWith('/')) file = resolve(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', mime[extname(file)] || 'text/plain');
    res.end(readFileSync(file));
  } catch { res.writeHead(500).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const edge = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
const executablePath = process.env.CMMF_BROWSER_EXECUTABLE || (existsSync(edge) ? edge : undefined);
let browser;
const report = { engine, templates: [], interactions: [], accessibility: [], errors: [], failedRequests: [] };
// Starlight imports Pagefind on requestIdleCallback after the page's load event.
// Wait for its hidden search input before navigating away or closing a context.
const searchReady = async page => {
  await page.waitForLoadState('networkidle');
  await page.locator('.pagefind-ui__search-input').waitFor({ state: 'attached' });
};
try {
  browser = await browserType.launch({ executablePath: engine === 'chromium' ? executablePath : undefined, headless: true });
  for (const theme of ['light', 'dark']) for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', e => report.errors.push(`${page.url()}: ${e.message}\n${e.stack || ''}`));
    page.on('requestfailed', request => report.failedRequests.push({ page: page.url(), url: request.url(), error: request.failure()?.errorText }));
    page.on('response', r => { if (r.status() >= 400) report.errors.push(`${r.status()} ${r.url()}`); });
    for (const [name, route] of [['home', '/'], ['article', '/learn/why-cmmf/'], ['reference', '/docs/reference/canonical-types/'], ['first-model', '/docs/get-started/first-model/'], ['customer-story', '/examples/customer-story/'], ['tools', '/tools/'], ['skills', '/tools/skills/'], ['diagrams', '/docs/guides/visualisation/'], ['migration', '/docs/guides/migrate-to-1-2/']]) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await searchReady(page);
      await page.evaluate(async () => {
        await Promise.all(['16px "Source Sans 3"', '20px "Quattrocento"', '600 44px "Reem Kufi"'].map(font => document.fonts.load(font)));
        await document.fonts.ready;
      });
      if (name === 'diagrams') {
        for (const diagram of await page.locator('.download-diagram img:visible').all()) {
          await diagram.scrollIntoViewIfNeeded();
          await diagram.evaluate(img => img.decode());
          assert.ok(await diagram.evaluate(img => img.naturalWidth > 300 && img.getBoundingClientRect().height > 100), 'SVG diagram failed to render');
        }
        await page.locator('.download-diagram').first().scrollIntoViewIfNeeded();
        if (width === 390) {
          const frame = page.locator('.diagram-viewport').last();
          await frame.focus();
          await page.keyboard.press('ArrowRight');
          await page.waitForFunction(() => [...document.querySelectorAll('.diagram-viewport')].at(-1).scrollLeft > 0);
          await frame.evaluate(el => { el.scrollLeft = 0; });
        }
        await page.screenshot({ path: resolve(output, `diagram-detail-${width}-${theme}.png`) });
        await page.evaluate(() => scrollTo(0, 0));
      }
      await page.screenshot({ path: resolve(output, `${name}-${width}-${theme}.png`), fullPage: true });
      await page.screenshot({ path: resolve(output, `${name}-${width}-${theme}-viewport.png`) });
      const metrics = await page.evaluate(() => {
        const rect = el => { const r = el.getBoundingClientRect(); return { width: r.width, height: r.height, x: r.x, y: r.y }; };
        const logos = [...document.querySelectorAll('.brand-logo img')].filter(el => getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0).map(el => ({ ...rect(el), naturalWidth: el.naturalWidth, naturalHeight: el.naturalHeight, src: el.getAttribute('src') }));
        const article = document.querySelector('.sl-markdown-content');
        const prose = document.querySelector('.sl-markdown-content > p');
        return {
          theme: document.documentElement.dataset.theme,
          scrollWidth: document.documentElement.scrollWidth,
          viewport: innerWidth,
          logos,
          articleFont: getComputedStyle(article).fontFamily,
          prose: prose ? { ...rect(prose), font: getComputedStyle(prose).fontFamily, size: getComputedStyle(prose).fontSize, lineHeight: getComputedStyle(prose).lineHeight } : null,
          fonts: { interface: document.fonts.check('16px "Source Sans 3"'), reading: document.fonts.check('20px "Quattrocento"'), display: document.fonts.check('600 44px "Reem Kufi"') },
        };
      });
      assert.equal(metrics.theme, theme);
      assert.ok(metrics.scrollWidth <= width + 1, `${name} overflows at ${width}: ${metrics.scrollWidth}`);
      const requiredFonts = name === 'home' ? ['interface', 'reading', 'display'] : name !== 'reference' ? ['interface', 'reading'] : ['interface'];
      assert.ok(requiredFonts.every(font => metrics.fonts[font]), `Required font loading failed: ${name}/${width}/${theme}: ${JSON.stringify(metrics.fonts)}`);
      if (name === 'reference' && width === 390) {
        const table = page.locator('.sl-markdown-content table').first();
        assert.ok(await table.evaluate(el => el.scrollWidth > el.clientWidth), 'Mobile table should scroll');
        await table.focus();
        await page.keyboard.press('ArrowRight');
        await page.waitForFunction(() => document.querySelector('.sl-markdown-content table').scrollLeft > 0);
        await table.evaluate(el => { el.scrollLeft = 0; });
      }
      for (const logo of metrics.logos) {
        assert.ok(Math.abs(logo.width / logo.height - logo.naturalWidth / logo.naturalHeight) < .01, 'Logo was distorted');
        assert.ok(logo.width >= (logo.src.includes('expanded') ? 420 : 112) - .1, 'Logo below brand minimum');
      }
      if (name !== 'home' && name !== 'reference') assert.match(metrics.prose.font, /Quattrocento/);
      if (name === 'reference') assert.match(metrics.articleFont, /Source Sans 3/);
      report.templates.push({ name, width, theme, ...metrics });
      if (['home', 'article', 'reference', 'skills', 'diagrams'].includes(name)) {
        const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        report.accessibility.push({ name, width, theme, violations: violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
      }
    }
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await searchReady(page);
    // macOS WebKit uses Option+Tab to include links in keyboard navigation.
    await page.keyboard.press(engine === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.ok(page.url().endsWith('#_top'));
    if (width === 390) {
      await page.locator('.site-mobile-nav summary').click();
      await page.locator('.site-mobile-nav nav a').filter({ hasText: 'Documentation' }).click();
      assert.ok(page.url().endsWith('/docs/'));
      await searchReady(page);
      const button = page.locator('button[popovertarget="starlight__sidebar"]');
      await button.click();
      await page.locator('#starlight__sidebar a').filter({ hasText: 'Canonical types' }).click();
      assert.ok(page.url().endsWith('/docs/reference/canonical-types/'));
      await searchReady(page);
    }
    const themeSelect = page.locator('.header-utilities starlight-theme-select select');
    await themeSelect.selectOption(theme === 'light' ? 'dark' : 'light');
    await page.reload({ waitUntil: 'networkidle' });
    await searchReady(page);
    assert.equal(await page.locator('html').getAttribute('data-theme'), theme === 'light' ? 'dark' : 'light');
    report.interactions.push(`Keyboard skip link, navigation and theme persistence: ${width}/${theme}`);
    await context.close();
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(base + '/spec/1.2.0/translation-contract/');
  await page.getByRole('navigation', { name: 'Specification versions' }).getByRole('link', { name: '1.1.0 · Archived' }).click();
  assert.ok(page.url().endsWith('/spec/1.1.0/translation-contract/'));
  assert.equal(await page.locator('.spec-versions [aria-current]').textContent(), '1.1.0 · Archived');
  assert.ok(await page.getByText('A matching historical schema is not included.', { exact: false }).count());
  await page.getByRole('navigation', { name: 'Specification versions' }).getByRole('link', { name: '1.2.0 · Current' }).click();
  assert.ok(page.url().endsWith('/spec/1.2.0/translation-contract/'));
  report.interactions.push('Version switching preserves the translation-contract document and its archive notice');
  await page.goto(base + '/404.html');
  assert.equal(await page.locator('h1').textContent(), 'This page could not be found');
  await page.getByRole('link', { name: 'Browse documentation', exact: true }).click();
  assert.ok(page.url().endsWith('/docs/'));
  report.interactions.push('Dedicated custom 404 offers working recovery navigation');
  await page.goto(base + '/docs/');
  await page.locator('button[data-open-modal]').click();
  await page.locator('.pagefind-ui__search-input').fill('canonical');
  await page.locator('.pagefind-ui__result-link').first().waitFor();
  const results = await page.locator('.pagefind-ui__result-link').evaluateAll(links => links.map(a => ({ title: a.textContent, href: a.getAttribute('href') })));
  assert.ok(results.some(r => r.href.includes('/docs/reference/canonical-types/')), 'Reference missing from search');
  assert.ok(!results.some(r => r.href.includes('/spec/1.1.0')), 'Historical specification leaked into search');
  await page.locator('.pagefind-ui__search-input').fill('Studio');
  await page.waitForFunction(() => /No results/i.test(document.querySelector('.pagefind-ui__message')?.textContent || ''));
  assert.equal(await page.locator('.pagefind-ui__result-link').count(), 0);
  report.interactions.push('Held tool is absent from search');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').evaluate(d => d.open), false);
  report.interactions.push({ search: results });
  for (const route of ['/tools/studio/', '/docs/get-started/visual-modelling/', '/raw/site/tools/studio.md', '/raw/site/docs/get-started/visual-modelling.md', '/images/tutorials/customer-story-studio.png', '/images/tutorials/customer-story-summary-rules.png']) {
    assert.equal((await page.request.get(base + route)).status(), 404, `Held route is still public: ${route}`);
  }
  report.interactions.push('Held walkthroughs, raw Markdown and screenshots return 404');
  const raw = await page.request.get(base + '/schemas/1.2.0/model.schema.json');
  assert.equal(raw.status(), 200);
  assert.deepEqual(await raw.body(), readFileSync(resolve(root, 'vendor/cmmf/schemas/model.schema.json')));
  report.interactions.push('Schema download matches canonical bytes');
  await page.goto(base + '/');
  await page.getByRole('link', { name: /Explore the files and decisions/ }).click();
  assert.ok(page.url().endsWith('/examples/customer-story/'));
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download the complete Customer Story project' }).click();
  assert.equal((await download).suggestedFilename(), 'customer-story.zip');
  await page.getByRole('link', { name: 'Build your first model step by step' }).click();
  assert.ok(page.url().endsWith('/docs/get-started/first-model/'));
  await page.locator('a[href="/docs/guides/visualisation/"]').click();
  assert.ok(page.url().includes('/docs/guides/visualisation/'));
  report.interactions.push('Homepage → Customer Story → project download → first-model tutorial → relationship diagrams');
  for (const width of [320, 768, 1060]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/learn/why-cmmf/', '/docs/reference/canonical-types/']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Intermediate viewport overflow: ${width} ${route}`);
      const expanded = page.locator('.brand-logo-expanded img:visible');
      if (await expanded.count()) assert.ok((await expanded.boundingBox()).width >= 420, 'Expanded logo below minimum');
    }
    report.interactions.push(`Additional responsive widths: ${width}px, three templates`);
  }
  await context.close();
  assert.deepEqual(report.errors, []);
  writeFileSync(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  assert.deepEqual(report.accessibility.filter(result => result.violations.length), [], 'Automated WCAG checks found accessibility issues. See artifacts/site-review/report.json.');
  console.log(`Reviewed ${report.templates.length} template/theme/viewport combinations; fonts, logo geometry, overflow, navigation, theme persistence, search and downloads pass.`);
} finally {
  writeFileSync(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
