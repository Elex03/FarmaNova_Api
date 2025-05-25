/*
  Warnings:

  - You are about to drop the column `variante_fk` on the `Devoluciones` table. All the data in the column will be lost.
  - You are about to drop the column `variante_fk` on the `detallespedidos` table. All the data in the column will be lost.
  - You are about to drop the column `variante_fk` on the `detallesventa` table. All the data in the column will be lost.
  - You are about to drop the `Variante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicamentos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `medicamento_fk` to the `Devoluciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicamento_fk` to the `detallespedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicamento_fk` to the `detallesventa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Devoluciones" DROP CONSTRAINT "devoluciones_medicamentos_fk";

-- DropForeignKey
ALTER TABLE "Variante" DROP CONSTRAINT "Variante_forma_fk_fkey";

-- DropForeignKey
ALTER TABLE "Variante" DROP CONSTRAINT "Variante_medicamento_fk_fkey";

-- DropForeignKey
ALTER TABLE "accionmedicamentos" DROP CONSTRAINT "categoriamedicamentos_medicamentos_fk";

-- DropForeignKey
ALTER TABLE "detallespedidos" DROP CONSTRAINT "detallespedidos_medicamentos_fk";

-- DropForeignKey
ALTER TABLE "detallesventa" DROP CONSTRAINT "detallesventa_medicamentos_fk";

-- AlterTable
ALTER TABLE "Devoluciones" DROP COLUMN "variante_fk",
ADD COLUMN     "medicamento_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "detallespedidos" DROP COLUMN "variante_fk",
ADD COLUMN     "medicamento_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "detallesventa" DROP COLUMN "variante_fk",
ADD COLUMN     "medicamento_fk" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Variante";

-- DropTable
DROP TABLE "medicamentos";

-- CreateTable
CREATE TABLE "medicamento" (
    "imagen" TEXT,
    "medicamento_pk" SERIAL NOT NULL,
    "codigoBarra" TEXT,
    "requierePrescripcion" BOOLEAN NOT NULL DEFAULT false,
    "EstadoMedicamento" "EstadoMedicamento" NOT NULL,
    "EstadoMedicamentoExpirado" "EstadoMedicamentoExpirado" NOT NULL,
    "forma_fk" INTEGER NOT NULL,
    "precioVenta" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "cantidadMinima" INTEGER NOT NULL DEFAULT 0,
    "cantidadMaxima" INTEGER NOT NULL DEFAULT 0,
    "dosis" TEXT NOT NULL,
    "via" TEXT NOT NULL,
    "fechaCreacion" DATE,
    "fechaModificacion" DATE,

    CONSTRAINT "medicamento_pkey" PRIMARY KEY ("medicamento_pk")
);

-- CreateIndex
CREATE INDEX "fechaCreacion" ON "medicamento"("fechaCreacion");

-- AddForeignKey
ALTER TABLE "accionmedicamentos" ADD CONSTRAINT "categoriamedicamentos_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamento"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesventa" ADD CONSTRAINT "detallesventa_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamento"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medicamento" ADD CONSTRAINT "medicamento_forma_fk_fkey" FOREIGN KEY ("forma_fk") REFERENCES "FormaFarmaceutica"("formaFarmaceutica_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devoluciones" ADD CONSTRAINT "devoluciones_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamento"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallespedidos" ADD CONSTRAINT "detallespedidos_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamento"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
