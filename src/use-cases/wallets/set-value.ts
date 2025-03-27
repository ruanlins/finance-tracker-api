import { WalletsRepository } from "@/repositories/wallets-repository";
import {Wallet} from '@prisma/client'

interface SetValueUseCaseRequest {
    total: number
    id: string
}

interface SetValueUseCaseResponse {
    wallet: Wallet
}

export class SetValueUseUseCase {
    constructor(private walletsRepository:WalletsRepository){}
        async execute({total, id}: SetValueUseCaseRequest): Promise<SetValueUseCaseResponse> {

            const wallet = await this.walletsRepository.edit({
                total
            }, id)

            return {wallet}
    }
 }