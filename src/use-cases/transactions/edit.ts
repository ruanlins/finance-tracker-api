import { TransactionsRepository } from "@/repositories/transactions-repository";
import { Transaction, TransactionCategory, TransactionMethod, TransactionType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface EditTransactionUseCaseRequest {
    request :{amount?: Decimal
        description?: string
        location?: string
        category?: TransactionCategory
        date?: Date
        type?: TransactionType
        method?: TransactionMethod
        id: string
    }
    
}

interface EditTransactionUseCaseResponse {
    transaction: Transaction
}

export class EditTransactionUseCase {
    constructor(private transactionsRepository: TransactionsRepository){}

    async execute({request}:EditTransactionUseCaseRequest): Promise<EditTransactionUseCaseResponse>
    {
        const transaction = await this.transactionsRepository.findById(request.id)
    
        if(!transaction) throw new Error('Transação não encontrada')

        Object.assign(transaction, request)

        await this.transactionsRepository.edit(request.id, transaction)

        return {transaction}
    }
}