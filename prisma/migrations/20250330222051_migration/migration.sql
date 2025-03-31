/*
  Warnings:

  - You are about to drop the column `accionTerapeutica_fk` on the `Variante` table. All the data in the column will be lost.
  - You are about to drop the column `accionTerapeutica_pk` on the `medicamentos` table. All the data in the column will be lost.
  - Added the required column `accionTerapeutica_fk` to the `medicamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Variante" DROP CONSTRAINT "Variante_accionTerapeutica_fk_fkey";

-- DropForeignKey
ALTER TABLE "medicamentos" DROP CONSTRAINT "medicamentos_accionTerapeutica_pk_fkey";

-- AlterTable
ALTER TABLE "Variante" DROP COLUMN "accionTerapeutica_fk";

-- AlterTable
ALTER TABLE "medicamentos" DROP COLUMN "accionTerapeutica_pk",
ADD COLUMN     "accionTerapeutica_fk" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "medicamentos" ADD CONSTRAINT "medicamentos_accionTerapeutica_fk_fkey" FOREIGN KEY ("accionTerapeutica_fk") REFERENCES "AccionTerapeutica"("accionTerapeutica_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
