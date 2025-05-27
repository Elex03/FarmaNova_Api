/*
  Warnings:

  - Added the required column `pagaCon` to the `ventas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ventas" ADD COLUMN     "pagaCon" REAL NOT NULL;
