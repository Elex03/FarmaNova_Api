/*
  Warnings:

  - You are about to drop the column `empresa` on the `distribuidor` table. All the data in the column will be lost.
  - You are about to drop the `detallesPedidos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `empresa_fk` to the `distribuidor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "detallesPedidos" DROP CONSTRAINT "detallesPedidos_pedidos_fk";

-- DropForeignKey
ALTER TABLE "detallesPedidos" DROP CONSTRAINT "distribuidormedicamento_distribuidor_fk";

-- DropForeignKey
ALTER TABLE "detallesPedidos" DROP CONSTRAINT "distribuidormedicamento_medicamentos_fk";

-- AlterTable
ALTER TABLE "distribuidor" DROP COLUMN "empresa",
ADD COLUMN     "empresa_fk" INTEGER NOT NULL;

-- DropTable
DROP TABLE "detallesPedidos";

-- CreateTable
CREATE TABLE "empresa" (
    "empresa_pk" SERIAL NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "empresa_pk" PRIMARY KEY ("empresa_pk")
);

-- CreateTable
CREATE TABLE "detallespedidos" (
    "detallespedidos_pk" SERIAL NOT NULL,
    "fecha_expiracion" DATE NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "medicamento_fk" INTEGER NOT NULL,
    "distribuidor_fk" INTEGER NOT NULL,
    "pedidos_fk" INTEGER NOT NULL,
    "fechacompra" DATE,
    "estao" VARCHAR(20),
    "precioventa" REAL,

    CONSTRAINT "detallespedidos_pkey" PRIMARY KEY ("detallespedidos_pk")
);

-- AddForeignKey
ALTER TABLE "distribuidor" ADD CONSTRAINT "distribuidor_empresa_fk" FOREIGN KEY ("empresa_fk") REFERENCES "empresa"("empresa_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallespedidos" ADD CONSTRAINT "detallespedidos_distribuidor_fk" FOREIGN KEY ("distribuidor_fk") REFERENCES "distribuidor"("distribuidor_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallespedidos" ADD CONSTRAINT "detallespedidos_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamentos"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallespedidos" ADD CONSTRAINT "detallespedidos_pedidos_fk" FOREIGN KEY ("pedidos_fk") REFERENCES "pedidos"("pedidos_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
