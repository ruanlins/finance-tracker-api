export class TransactionMustHaveAmountAndDescriptionError extends Error {
    constructor(){
        super('Transaction should have amount and description')
    }
}