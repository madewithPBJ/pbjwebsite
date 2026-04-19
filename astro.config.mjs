import { defineConfig } from 'astro/config';

// Update `site` to match your GitHub Pages URL before deploying.
// If deploying to https://username.github.io/repo-name, also set base: '/repo-name'
export default defineConfig({
  output: 'static',
  site: 'https://madewithpbj.github.io',
  base: '/pbjwebsite',
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
