import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import {compare} from 'bcrypt'
import { InvalidCredentialsError } from "../erros/invalid-credentials-error"

interface AuthenticateUserUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUserUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        email,password
    } : AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse>
    {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) throw new InvalidCredentialsError();

        const doesPasswordMatch = await compare(password, user.password)

        if(!doesPasswordMatch) throw new InvalidCredentialsError();

        return {user}
    }
}