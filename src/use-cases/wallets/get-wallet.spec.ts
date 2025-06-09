import { WalletsRepository } from "@/repositories/wallets-repository";
import { GetWalletUseCase } from "./get-wallet";
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryWalletsRepository } from "@/repositories/in-memory/in-memory-wallets-repository";
import { WalletNotFoundError } from "../erros/wallet-not-found-error";

let walletsRepository: WalletsRepository
let sut: GetWalletUseCase

describe('Get Wallet Unit Test', () => {
    beforeEach(() => {
        walletsRepository = new InMemoryWalletsRepository
        sut = new GetWalletUseCase(walletsRepository)
    })

    it('should be able do get an wallet by id', async () => {
        const createWallet = await walletsRepository.create({
            name: 'Carteira teste',
            status: 'active',
            total: 0,
            user_id: 'user-1',
        })

        const {wallet} = await sut.execute({wallet_id:createWallet.id})

        expect(wallet).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))

    })

    it('should not be able to find an wallet if received a wrong id', async () => {
        await walletsRepository.create({
            name: 'Carteira teste',
            status: 'active',
            total: 0,
            user_id: 'user-1',
        })

        await expect(() => sut.execute({wallet_id: 'randomUUID'})).rejects.toBeInstanceOf(WalletNotFoundError)

    })
})


