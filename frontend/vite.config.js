import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: path.resolve(__dirname, '..'),
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
    proxy: {
      '/auth/google': {
        target: 'https://accounts.google.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer',
      util: 'util',
      process: 'process/browser',
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [],
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
