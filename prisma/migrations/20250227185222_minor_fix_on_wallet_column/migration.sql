/*
  Warnings:

  - The `transaction_id` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "transaction_id",
ADD COLUMN     "transaction_id" TEXT[];
