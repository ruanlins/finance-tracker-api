import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import {hash} from 'bcrypt'
import { UserAlreadyExistsError } from "../erros/user-alreay-exists-error"

interface RegisterUserUseCaseRequest {
    name: string
    email: string
}

interface RegisterUserUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,email
    } : RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>
    {

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail) throw UserAlreadyExistsError

        const user = await this.usersRepository.create({
            name,
            email,
        })

        return {user}
    }
}