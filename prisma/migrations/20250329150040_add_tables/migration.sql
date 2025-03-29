/*
  Warnings:

  - You are about to drop the column `precioCompra` on the `Variante` table. All the data in the column will be lost.
  - You are about to drop the column `rol_fk` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `rol` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `EstadoMedicamento` to the `Variante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EstadoMedicamentoExpirado` to the `Variante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `ventas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMINISTRADOR', 'EMPLEADO');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('PENDIENTE', 'EN_PROCESO', 'COMPLETADO');

-- CreateEnum
CREATE TYPE "EstadoMedicamento" AS ENUM ('DISPONIBLE', 'NO_DISPONIBLE');

-- CreateEnum
CREATE TYPE "EstadoMedicamentoExpirado" AS ENUM ('PROXIMO_A_EXPIRAR', 'EXPIRADO', 'DISPONIBLE');

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_rol_fk";

-- AlterTable
ALTER TABLE "Variante" DROP COLUMN "precioCompra",
ADD COLUMN     "EstadoMedicamento" "EstadoMedicamento" NOT NULL,
ADD COLUMN     "EstadoMedicamentoExpirado" "EstadoMedicamentoExpirado" NOT NULL,
ADD COLUMN     "fechaCreacion" DATE,
ADD COLUMN     "fechaModificacion" DATE,
ADD COLUMN     "fehcaexpiracion" DATE,
ADD COLUMN     "precioVenta" DECIMAL(65,30) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "medicamentos" ADD COLUMN     "fechaCreacion" DATE,
ADD COLUMN     "fechaModificacion" DATE;

-- AlterTable
ALTER TABLE "pedidos" ADD COLUMN     "estado" "Estado" NOT NULL,
ADD COLUMN     "fechaEntrega" DATE;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "rol_fk",
ADD COLUMN     "rol" "Rol" NOT NULL;

-- AlterTable
ALTER TABLE "ventas" ADD COLUMN     "estado" "Estado" NOT NULL;

-- DropTable
DROP TABLE "rol";
