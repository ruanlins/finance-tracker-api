import { Prisma, Wallet } from "@prisma/client";

export interface WalletsRepository {
    create(data: Prisma.WalletUncheckedCreateInput): Promise<Wallet>
    findById(id:string): Promise<Wallet | null>
    findByUserId(id: string): Promise<Wallet[]>
    findByName(id:string, name:string):Promise<Wallet | null>
    edit(data: Prisma.WalletUpdateInput, id: string): Promise<Wallet>
    updateBalance(amount: number, wallet_id:string, type:string): Promise<null>
    delete(id: string): Promise<null>
}