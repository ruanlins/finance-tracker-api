export class WalletNotFoundError extends Error {
    constructor(){
        super('Carteira não encontrada')
    }
}