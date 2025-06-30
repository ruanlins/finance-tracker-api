import { TransactionsRepository } from "@/repositories/transactions-repository";
import { TransactionNotFoundError } from "../erros/transaction-not-found-error";
import { UnauthorizedError } from "../erros/unauthorized- error";

interface DeleteTransactionUseCaseRequest {
    transaction_id: string
    user_id:string
}

export class DeleteTransactionUseCase {
    constructor(private transactionsRepository: TransactionsRepository) {}

    async execute({transaction_id, user_id}: DeleteTransactionUseCaseRequest) {
        const transaction = await this.transactionsRepository.findById(transaction_id)

        if(!transaction) throw new TransactionNotFoundError()

        if(transaction.user_id !== user_id) throw new UnauthorizedError()

        await this.transactionsRepository.delete(transaction_id)
    }
}