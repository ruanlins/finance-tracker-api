/*
  Warnings:

  - Changed the type of `category` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('SAIDA', 'ENTRADA');

-- CreateEnum
CREATE TYPE "TransactionOrigin" AS ENUM ('CREDITO', 'DEBITO', 'PIX');

-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('COMIDA', 'MERCADO', 'PET', 'COMBUSTIVEL', 'MECANICO', 'JOGOS', 'BEBIDA', 'OUTROS', 'LAZER', 'ELETRONICO');

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "location" DROP NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "TransactionCategory" NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;
