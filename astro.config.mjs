// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // PLACEHOLDER domain — must match production before launch (drives
  // canonicals, sitemap and Open Graph URLs)
  site: 'https://indiagatenl.ca',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
