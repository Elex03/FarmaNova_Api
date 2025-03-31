/*
  Warnings:

  - You are about to drop the column `nombre` on the `medicamentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "medicamentos" DROP COLUMN "nombre",
ADD COLUMN     "nombreComercial" TEXT,
ADD COLUMN     "nombreGenerico" TEXT;
