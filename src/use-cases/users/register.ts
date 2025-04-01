import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import {hash} from 'bcrypt'
import { UserAlreadyExistsError } from "../erros/user-alreay-exists-error"
import { WalletsRepository } from "@/repositories/wallets-repository"

interface RegisterUserUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUserUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository, private walletsRepository: WalletsRepository) {}

    async execute({
        name,email,password
    } : RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>
    {

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail) throw new UserAlreadyExistsError()

        const hashedPassword = await hash(password, 6)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        })

        await this.walletsRepository.create({
            name: 'Minha Carteira',
            status: 'active',
            total: 0,
            user_id: user.id,
        })

        return {user}
    }
}