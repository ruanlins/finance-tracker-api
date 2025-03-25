import { Prisma, Wallet } from "@prisma/client";

export interface WalletsRepository {
    create(data: Prisma.WalletUncheckedCreateInput): Promise<Wallet>
    findById(id:string): Promise<Wallet | null>
    findByUserId(id: string): Promise<Wallet[]>
    findByName(name:string):Promise<Wallet[] | null>
    edit(data: Prisma.WalletUpdateInput): Promise<Wallet>
    delete(id: string): Promise<null>
}