import { defineConfig, type PluginOption } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'
import viteCompressionPlugin from 'vite-plugin-compression'

type CompressionFactory = (options?: {
  algorithm?: 'gzip' | 'brotliCompress'
  threshold?: number
  ext?: string
}) => PluginOption

const viteCompression = viteCompressionPlugin as unknown as CompressionFactory

/**
 * React Compiler evaluation (P2, measured Jul 2026 on this repo):
 * - WITH compiler:  ~4.0s vite build, main JS ~339KB
 * - WITHOUT:        ~0.8s vite build, main JS ~319KB
 * - Tradeoff: ~5× slower production Vite build and ~20KB larger entry for automatic
 *   memoization on complex forms (hours, invoices). Keep ON by default for runtime;
 *   opt out locally with `REACT_COMPILER=0 npm run dev` when DX matters more.
 * - Re-check: `npm run build:compare-compiler`
 */
const enableReactCompiler = process.env.REACT_COMPILER !== '0'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(enableReactCompiler
      ? [babel({ presets: [reactCompilerPreset()] })]
      : []),
    Pages({
      importMode(filepath) {
        // Keep the 404 catch-all in the main bundle so it never flashes a Suspense fallback.
        if (filepath.includes('[...all]')) return 'sync'
        return 'async'
      },
    }),
    tailwindcss(),
    // Precompress text assets for hosts that can serve .gz / .br alongside originals.
    viteCompression({
      algorithm: 'gzip',
      threshold: 1024,
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 1024,
      ext: '.br',
    }),
  ],
  build: {
    // Hashed assets are safe for long-lived CDN/browser caches (see public/_headers).
    cssCodeSplit: true,
    reportCompressedSize: true,
  },
})
