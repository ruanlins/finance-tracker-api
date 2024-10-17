// import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';
// import { app } from '../../../app';
// import { Server } from 'http';
// import request from 'supertest';
// import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// describe('Create Expense Controller', () => {
//   let server: Server;

//   beforeAll(async () => {
//     server = app.listen(0);
//   });

//   afterAll(async () => {
//     server.close();
//   });

//   it('should be able to create a expense', async () => {
//     await request(server).post('/users/register').send({
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       password: '123456',
//     });

//     await request(server).post('/users/session').send({
//       email: 'johndoe@example.com',
//       password: '123456',
//     });
//   });
// });
