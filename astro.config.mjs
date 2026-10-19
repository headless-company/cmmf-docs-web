import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://cmmf.dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: page => !new URL(page).pathname.startsWith('/versions/1.2.0/') }), starlight({
    title: 'CMMF',
    routeMiddleware: './src/route-middleware.ts',
    description: 'A portable format for content models and the intent behind them.',
    favicon: '/brand/web/cmmf/favicon.svg',
    markdown: { processedDirs: ['.generated/docs'] },
    customCss: ['./brand/tokens/brand.css', './src/styles/site.css'],
    components: {
      Header: './src/components/Header.astro',
      PageTitle: './src/components/PageTitle.astro',
      Footer: './src/components/Footer.astro',
    },
    editLink: { baseUrl: 'https://github.com/headless-company/cmmf-docs-web/edit/main/' },
    head: [
      { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/brand/web/cmmf/apple-touch-icon.png' } },
      { tag: 'meta', attrs: { name: 'theme-color', content: '#192329' } },
      { tag: 'meta', attrs: { property: 'og:image', content: 'https://cmmf.dev/images/social/cmmf-social-preview.png' } },
      { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
      { tag: 'meta', attrs: { property: 'og:image:width', content: '1280' } },
      { tag: 'meta', attrs: { property: 'og:image:height', content: '640' } },
      { tag: 'meta', attrs: { property: 'og:image:alt', content: 'CMMF — Content Model Master Format' } },
      { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://cmmf.dev/images/social/cmmf-social-preview.png' } },
      { tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'CMMF — Content Model Master Format' } },
    ],
    sidebar: [
      { label: 'Start here', items: [
        { label: 'Why CMMF', slug: 'learn/why-cmmf' },
        { label: 'Glossary', slug: 'learn/glossary' },
        { label: 'Documentation', slug: 'docs' },
        { label: 'Create your first model', slug: 'docs/get-started/first-model' },
        { label: 'Project structure', slug: 'docs/get-started/project-structure' },
      ] },
      { label: 'Understand the model', items: [
        { label: 'Model kinds', slug: 'docs/concepts/model-kinds' },
        { label: 'Relationships', slug: 'docs/concepts/relationships' },
        { label: 'Translation', slug: 'docs/concepts/translation' },
        { label: 'Validation', slug: 'docs/guides/validation' },
        { label: 'Visualisation', slug: 'docs/guides/visualisation' },
        { label: 'Embed or reference?', slug: 'docs/guides/embed-or-reference' },
        { label: 'Rich text', slug: 'docs/guides/rich-text' },
        { label: 'Localisation', slug: 'docs/guides/localisation' },
        { label: 'Editorial intent', slug: 'docs/guides/editorial-intent' },
        { label: 'Validation errors', slug: 'docs/guides/errors' },
        { label: 'Migrate to 1.2.0', slug: 'docs/guides/migrate-to-1-2' },
      ] },
      { label: 'Look it up', items: [
        { label: 'Canonical types', slug: 'docs/reference/canonical-types' },
        { label: 'CMMF 1.2.0 specification', slug: 'spec/1.2.0' },
        { label: 'Translation contract', slug: 'spec/1.2.0/translation-contract' },
        { label: 'Changelog', slug: 'changelog' },
      ] },
      { label: 'Put it to work', items: [
        { label: 'Example models', slug: 'examples' },
        { label: 'Customer Story', slug: 'examples/customer-story' },
        { label: 'CMMF Skills', slug: 'tools' },
        { label: 'Skills installation', slug: 'tools/skills' },
        { label: 'Contributing', slug: 'contributing' },
      ] },
      { label: 'Previous specification', collapsed: true, items: [
        { label: 'CMMF 1.1.0 (archived)', slug: 'spec/1.1.0' },
        { label: 'Translation contract 1.1.0', slug: 'spec/1.1.0/translation-contract' },
      ] },
    ],
  })],
});
