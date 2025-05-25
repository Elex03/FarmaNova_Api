/*
  Warnings:

  - Added the required column `descripcion` to the `medicamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicamento" ADD COLUMN     "descripcion" TEXT NOT NULL;
