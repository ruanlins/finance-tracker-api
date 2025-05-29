import { WalletsRepository } from "@/repositories/wallets-repository";
import { Wallet } from '@prisma/client'
import { WalletWithSameNameError } from "../erros/wallet-with-same-name-error";

interface ChangeNameUseCaseRequest {
    name: string
    wallet_id: string
    user_id: string
}

interface ChangeNameUseCaseResponse {
    wallet: Wallet
}

export class ChangeNameUseCase {
    constructor(private walletsRepository: WalletsRepository) { }
    async execute({ name, wallet_id, user_id }: ChangeNameUseCaseRequest): Promise<ChangeNameUseCaseResponse> {
        const existingWallet = await this.walletsRepository.findByName(user_id, name)

        if (existingWallet && existingWallet.id !== wallet_id) {
            throw new WalletWithSameNameError()
        }

        const wallet = await this.walletsRepository.edit({ name }, wallet_id)

        return { wallet }
    }
}