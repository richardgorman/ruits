const { defineConfig } = require('vite')

module.exports = defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
})