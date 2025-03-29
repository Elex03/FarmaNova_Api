/*
  Warnings:

  - You are about to drop the column `medicamento_fk` on the `categoriamedicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `medicamento_fk` on the `detallespedidos` table. All the data in the column will be lost.
  - You are about to drop the column `medicamentos_fk` on the `detallesventa` table. All the data in the column will be lost.
  - You are about to drop the column `cantidaddisponible` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `presentacion_fk` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `tama_o` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the `presentacion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `variante_fk` to the `categoriamedicamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variante_fk` to the `detallespedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variante_fk` to the `detallesventa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accionTerapeutica_pk` to the `medicamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria_fk` to the `medicamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categoriamedicamentos" DROP CONSTRAINT "categoriamedicamentos_medicamentos_fk";

-- DropForeignKey
ALTER TABLE "detallespedidos" DROP CONSTRAINT "detallespedidos_medicamentos_fk";

-- DropForeignKey
ALTER TABLE "detallesventa" DROP CONSTRAINT "detallesventa_medicamentos_fk";

-- DropForeignKey
ALTER TABLE "medicamentos" DROP CONSTRAINT "medicamentos_presentacion_fk";

-- AlterTable
ALTER TABLE "categoriamedicamentos" DROP COLUMN "medicamento_fk",
ADD COLUMN     "variante_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "detallespedidos" DROP COLUMN "medicamento_fk",
ADD COLUMN     "variante_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "detallesventa" DROP COLUMN "medicamentos_fk",
ADD COLUMN     "variante_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "medicamentos" DROP COLUMN "cantidaddisponible",
DROP COLUMN "precio",
DROP COLUMN "presentacion_fk",
DROP COLUMN "tama_o",
ADD COLUMN     "accionTerapeutica_pk" INTEGER NOT NULL,
ADD COLUMN     "categoria_fk" INTEGER NOT NULL,
ADD COLUMN     "codigoBarra" TEXT,
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "precioVenta" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ALTER COLUMN "nombre" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "presentacion";

-- CreateTable
CREATE TABLE "FormaFarmaceutica" (
    "formaFarmaceutica_pk" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "FormaFarmaceutica_pkey" PRIMARY KEY ("formaFarmaceutica_pk")
);

-- CreateTable
CREATE TABLE "Presentacion" (
    "presentacion_pk" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Presentacion_pkey" PRIMARY KEY ("presentacion_pk")
);

-- CreateTable
CREATE TABLE "AccionTerapeutica" (
    "accionTerapeutica_pk" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "AccionTerapeutica_pkey" PRIMARY KEY ("accionTerapeutica_pk")
);

-- CreateTable
CREATE TABLE "Variante" (
    "variante_pk" SERIAL NOT NULL,
    "medicamento_fk" INTEGER NOT NULL,
    "accionTerapeutica_fk" INTEGER NOT NULL,
    "concentracion" TEXT NOT NULL,
    "presentacion_fk" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioCompra" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Variante_pkey" PRIMARY KEY ("variante_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormaFarmaceutica_nombre_key" ON "FormaFarmaceutica"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Presentacion_nombre_key" ON "Presentacion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "AccionTerapeutica_nombre_key" ON "AccionTerapeutica"("nombre");

-- AddForeignKey
ALTER TABLE "categoriamedicamentos" ADD CONSTRAINT "categoriamedicamentos_medicamentos_fk" FOREIGN KEY ("variante_fk") REFERENCES "Variante"("variante_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesventa" ADD CONSTRAINT "detallesventa_medicamentos_fk" FOREIGN KEY ("variante_fk") REFERENCES "Variante"("variante_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medicamentos" ADD CONSTRAINT "medicamentos_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "cateogoria"("categoria_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicamentos" ADD CONSTRAINT "medicamentos_accionTerapeutica_pk_fkey" FOREIGN KEY ("accionTerapeutica_pk") REFERENCES "AccionTerapeutica"("accionTerapeutica_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variante" ADD CONSTRAINT "Variante_medicamento_fk_fkey" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamentos"("medicamento_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variante" ADD CONSTRAINT "Variante_accionTerapeutica_fk_fkey" FOREIGN KEY ("accionTerapeutica_fk") REFERENCES "FormaFarmaceutica"("formaFarmaceutica_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variante" ADD CONSTRAINT "Variante_presentacion_fk_fkey" FOREIGN KEY ("presentacion_fk") REFERENCES "Presentacion"("presentacion_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detallespedidos" ADD CONSTRAINT "detallespedidos_medicamentos_fk" FOREIGN KEY ("variante_fk") REFERENCES "Variante"("variante_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
