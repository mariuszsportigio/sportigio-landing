// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // Static export for Nginx/static hosting
  output: 'static',
  integrations: [tailwind(), preact()],
});
