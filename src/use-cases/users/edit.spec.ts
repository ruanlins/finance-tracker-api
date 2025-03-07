import { UsersRepository } from "@/repositories/users-repository";
import { EditUserUseCase } from "./edit";
import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserNameTooShortError } from "../erros/user-name-too-short-error";

let usersRepository: UsersRepository
let sut: EditUserUseCase

describe('Edit Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        sut = new EditUserUseCase(usersRepository)
    })

    it('should be able to edit user name', async() => {
        const userToBeEdited = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        const {user} = await sut.execute({
            id: userToBeEdited.id,
            name: 'John Doe 2'
        })

        expect(user.name).toEqual('John Doe 2')
       
    })

    it('should not be able to edit user name if it is too short', async() => {
        const userToBeEdited = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        await expect(() => sut.execute({
            id: userToBeEdited.id,
            name: 'A'
        })).rejects.toBeInstanceOf(UserNameTooShortError)
       
    })
      
    });