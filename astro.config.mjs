// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL. Override with the SITE_URL env var when deploying.
// IMPORTANT: set this to your real domain so the sitemap + canonical URLs are correct.
const SITE = process.env.SITE_URL || 'https://kelvo.com';

// Sub-path the site is served from. Root ('/') on a real domain; '/kelvo' on
// GitHub Pages project sites. Set with the BASE_PATH env var at build time.
const BASE = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true, // every locale lives under /en/ or /es/
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
