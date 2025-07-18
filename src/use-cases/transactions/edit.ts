import { TransactionsRepository } from "@/repositories/transactions-repository";
import { Transaction, TransactionCategory, TransactionMethod, TransactionType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { TransactionNotFoundError } from "../erros/transaction-not-found-error";
import { UnauthorizedError } from "../erros/unauthorized- error";

interface EditTransactionUseCaseRequest {
    request :{amount?: number
        description?: string
        location?: string
        category?: TransactionCategory
        date?: Date
        type?: TransactionType
        method?: TransactionMethod
        wallet_id?: string
        id: string
        user_id: string
    }
    user_id: string
    
}

interface EditTransactionUseCaseResponse {
    transaction: Transaction
}

export class EditTransactionUseCase {
    constructor(private transactionsRepository: TransactionsRepository){}

    async execute({request, user_id}:EditTransactionUseCaseRequest): Promise<EditTransactionUseCaseResponse>
    {
        const transaction = await this.transactionsRepository.findById(request.id)
    
        if(!transaction) throw new TransactionNotFoundError()

        if(transaction.user_id !== user_id) throw new UnauthorizedError()

        Object.assign(transaction, request)

        await this.transactionsRepository.edit(request.id, transaction)

        return {transaction}
    }
}