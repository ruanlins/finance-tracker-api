import { WalletsRepository } from "@/repositories/wallets-repository";
import {Wallet} from '@prisma/client'

interface SetValueUseCaseRequest {
    total: number
    wallet_id: string
}

interface SetValueUseCaseResponse {
    wallet: Wallet
}

export class SetValueUseUseCase {
    constructor(private walletsRepository:WalletsRepository){}
        async execute({total,wallet_id}: SetValueUseCaseRequest): Promise<SetValueUseCaseResponse> {

            const wallet = await this.walletsRepository.edit({
                total
            }, wallet_id)

            return {wallet}
    }
 }