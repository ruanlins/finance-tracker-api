import { WalletsRepository } from "@/repositories/wallets-repository";
import {Wallet} from '@prisma/client'

interface ChangeNameUseCaseRequest {
    name: string
    id: string
}

interface ChangeNameUseCaseResponse {
    wallet: Wallet
}

export class ChangeNameUseUseCase {
    constructor(private walletsRepository:WalletsRepository){}
        async execute({name, id}: ChangeNameUseCaseRequest): Promise<ChangeNameUseCaseResponse> {

            const wallet = await this.walletsRepository.edit({
                name
            }, id)

            return {wallet}
    }
 }