import { StartedTestContainer, GenericContainer } from 'testcontainers'
import { execSync } from 'child_process'
import waitPort from 'wait-port'

let container: StartedTestContainer

export async function startTestDatabase() {
  container = await new GenericContainer('postgres:alpine')
    .withEnvironment({
      POSTGRES_USER: 'test',
      POSTGRES_PASSWORD: 'test',
      POSTGRES_DB: 'testdb',
    })
    .withExposedPorts(5432)
    .withReuse()
    .start()

  const port = container.getMappedPort(5432)
  const host = container.getHost()

  process.env.DATABASE_URL = `postgresql://test:test@${host}:${port}/testdb`
  process.env.JWT_SECRET = 'test-secret'
  process.env.NODE_DEV = 'test'

  await waitPort({ host, port, timeout: 10000 })

  execSync('npx prisma generate', { stdio: 'inherit' })
  execSync('npx prisma migrate deploy', { stdio: 'inherit' })
}

export async function stopTestDatabase() {
  if (container) await container.stop()
}
export async function clearDataBase() {
  const { prisma } = await import('@/lib/prisma.js')
  await prisma.$executeRawUnsafe(`
  TRUNCATE TABLE "Transaction", "Wallet", "User" RESTART IDENTITY CASCADE;
`);
}