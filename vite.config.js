const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
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