import { TransactionsRepository } from "@/repositories/transactions-repository"

interface GetMonthTransactionsUseCaseRequest {
    user_id: string
}

interface GetMonthTransactionsUseCaseResponse {
    total: number
}

export class GetMonthTransactionsUseCase {
    constructor(private transactionsRepository: TransactionsRepository) { }

    async execute({ user_id }: GetMonthTransactionsUseCaseRequest): Promise<GetMonthTransactionsUseCaseResponse> {

        const now = new Date()
        const month = now.getMonth()
        const year = now.getFullYear()

        const total = await this.transactionsRepository.getMonthTotalExpenses(user_id, month, year)

        return { total }
    }
}