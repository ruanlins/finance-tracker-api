import { z } from 'zod'
import {Response,Request} from 'express'

export function userRegister(req:Request, res:Response) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const body = registerBodySchema.safeParse(req.body)

    if(!body.success) return res.status(400).json({mensagem: 'Erro de validação', erros: body.error.errors})

    const {name,email,password} = body.data

    try {
        
    } catch (error) {
        
    }

    

    
}