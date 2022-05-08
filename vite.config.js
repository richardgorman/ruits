const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  resolve: {
    alias: {
      context: resolve(__dirname, 'src/context'),
      components: resolve(__dirname, 'src/components'),
      hooks: resolve(__dirname, 'src/hooks'),
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ruits',
      fileName: (format) => `prod.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react'],
    },
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
 },
})