/*
  Warnings:

  - You are about to drop the column `accionTerapeutica_fk` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the `AccionTerapeutica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoriamedicamentos` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `nombreComercial` on table `medicamentos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombreGenerico` on table `medicamentos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "categoriamedicamentos" DROP CONSTRAINT "categoriamedicamentos_categoria_fk";

-- DropForeignKey
ALTER TABLE "categoriamedicamentos" DROP CONSTRAINT "categoriamedicamentos_medicamentos_fk";

-- DropForeignKey
ALTER TABLE "medicamentos" DROP CONSTRAINT "medicamentos_accionTerapeutica_fk_fkey";

-- AlterTable
ALTER TABLE "medicamentos" DROP COLUMN "accionTerapeutica_fk",
ALTER COLUMN "nombreComercial" SET NOT NULL,
ALTER COLUMN "nombreGenerico" SET NOT NULL;

-- DropTable
DROP TABLE "AccionTerapeutica";

-- DropTable
DROP TABLE "categoria";

-- DropTable
DROP TABLE "categoriamedicamentos";

-- CreateTable
CREATE TABLE "accionmedicamentos" (
    "catmed_pk" SERIAL NOT NULL,
    "variante_fk" INTEGER NOT NULL,
    "accionTerapeutica_fk" INTEGER NOT NULL,

    CONSTRAINT "categoriamedicamentos_pk" PRIMARY KEY ("catmed_pk")
);

-- CreateTable
CREATE TABLE "accionTera" (
    "accionTerapeutica_pk" SERIAL NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "accionTerapeutica_pk" PRIMARY KEY ("accionTerapeutica_pk")
);

-- CreateTable
CREATE TABLE "_VarianteToaccionTera" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VarianteToaccionTera_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VarianteToaccionTera_B_index" ON "_VarianteToaccionTera"("B");

-- AddForeignKey
ALTER TABLE "accionmedicamentos" ADD CONSTRAINT "categoriamedicamentos_categoria_fk" FOREIGN KEY ("accionTerapeutica_fk") REFERENCES "accionTera"("accionTerapeutica_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accionmedicamentos" ADD CONSTRAINT "categoriamedicamentos_medicamentos_fk" FOREIGN KEY ("variante_fk") REFERENCES "Variante"("variante_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_VarianteToaccionTera" ADD CONSTRAINT "_VarianteToaccionTera_A_fkey" FOREIGN KEY ("A") REFERENCES "Variante"("variante_pk") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VarianteToaccionTera" ADD CONSTRAINT "_VarianteToaccionTera_B_fkey" FOREIGN KEY ("B") REFERENCES "accionTera"("accionTerapeutica_pk") ON DELETE CASCADE ON UPDATE CASCADE;
