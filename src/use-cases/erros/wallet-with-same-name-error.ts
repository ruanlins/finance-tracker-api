export class WalletWithSameNameError extends Error {
    constructor() {
        super('Name already in use by another wallet.')
    }
    
}