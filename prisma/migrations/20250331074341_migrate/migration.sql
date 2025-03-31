/*
  Warnings:

  - You are about to drop the column `presentacion_fk` on the `Variante` table. All the data in the column will be lost.
  - You are about to drop the column `variante_fk` on the `accionmedicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `distribuidor_fk` on the `detallespedidos` table. All the data in the column will be lost.
  - You are about to drop the `Presentacion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `forma_fk` to the `Variante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicamento_fk` to the `accionmedicamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Variante" DROP CONSTRAINT "Variante_presentacion_fk_fkey";

-- DropForeignKey
ALTER TABLE "accionmedicamentos" DROP CONSTRAINT "categoriamedicamentos_medicamentos_fk";

-- DropForeignKey
ALTER TABLE "detallespedidos" DROP CONSTRAINT "detallespedidos_distribuidor_fk";

-- AlterTable
ALTER TABLE "Variante" DROP COLUMN "presentacion_fk",
ADD COLUMN     "forma_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "accionmedicamentos" DROP COLUMN "variante_fk",
ADD COLUMN     "medicamento_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "detallespedidos" DROP COLUMN "distribuidor_fk";

-- DropTable
DROP TABLE "Presentacion";

-- AddForeignKey
ALTER TABLE "accionmedicamentos" ADD CONSTRAINT "categoriamedicamentos_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamentos"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Variante" ADD CONSTRAINT "Variante_forma_fk_fkey" FOREIGN KEY ("forma_fk") REFERENCES "FormaFarmaceutica"("formaFarmaceutica_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
