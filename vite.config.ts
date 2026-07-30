import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    Pages({
      importMode(filepath) {
        // Keep the 404 catch-all in the main bundle so it never flashes a Suspense fallback.
        if (filepath.includes('[...all]')) return 'sync'
        return 'async'
      },
    }),
    tailwindcss(),
  ],
})
