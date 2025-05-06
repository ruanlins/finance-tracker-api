import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

interface JwtPayload {
  sub: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    return next(createHttpError(401, "Token não fornecido."));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = {
      id: decoded.sub,
    };

    return next();
  } catch (err) {
    return next(createHttpError(403, "Token inválido ou expirado."));
  }
}