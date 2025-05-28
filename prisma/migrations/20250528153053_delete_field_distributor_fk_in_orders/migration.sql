/*
  Warnings:

  - You are about to drop the column `cantidad` on the `detallespedidos` table. All the data in the column will be lost.
  - You are about to drop the column `precioventa` on the `detallespedidos` table. All the data in the column will be lost.
  - You are about to drop the column `distribuidor_fk` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `NroLote` to the `detallespedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidadDeEmpaque` to the `detallespedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidadPorEmpaque` to the `detallespedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `detallespedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "distribuidormedicamento_distribuidor_fk";

-- AlterTable
ALTER TABLE "detallespedidos" DROP COLUMN "cantidad",
DROP COLUMN "precioventa",
ADD COLUMN     "NroLote" TEXT NOT NULL,
ADD COLUMN     "cantidadDeEmpaque" INTEGER NOT NULL,
ADD COLUMN     "cantidadPorEmpaque" INTEGER NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "distribuidor_fk";
