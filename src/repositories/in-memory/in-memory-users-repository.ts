import { Prisma, User } from '@prisma/client'
import {UsersRepository} from '../users-repository'

export class InMemomoryUsersRepository implements UsersRepository {
public items:User[] = []

    async findByEmail(email: string) {
        const user = this.items.find((user) => user.email == email)

        if(!user) return null

        return user
    }

    async findById(id: string) {
        const user = this.items.find((user) => user.id == id)

        if(!user) return null

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 'user1',
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.items.push(user)

        return user
        
    }

    async edit(data: Prisma.UserUpdateInput) {
        let user = this.items.find(user => user.id === 'user1')

        user = {...data as User}

        return user
    }
}