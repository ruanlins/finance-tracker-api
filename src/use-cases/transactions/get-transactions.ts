import { FindByUserIdParams, TransactionsRepository } from "@/repositories/transactions-repository";
import { Transaction } from "@prisma/client";

interface GetTransactionsUseCaseRequest {
    user_id: string,
    params?: FindByUserIdParams
}

interface GetTransactionsUseCaseResponse {
    transactions: Transaction[]
}

export class GetTransactionsUseCase {
    constructor(private transactionsRepository: TransactionsRepository){}

    async execute({user_id, params}:GetTransactionsUseCaseRequest): Promise<GetTransactionsUseCaseResponse>{
        
        const transactions = await this.transactionsRepository.findByUserId(user_id, params)

        return {transactions}
    }
}