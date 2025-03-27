import { describe, beforeEach, it, expect } from 'vitest'
import { WalletsRepository } from "@/repositories/wallets-repository";
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository';
import { DeleteWalletUseCase } from './delete';

let walletsRepository: WalletsRepository
let sut: DeleteWalletUseCase

describe('Delete Wallet Use Case', () => {
    beforeEach(() => {
        walletsRepository = new InMemoryWalletsRepository
        sut = new DeleteWalletUseCase(walletsRepository)
    })

    it('should be able to delete an existing wallet value', async() => {
        const wallet = await walletsRepository.create({
            name: 'Carteira teste',
            status: 'active',
            total: 0,
            user_id : 'user-1',
        })

        await sut.execute({id: wallet.id})
        
        await expect(walletsRepository.findById(wallet.id)).resolves.toBeUndefined()
        
    })
      
    });