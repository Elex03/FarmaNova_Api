/*
  Warnings:

  - Made the column `precioventa` on table `detallespedidos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "detallespedidos" ALTER COLUMN "precioventa" SET NOT NULL;
