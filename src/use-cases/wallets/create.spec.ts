import { describe, beforeEach, it, expect } from 'vitest'
import { CreateWalletUseCase } from "./create";
import { WalletsRepository } from "@/repositories/wallets-repository";
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository';
import { WalletWithSameNameError } from '../erros/wallet-with-same-name-error';

let walletsRepository: WalletsRepository
let sut: CreateWalletUseCase

describe('Create Wallet Use Case', () => {
    beforeEach(() => {
        walletsRepository = new InMemoryWalletsRepository
        sut = new CreateWalletUseCase(walletsRepository)
    })

    it('should be able to create a wallet with no total', async() => {
        const {wallet} = await sut.execute({
            name:'Minha Carteira',
            status: 'active',
            user_id: 'user-1',
            
        })

        expect(wallet.id).toEqual(expect.any(String))
        expect(wallet.total).toEqual(0)
    })

    it('should be able to create a wallet with any total', async() => {
        const {wallet} = await sut.execute({
            name:'Minha Carteira',
            status: 'active',
            user_id: 'user-1',
            total: 2000
        })

        expect(wallet.id).toEqual(expect.any(String))
        expect(wallet.total).toBeGreaterThan(0)
    })

    it('should not be able to create a wallet with same name of another one', async() => {
        await sut.execute({
            name:'Minha Carteira',
            status: 'active',
            user_id: 'user-1',
        })

        await expect(() =>
            sut.execute({
                name:'Minha Carteira',
                status: 'active',
                user_id: 'user-1',
            }),
          ).rejects.toBeInstanceOf(WalletWithSameNameError);
        
    })
      
    });