import { UsersRepository } from "@/repositories/users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { compare, hash } from "bcrypt";

let usersRepository: UsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async() => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('123456', 6)
        })

        const {user} = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
          });

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {

        await expect(() =>
            sut.execute({
              email: 'johndoe@email.com',
              password: '123456',
            }),
          ).rejects.toBeInstanceOf(InvalidCredentialsError);
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('123456', 6)
        })

        await expect(() =>
            sut.execute({
              email: 'johndoe@email.com',
              password: '1234567',
            }),
          ).rejects.toBeInstanceOf(InvalidCredentialsError);
    })

      
});