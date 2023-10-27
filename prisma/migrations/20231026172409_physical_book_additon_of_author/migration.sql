/*
  Warnings:

  - Added the required column `author` to the `PhysicalBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhysicalBook" ADD COLUMN     "author" TEXT NOT NULL;
