import { TransactionsRepository } from "@/repositories/transactions-repository"

interface GetMonthCategoriesTransactionsUseCaseRequest {
    user_id: string
    month?: number
    year?: number
}

interface GetMonthCategoriesTransactionsUseCaseResponse {
    categories: { [key: string]: number } | 0
}

export class GetMonthCategoriesTransactionsUseCase {
    constructor(private transactionsRepository: TransactionsRepository) { }

    async execute({ user_id, month, year }: GetMonthCategoriesTransactionsUseCaseRequest): Promise<GetMonthCategoriesTransactionsUseCaseResponse> {

        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()


        const categories = await this.transactionsRepository.getMonthCategoriesTransactions(user_id, month || currentMonth, year || currentYear)

        return { categories }

    }
}