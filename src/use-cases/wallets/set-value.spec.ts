import { describe, beforeEach, it, expect } from 'vitest'
import { WalletsRepository } from "@/repositories/wallets-repository";
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository';
import { SetValueUseUseCase } from './set-value';

let walletsRepository: WalletsRepository
let sut: SetValueUseUseCase

describe('Set Value Use Case', () => {
    beforeEach(() => {
        walletsRepository = new InMemoryWalletsRepository
        sut = new SetValueUseUseCase(walletsRepository)
    })

    it('should be able to change wallet value', async() => {
        const wallet = await walletsRepository.create({
            name: 'Carteira teste',
            status: 'active',
            total: 0,
            user_id : 'user-1',
        })

        await sut.execute({total: 1000, wallet_id: wallet.id})

        expect(wallet.total).toEqual(1000)
        
    })
      
    });