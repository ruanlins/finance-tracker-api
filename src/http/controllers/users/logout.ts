import { NextFunction, Request, Response } from "express";

export async function userLogout(req: Request, res:Response, next:NextFunction) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
          })

        res.status(200).json({mensagem:'Usuário deslogado com sucesso.'})
        
    } catch (err) {
        next(err)
    }
}