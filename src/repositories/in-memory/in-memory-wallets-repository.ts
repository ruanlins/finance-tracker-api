import { Prisma, Wallet } from '@prisma/client'
import {WalletsRepository} from '../wallets-repository'

export class InMemoryWalletsRepository implements WalletsRepository
 {
public items:Wallet[] = []

    async create(data: Prisma.WalletUncheckedCreateInput){

        const wallet = {
            id:'wallet1',
            name: data.name,
            status: data.status,
            total: data.total,
            user_id: 'user1'
        } as Wallet

        return wallet
    }



    async findById(id: string) {
        const wallet = this.items.find((wallet) => wallet.id == id) as Wallet

        return wallet
    }

    async findByUserId(id: string) {
        const wallets = this.items.filter((wallet) => wallet.user_id == id) as Wallet[]
        
        return wallets
    }

    async edit(data: Wallet) {
        let wallet = this.items.find((wallet) => wallet.id == data.id) as Wallet

        wallet = {...data}

        return wallet
    }

    async delete(id: string) {
        this.items.filter((wallet) => wallet.id !== id)

        return null
    }


}