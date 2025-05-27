/*
  Warnings:

  - You are about to drop the `cliente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `empresa_fk` to the `medicamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ventas" DROP CONSTRAINT "ventas_cliente_fk";

-- AlterTable
ALTER TABLE "medicamento" ADD COLUMN     "empresa_fk" INTEGER NOT NULL;

-- DropTable
DROP TABLE "cliente";

-- AddForeignKey
ALTER TABLE "medicamento" ADD CONSTRAINT "medicamento_empresa_fk_fkey" FOREIGN KEY ("empresa_fk") REFERENCES "empresa"("empresa_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
