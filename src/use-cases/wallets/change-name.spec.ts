import { describe, beforeEach, it, expect } from 'vitest'
import { WalletsRepository } from "@/repositories/wallets-repository";
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository';
import { ChangeNameUseCase } from './change-name';

let walletsRepository: WalletsRepository
let sut: ChangeNameUseCase

describe('Change Wallet Name Use Case', () => {
    beforeEach(() => {
        walletsRepository = new InMemoryWalletsRepository
        sut = new ChangeNameUseCase(walletsRepository)
    })

    it('should be able to change wallet name', async() => {
        const wallet = await walletsRepository.create({
            name: 'Carteira teste',
            status: 'active',
            total: 0,
            user_id : 'user-1',
        })

        await sut.execute({name: 'Novo nome', wallet_id: wallet.id, user_id: wallet.user_id })

        expect(wallet.name).toEqual('Novo nome')

    })
});