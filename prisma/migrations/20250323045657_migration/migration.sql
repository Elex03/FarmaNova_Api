/*
  Warnings:

  - You are about to drop the column `tamaño` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `contraseña` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `fehcaCompra` to the `distribuidormedicamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidaddisponible` to the `medicamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tama_o` to the `medicamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contrase_a` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "distribuidormedicamento" ADD COLUMN     "fehcaCompra" DATE NOT NULL;

-- AlterTable
ALTER TABLE "medicamentos" DROP COLUMN "tamaño",
ADD COLUMN     "cantidaddisponible" INTEGER NOT NULL,
ADD COLUMN     "tama_o" VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "contraseña",
ADD COLUMN     "contrase_a" VARCHAR(20) NOT NULL;
