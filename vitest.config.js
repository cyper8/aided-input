
import { defineConfig } from 'vitest/config';
import { preview } from '@vitest/browser-preview'


export default defineConfig({
  base: './',
  test: {
    browser: {
      enabled: true,
      provider: preview(),
      instances: [
        { browser: 'chromium' }
      ]
    },
  }
})