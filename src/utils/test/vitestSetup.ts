import { startTestDatabase, stopTestDatabase } from '@/utils/test/setupTestDatabase.js'
import { afterAll, beforeAll } from 'vitest'

beforeAll(async () => {
  await startTestDatabase()
})

afterAll(async () => {
  await stopTestDatabase()
})