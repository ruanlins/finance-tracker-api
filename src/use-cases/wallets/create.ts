import { UsersRepository } from "@/repositories/users-repository";
import { WalletsRepository } from "@/repositories/wallets-repository";
import {Wallet} from '@prisma/client'

interface CreateWalletUseCaseRequest {
    name: string
    total?: number
    status: 'active'
    user_id: string
}

interface CreateWalletUseCaseResponse {
    wallet: Wallet
}

export class CreateWalletUseCase {
    constructor(private walletsRepository:WalletsRepository){}
        async execute({name,status,total = 0, user_id}: CreateWalletUseCaseRequest): Promise<CreateWalletUseCaseResponse> {
            const wallet = await this.walletsRepository.create({
                name,
                total,
                status,
                user_id,
            })

            return {wallet}
    }
 }
