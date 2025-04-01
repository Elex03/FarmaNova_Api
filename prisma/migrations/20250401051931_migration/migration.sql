/*
  Warnings:

  - You are about to drop the column `nombrecompleto` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_fk` on the `cliente` table. All the data in the column will be lost.
  - Added the required column `cedula` to the `cliente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cliente" DROP CONSTRAINT "cliente_usuario_fk";

-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "nombrecompleto",
DROP COLUMN "telefono",
DROP COLUMN "usuario_fk",
ADD COLUMN     "cedula" VARCHAR(15) NOT NULL;
