import { WalletsRepository } from "@/repositories/wallets-repository";
import { GetWalletsUseCase } from "./get-wallets";
import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryWalletsRepository } from "@/repositories/in-memory/in-memory-wallets-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let walletsRepository: WalletsRepository
let usersRepository: UsersRepository
let sut: GetWalletsUseCase

describe('Get Wallets Unit Test', () => {
    beforeAll(() => {
        walletsRepository = new InMemoryWalletsRepository()
        usersRepository = new InMemoryUsersRepository()
        sut = new GetWalletsUseCase(walletsRepository)

    })

    it('should be able to get all users wallet', async () => {
        const user = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        })

        console.log(user)

        await walletsRepository.create({
            name: 'Minha Carteira',
            status: 'active',
            user_id: 'user-1',
            total: 2000
        })

        await walletsRepository.create({
            name: 'Minha Carteira2',
            status: 'active',
            user_id: 'user-1',
            total: 2000
        })

        const {wallets} = await sut.execute({ user_id:'user-1' })

        expect(wallets).toHaveLength(2)
    })
})