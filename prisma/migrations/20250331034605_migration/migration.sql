/*
  Warnings:

  - You are about to drop the `_VarianteToaccionTera` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_VarianteToaccionTera" DROP CONSTRAINT "_VarianteToaccionTera_A_fkey";

-- DropForeignKey
ALTER TABLE "_VarianteToaccionTera" DROP CONSTRAINT "_VarianteToaccionTera_B_fkey";

-- DropTable
DROP TABLE "_VarianteToaccionTera";
