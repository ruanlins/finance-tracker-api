import { Prisma, Wallet } from '@prisma/client'
import {WalletsRepository} from '../wallets-repository'

export class InMemoryWalletsRepository implements WalletsRepository
 {
public items:Wallet[] = []

    async create(data: Prisma.WalletUncheckedCreateInput){

        const wallet = {
            ...data as Wallet,
            id:'wallet1'
        }
        this.items.push(wallet)

        return wallet
    }

    async findById(id: string) {
        const wallet = this.items.find((wallet) => wallet.id == id) as Wallet

        return wallet
    }

    async findByUserId(id: string) {
        const wallets = this.items.filter(wallet => wallet.user_id === id);
        return wallets;
    }

    async findByName(name: string) {
        const wallet = this.items.filter((wallet) => wallet.name == name)
        
        return wallet
    }


    async edit(data: Prisma.WalletUpdateInput, id: string) {
        const walletIndex = this.items.findIndex((wallet) => wallet.id == id)

        if(data.total) this.items[walletIndex].total = data.total as Prisma.Decimal

        if(data.name) this.items[walletIndex].name = data.name as string
        
        return  this.items[walletIndex]


    }

    async delete(id: string) {
        this.items.filter((wallet) => wallet.id !== id)

        return null
    }


}