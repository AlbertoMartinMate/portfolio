import { defineConfig } from 'vite'

export default defineConfig({
  base: '/portfolio/',
  server: {
    open: {
      app: {
        name: 'google chrome',
        arguments: ['--new-window']
      }
    }
  }
})
