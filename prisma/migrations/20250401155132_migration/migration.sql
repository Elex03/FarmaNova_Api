/*
  Warnings:

  - The values [NO_DISPONIBLE] on the enum `EstadoMedicamento` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EstadoMedicamento_new" AS ENUM ('DISPONIBLE', 'PROXIMO_A_AGOTARSE', 'AGOTADO');
ALTER TABLE "Variante" ALTER COLUMN "EstadoMedicamento" TYPE "EstadoMedicamento_new" USING ("EstadoMedicamento"::text::"EstadoMedicamento_new");
ALTER TYPE "EstadoMedicamento" RENAME TO "EstadoMedicamento_old";
ALTER TYPE "EstadoMedicamento_new" RENAME TO "EstadoMedicamento";
DROP TYPE "EstadoMedicamento_old";
COMMIT;
