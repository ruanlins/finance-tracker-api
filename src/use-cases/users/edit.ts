import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { UserNameTooShortError } from "../erros/user-name-too-short-error"

interface EditUserUseCaseRequest {
    name: string
    id: string
}

interface EditUserUseCaseResponse {
    user: User
}

export class EditUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,
        id,
    } : EditUserUseCaseRequest): Promise<EditUserUseCaseResponse>
    {
        let user = await this.usersRepository.findById(id)

        if(name.length < 2) throw new UserNameTooShortError

        user = {...user, name}

        return {user}
    }
}