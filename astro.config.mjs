// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://spectant.pro',
  // Canonical URLs carry no trailing slash; nginx serves /de and /de/ from de/index.html.
  trailingSlash: 'never',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de' } },
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
  // Hashes every script and style Astro emits into a CSP <meta>; no inline style attributes anywhere.
  security: { csp: true },
  markdown: { syntaxHighlight: false },
  vite: { plugins: [tailwindcss()] },
});
