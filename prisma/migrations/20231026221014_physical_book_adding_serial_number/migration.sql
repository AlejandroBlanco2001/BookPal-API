/*
  Warnings:

  - Added the required column `serial_number` to the `PhysicalBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhysicalBook" ADD COLUMN     "serial_number" TEXT NOT NULL;
