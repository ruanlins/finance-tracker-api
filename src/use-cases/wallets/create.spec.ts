import { describe, beforeEach, it, expect } from 'vitest'
import { CreateWalletUseCase } from "./create";
import { WalletsRepository } from "@/repositories/wallets-repository";

let walletsRepository: WalletsRepository
let sut: CreateWalletUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        walletsRepository = new 
        sut = new CreateWalletUseCase(usersRepository)
    })

    it('should be able to register', async() => {
        const {user} = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
          });

        expect(user.id).toEqual(expect.any(String))
    })
      
    });