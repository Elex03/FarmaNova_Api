/*
  Warnings:

  - You are about to drop the `distribuidormedicamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "distribuidormedicamento" DROP CONSTRAINT "distribuidormedicamento_distribuidor_fk";

-- DropForeignKey
ALTER TABLE "distribuidormedicamento" DROP CONSTRAINT "distribuidormedicamento_medicamentos_fk";

-- AlterTable
ALTER TABLE "distribuidor" ADD COLUMN     "empresa" VARCHAR(50);

-- DropTable
DROP TABLE "distribuidormedicamento";

-- CreateTable
CREATE TABLE "pedidos" (
    "pedidos_pk" SERIAL NOT NULL,
    "fechaPedido" DATE NOT NULL,
    "empleado_fk" INTEGER NOT NULL,
    "distribuidor_fk" INTEGER NOT NULL,

    CONSTRAINT "pedidos_pk" PRIMARY KEY ("pedidos_pk")
);

-- CreateTable
CREATE TABLE "detallesPedidos" (
    "detallespedidos_pk" SERIAL NOT NULL,
    "fecha_expiracion" DATE NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "medicamento_fk" INTEGER NOT NULL,
    "distribuidor_fk" INTEGER NOT NULL,
    "pedidos_fk" INTEGER NOT NULL,
    "fechacompra" DATE,
    "estao" VARCHAR(20),
    "precioventa" DOUBLE PRECISION,

    CONSTRAINT "detallespedidos_pk" PRIMARY KEY ("detallespedidos_pk")
);

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "ventas_empleado_fk" FOREIGN KEY ("empleado_fk") REFERENCES "empleado"("empleado_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "distribuidormedicamento_distribuidor_fk" FOREIGN KEY ("distribuidor_fk") REFERENCES "distribuidor"("distribuidor_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesPedidos" ADD CONSTRAINT "detallesPedidos_pedidos_fk" FOREIGN KEY ("pedidos_fk") REFERENCES "pedidos"("pedidos_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesPedidos" ADD CONSTRAINT "distribuidormedicamento_distribuidor_fk" FOREIGN KEY ("distribuidor_fk") REFERENCES "distribuidor"("distribuidor_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesPedidos" ADD CONSTRAINT "distribuidormedicamento_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamentos"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
