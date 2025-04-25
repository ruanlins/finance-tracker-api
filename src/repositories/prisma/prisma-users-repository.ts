import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository{
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where:{
            email
            }
        })
        return user
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = prisma.user.create({data})

        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = prisma.user.findUnique({where:{id}})

        return user
    }

    async edit(data: Prisma.UserUpdateInput): Promise<User> {
        const user = prisma.user.update({
            where:{id:data.id as string},
            data
        })

        return user
    }

}