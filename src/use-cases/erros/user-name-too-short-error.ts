export class UserNameTooShortError extends Error {
    constructor() {
        super('Name should be at least 2 Characters long')
    }
    
}