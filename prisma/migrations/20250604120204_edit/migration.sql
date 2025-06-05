/*
  Warnings:

  - Added the required column `method` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionMethod" AS ENUM ('CREDITO', 'DEBITO', 'PIX');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "method" "TransactionMethod" NOT NULL;

-- DropEnum
DROP TYPE "TransactionOrigin";
