import { WalletsRepository } from "@/repositories/wallets-repository";
import {Wallet} from '@prisma/client'
import { WalletWithSameNameError } from "../erros/wallet-with-same-name-error";

interface CreateWalletUseCaseRequest {
    name?: string
    total?: number
    status: 'active'
    user_id: string
}

interface CreateWalletUseCaseResponse {
    wallet: Wallet
}

export class CreateWalletUseCase {
    constructor(private walletsRepository:WalletsRepository){}
        async execute({name = 'Minha Carteira',status,total = 0, user_id}: CreateWalletUseCaseRequest): Promise<CreateWalletUseCaseResponse> {

            const walletWithSameName = (await this.walletsRepository.findByUserId(user_id))

            if (walletWithSameName.some(wallet => wallet.name === name)) {
                throw new WalletWithSameNameError();
            }

            const wallet = await this.walletsRepository.create({
                name,
                total,
                status,
                user_id,
            })

            return {wallet}
    }
 }
