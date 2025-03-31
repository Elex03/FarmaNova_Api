/*
  Warnings:

  - You are about to drop the column `concentracion` on the `Variante` table. All the data in the column will be lost.
  - You are about to drop the column `categoria_fk` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `medicamentos` table. All the data in the column will be lost.
  - Added the required column `concentracion` to the `medicamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "medicamentos" DROP CONSTRAINT "medicamentos_categoria_fk_fkey";

-- AlterTable
ALTER TABLE "Variante" DROP COLUMN "concentracion";

-- AlterTable
ALTER TABLE "medicamentos" DROP COLUMN "categoria_fk",
DROP COLUMN "descripcion",
ADD COLUMN     "concentracion" TEXT NOT NULL;
