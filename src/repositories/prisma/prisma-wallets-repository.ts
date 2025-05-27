import { Prisma, Wallet } from "@prisma/client";
import { WalletsRepository } from "../wallets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaWalletsRepository implements WalletsRepository {
    async create(data: Prisma.WalletUncheckedCreateInput): Promise<Wallet> {
        const wallet = await prisma.wallet.create({ data })

        return wallet
    }

    async findById(id: string): Promise<Wallet | null> {
        const wallet = await prisma.wallet.findUnique({ where: { id } })

        return wallet
    }

    async findByUserId(id: string): Promise<Wallet[]> {
        const wallets = await prisma.wallet.findMany({ where: { user_id: id } })

        return wallets
    }

    async findByName(user_id: string, name: string): Promise<Wallet | null> {
        const userWallets = await prisma.wallet.findMany({ where: { user_id } });
        const wallet = userWallets.find(wallet => wallet.name === name) || null;
        return wallet;
    }

    async edit(data: Prisma.WalletUpdateInput, id: string): Promise<Wallet> {
        const wallet = await prisma.wallet.update({ where: { id }, data })

        return wallet
    }

    async delete(id: string): Promise<null> {
        await prisma.wallet.delete({ where: { id } })

        return null
    }

}