import { TransactionsRepository } from "@/repositories/transactions-repository";

interface DeleteTransactionUseCaseRequest {
    id: string
}

export class DeleteTransactionUseCase {
    constructor(private transactionsRepository: TransactionsRepository) {}

    async execute({id}: DeleteTransactionUseCaseRequest) {
        await this.transactionsRepository.delete(id)
    }
}