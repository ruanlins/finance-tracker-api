import { PrismaWalletsRepository } from "@/repositories/prisma/prisma-wallets-repository";
import { WalletWithSameNameError } from "@/use-cases/erros/wallet-with-same-name-error";
import { CreateWalletUseCase } from "@/use-cases/wallets/create";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function walletCreate(req: Request, res: Response, next: NextFunction) {
  const createWalletBody = z.object({
    name: z.string().optional(),
    total: z.number().optional(),
  });

  const parsedBody = createWalletBody.safeParse(req.body);
  if (!parsedBody.success) {
    return next(createHttpError(400, {
      message: "Erro de validação no corpo da requisição",
      details: parsedBody.error.errors
    }));
  }

  if (!req.user?.id) {
    return next(createHttpError(401, "Usuário não autenticado"));
  }

  const { name, total } = parsedBody.data;
  const user_id = req.user.id;

  try {
    const walletsRepository = new PrismaWalletsRepository();
    const createWalletUseCase = new CreateWalletUseCase(walletsRepository);

    const { wallet } = await createWalletUseCase.execute({
      name,
      status: "active",
      total,
      user_id
    });

    res.status(201).json({ message: "Carteira criada com sucesso", wallet });

  } catch (err) {
    if (err instanceof WalletWithSameNameError) {
      return next(createHttpError(409, err.message));
    }
    return next(err);
  }
}