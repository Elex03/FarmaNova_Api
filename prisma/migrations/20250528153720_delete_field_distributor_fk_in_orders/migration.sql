/*
  Warnings:

  - Added the required column `distribuidor_fk` to the `detallespedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "detallespedidos" ADD COLUMN     "distribuidor_fk" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "detallespedidos" ADD CONSTRAINT "distribuidormedicamento_distribuidor_fk" FOREIGN KEY ("distribuidor_fk") REFERENCES "distribuidor"("distribuidor_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
