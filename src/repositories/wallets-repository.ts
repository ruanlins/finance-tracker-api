import { Prisma, Wallet } from "@prisma/client";

export interface WalletsRepository {
    create(data: Prisma.WalletUpdateInput): Promise<Wallet>
    findById(id:string): Promise<Wallet | null>
    findByUserId(id: string): Promise<Wallet[]>
    edit(data: Wallet): Promise<Wallet>
    delete(id: string): Promise<null>
}