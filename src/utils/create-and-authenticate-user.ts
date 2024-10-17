import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { Server } from 'http';
import request from 'supertest';

export async function createAndAuthenticateUser(app: Server) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: await hash('123456', 6),
    },
  });

  const response = await request(app).post('/users/session').send({
    email: 'johndoe@test.com',
    password: '123456',
  });

  const cookie = response.header['set-cookie'];

  return cookie;
}
