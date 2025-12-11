import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// PWA off by default; set VITE_ENABLE_PWA=true to enable
const enablePWA = process.env.VITE_ENABLE_PWA === 'true';

export default defineConfig({
  plugins: [
    react(),
    enablePWA &&
      VitePWA({
        minify: false,
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Showcase Portfolio',
          short_name: 'Porto',
          description: 'Soulaiman Showcase portfolio',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: '/pwa-maskable-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
            { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          // Precache core assets only; exclude heavy media
          globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico,webp}'],
          maximumFileSizeToCacheInBytes: 12 * 1024 * 1024, // 12 MB cap
          runtimeCaching: [
            {
              urlPattern: /\.(?:mp4|pdf)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'media-cache',
                expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
          ],
        },
      }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
