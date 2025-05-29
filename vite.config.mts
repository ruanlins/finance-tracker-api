import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const isE2E = process.env.TEST_ENV === 'e2e'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    hookTimeout: 30000,
    setupFiles: isE2E ? ['./src/utils/test/vitestSetup.js'] : [],
    },
})