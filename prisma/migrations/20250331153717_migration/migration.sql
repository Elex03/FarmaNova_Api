/*
  Warnings:

  - A unique constraint covering the columns `[codigoBarra]` on the table `Variante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Variante_codigoBarra_key" ON "Variante"("codigoBarra");
