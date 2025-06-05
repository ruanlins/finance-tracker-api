import { TransactionsRepository } from "@/repositories/transactions-repository"
import { Transaction, TransactionCategory, TransactionMethod, TransactionType } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { TransactionMustHaveAmountAndDescriptionError } from "../erros/transaction-must-have-amount-and-description-error"
import { WalletsRepository } from "@/repositories/wallets-repository"

interface CreateTransactionUseCaseRequest {
    description: string
    amount: number
    location?: string
    category: TransactionCategory
    date?: Date
    type: TransactionType
    method: TransactionMethod
    user_id: string
    wallet_id: string
}

interface CreateTransactionUseCaseResponse {
    transaction: Transaction
}

export class CreateTransactionUseCase{
    constructor(private transactionsRepository: TransactionsRepository, private walletsRepository: WalletsRepository){}

    async execute({description,amount,category,date,location,type,method,user_id,wallet_id}: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse>
    {

        if(!description || !amount) throw new TransactionMustHaveAmountAndDescriptionError()

        const transaction = await this.transactionsRepository.create({
            description,
            amount,
            category,
            date,
            location,
            type,
            method,
            user_id,
            wallet_id,
        })

        await this.walletsRepository.updateBalance(amount, wallet_id, type)

        return {transaction}
    }
}