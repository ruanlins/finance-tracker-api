import { WalletsRepository } from "@/repositories/wallets-repository";

interface DeleteWalletUseCaseRequest {
    id: string
}


export class DeleteWalletUseCase {
    constructor(private walletsRepository:WalletsRepository){}
        async execute({id}: DeleteWalletUseCaseRequest): Promise<null> {

            await this.walletsRepository.delete(id)

            return null
    }
 }