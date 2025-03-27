import { describe, beforeEach, it, expect } from 'vitest'
import { WalletsRepository } from "@/repositories/wallets-repository";
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository';
import { ChangeNameUseUseCase } from './change-name';

let walletsRepository: WalletsRepository
let sut: ChangeNameUseUseCase

describe('Create Wallet Use Case', () => {
    beforeEach(() => {
        walletsRepository = new InMemoryWalletsRepository
        sut = new ChangeNameUseUseCase(walletsRepository)
    })

    it('should be able to change wallet name', async() => {
        const wallet = await walletsRepository.create({
            name: 'Carteira teste',
            status: 'active',
            total: 0,
            user_id : 'user-1',
        })

        await sut.execute({name: 'Novo nome', id: wallet.id})

        expect(wallet.name).toEqual('Novo nome')
        
    })
      
    });