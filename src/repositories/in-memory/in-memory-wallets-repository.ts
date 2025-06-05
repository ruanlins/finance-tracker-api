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

    async findByName(id: string, name: string) {
        const filteredwallet = this.items.filter((wallet) => wallet.name == name)
        const wallet = filteredwallet.find((wallet) => wallet.user_id === id) || null
        
        return wallet
    }


    async edit(data: Prisma.WalletUpdateInput, wallet_id: string) {
        const walletIndex = this.items.findIndex((wallet) => wallet.id == wallet_id)

        if(data.total) this.items[walletIndex].total = data.total as Prisma.Decimal

        if(data.name) this.items[walletIndex].name = data.name as string
        
        return  this.items[walletIndex]
    }

    async delete(id: string) {
        this.items = this.items.filter((wallet) => wallet.id !== id)

        return null
    }

    async updateBalance(amount: number, wallet_id: string, type: string) {

        const wallet = this.items.find(wallet => wallet.id === wallet_id)
        if(!wallet)return null

        const value = type === 'SAIDA' ? -amount : amount

        wallet.total = wallet.total.plus(value)
        
        return null
    }


}