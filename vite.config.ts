import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Deployed as a GitHub Pages project site, so it's served from a subpath
// (https://<user>.github.io/Toddler-Pop-It/) rather than a domain root.
const BASE_PATH = '/Toddler-Pop-It/';

export default defineConfig(() => {
  return {
    base: BASE_PATH,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: BASE_PATH,
          name: 'Princess Kingdom',
          short_name: 'Princess',
          description:
            'An enchanting fairytale activity kingdom for toddlers ages 2–5 with coloring pages, royal dress-up, matching puzzles, magical bubble pops, a sparkle harp, and reward stickers that works offline.',
          theme_color: '#f472b6',
          background_color: '#fdf2f8',
          display: 'standalone',
          start_url: BASE_PATH,
          scope: BASE_PATH,
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
