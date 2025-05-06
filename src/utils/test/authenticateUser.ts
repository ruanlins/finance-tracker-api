import request from 'supertest'

export async function authenticateTestUser(app: any): Promise<ReturnType<typeof request.agent>> {
  const agent = request.agent(app)

  await agent.post('/users/register').send({
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
  })

  return agent
}