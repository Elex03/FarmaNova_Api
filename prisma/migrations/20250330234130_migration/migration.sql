/*
  Warnings:

  - You are about to drop the column `codigoBarra` on the `medicamentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Variante" ADD COLUMN     "codigoBarra" TEXT;

-- AlterTable
ALTER TABLE "medicamentos" DROP COLUMN "codigoBarra";
