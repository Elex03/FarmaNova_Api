/*
  Warnings:

  - You are about to drop the column `imagen` on the `medicamentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Variante" ADD COLUMN     "imagen" TEXT;

-- AlterTable
ALTER TABLE "medicamentos" DROP COLUMN "imagen";
