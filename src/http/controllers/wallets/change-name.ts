import { PrismaWalletsRepository } from "@/repositories/prisma/prisma-wallets-repository";
import { WalletWithSameNameError } from "@/use-cases/erros/wallet-with-same-name-error";
import { ChangeNameUseCase } from "@/use-cases/wallets/change-name";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function walletChangeName(req: Request, res: Response, next: NextFunction) {
  const changeWalletNameBody = z.object({
    name: z.string()
  });

  const changeWalletNameParams = z.object({
    wallet_id: z.string()
  })

  const parsedBody = changeWalletNameBody.safeParse(req.body);
  if (!parsedBody.success) {
    return next(createHttpError(400, {
      message: "Erro de validação no corpo da requisição",
      details: parsedBody.error.errors
    }));
  }

  const parsedParams = changeWalletNameParams.safeParse(req.params);
  if (!parsedParams.success) {
    return next(createHttpError(400, {
      message: "Erro de validação dos parametros",
      details: parsedParams.error.errors
    }))
  }

  const { name } = parsedBody.data
  const { wallet_id } = parsedParams.data
  const user_id = req.user?.id as string


  try {
    const walletsRepository = new PrismaWalletsRepository()
    const changeWalletNameUseCase = new ChangeNameUseCase(walletsRepository)

    const { wallet } = await changeWalletNameUseCase.execute({
      name,
      wallet_id,
      user_id
    });

    res.status(200).json({ mensagem: 'Carteira editada com sucesso.', wallet })

  } catch (err) {
    if (err instanceof WalletWithSameNameError) {
      return next(createHttpError(409, err.message));
    }

    return next(err)
  }


}