import { TransactionsRepository } from "@/repositories/transactions-repository"
import { Transaction } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { TransactionMustHaveAmountAndDescriptionError } from "../erros/transaction-must-have-amount-and-description-error"

interface CreateTransactionUseCaseRequest {
    description: string
    amount: Decimal
    location: string
    category: string
    date: Date
    type: string
    user_id: string
    wallet_id: string
}

interface CreateTransactionUseCaseResponse {
    transaction: Transaction
}

export class CreateTransactionUseCase{
    constructor(private transactionsRepository: TransactionsRepository){}

    async execute({description,amount,category,date,location,type,user_id,wallet_id}: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse>
    {

        if(!description || !amount) throw new TransactionMustHaveAmountAndDescriptionError()

        const transaction = await this.transactionsRepository.create({
            description,
            amount,
            category,
            date,
            location,
            type,
            user_id,
            wallet_id,
        })

        return {transaction}
    }
}