import { Prisma, Wallet } from "@prisma/client";

export interface WalletsRepository {
    create(data: Prisma.WalletCreateInput): Promise<Wallet>
    findById(id:string): Promise<Wallet | null>
    findByUserId(id: string): Promise<Wallet[]>
    edit(name: string): Promise<Wallet>
    delete(id: string): Promise<null>
}