import {describe,it,afterAll,beforeAll,expect} from 'vitest'
import { clearDataBase } from '@/utils/test/setupTestDatabase'
import { authenticateTestUser } from '@/utils/test/authenticateUser'

let app: any

describe('Logout User e2e test', () => {

  beforeAll(async () => {
    const server = await import('@/app')
    app = server.app
  })

  afterAll(async () => {
    await clearDataBase()
  })

  it('should be able to logout', async () => {
    const agent = await authenticateTestUser(app);
    const res = await agent.post('/users/logout')

    expect(res.status).toBe(200)
    expect(res.body.mensagem).toBe('Usuário deslogado com sucesso.')
    
  })

})