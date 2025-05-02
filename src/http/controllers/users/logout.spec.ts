import {describe,it,afterAll,beforeAll,expect} from 'vitest'
import request from 'supertest'
import { startTestDatabase, stopTestDatabase } from '@/utils/test/setupTestDatabase'

let app: any

describe('Logout User e2e test', () => {

  beforeAll(async () => {
    await startTestDatabase()

    const server = await import('@/app')
    app = server.app
  })

  afterAll(async () => {
    await stopTestDatabase()
  })

  it('should be able to logout', async () => {
    await request(app).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'test@123',
    })

    const res = await request(app).post('/users/logout')

    console.log(res.status)
    expect(res.status).toBe(200)
    expect(res.body.mensagem).toBe('Usuário deslogado com sucesso.')

    
  })

  

})