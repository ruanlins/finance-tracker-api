import { WalletsRepository } from "@/repositories/wallets-repository"
import { Wallet } from "@prisma/client"
import { WalletNotFoundError } from "../erros/wallet-not-found-error"

interface GetWalletUseCaseRequest {
    wallet_id: string
}

interface GetWalletUseCaseResponse {
    wallet: Wallet
}

export class GetWalletUseCase {
    constructor (private walletsRepository: WalletsRepository){}

    async execute({wallet_id}:GetWalletUseCaseRequest):Promise<GetWalletUseCaseResponse>{

        const wallet = await this.walletsRepository.findById(wallet_id)

        if(!wallet) throw new WalletNotFoundError()

        return {wallet}
    }
}