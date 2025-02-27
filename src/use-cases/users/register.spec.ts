import { UsersRepository } from "@/repositories/users-repository";
import { RegisterUseCase } from "./register";
import { describe, beforeEach, it, expect } from 'vitest'
import { InMemomoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../erros/user-alreay-exists-error";
import { compare } from "bcrypt";

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemomoryUsersRepository
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async() => {
        const {user} = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
          });

        expect(user.id).toEqual(expect.any(String))
    })

    it('should nott be able to register a user with an already registered email', async () => {
      const email = 'johndoe@email.com';
  
      await sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      });
  
      await expect(() =>
        sut.execute({
          name: 'John Doe',
          email,
          password: '123456',
           }),
         ).rejects.toBeInstanceOf(UserAlreadyExistsError);
      });

      it('should hash the user password', async () => {
        const {user} = await sut.execute({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        });

        const isPasswordHashed = await compare('123456', user.password)

        expect(isPasswordHashed).toBe(true)

      })

      
    });