/*
  Warnings:

  - You are about to drop the `cateogoria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categoriamedicamentos" DROP CONSTRAINT "categoriamedicamentos_cateogoria_fk";

-- DropForeignKey
ALTER TABLE "medicamentos" DROP CONSTRAINT "medicamentos_categoria_fk_fkey";

-- DropTable
DROP TABLE "cateogoria";

-- CreateTable
CREATE TABLE "categoria" (
    "categoria_pk" SERIAL NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "categoria_pk" PRIMARY KEY ("categoria_pk")
);

-- AddForeignKey
ALTER TABLE "categoriamedicamentos" ADD CONSTRAINT "categoriamedicamentos_categoria_fk" FOREIGN KEY ("categoria_fk") REFERENCES "categoria"("categoria_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medicamentos" ADD CONSTRAINT "medicamentos_categoria_fk_fkey" FOREIGN KEY ("categoria_fk") REFERENCES "categoria"("categoria_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
