import { defineConfig } from 'astro/config';

// Update `site` to match your GitHub Pages URL before deploying.
// If deploying to https://username.github.io/repo-name, also set base: '/repo-name'
export default defineConfig({
  output: 'static',
  site: 'https://pbandjagency.github.io',
  // base: '/',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          silenceDeprecations: ['import'],
        },
      },
    },
  },
});
