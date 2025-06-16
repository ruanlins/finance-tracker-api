import { WalletsRepository } from "@/repositories/wallets-repository"
import { Wallet } from "@prisma/client"

interface GetWalletsUseCaseRequest {
    user_id: string
}

interface GetWalletsUseCaseResponse {
    wallets: Wallet[]
}

export class GetWalletsUseCase {
    constructor(private walletsRepository: WalletsRepository) { }

    async execute({ user_id }: GetWalletsUseCaseRequest): Promise<GetWalletsUseCaseResponse> {

        const wallets = await this.walletsRepository.findByUserId(user_id)

        return {wallets}
    }
}