/*
  Warnings:

  - You are about to drop the column `dosis` on the `medicamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "medicamento" DROP COLUMN "dosis",
ADD COLUMN     "precioCompra" DECIMAL(65,30) NOT NULL DEFAULT 0.00;
