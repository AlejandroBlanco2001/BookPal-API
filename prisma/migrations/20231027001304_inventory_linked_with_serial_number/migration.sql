/*
  Warnings:

  - You are about to drop the column `physical_book_barcode` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `physical_book_serial_number` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_physical_book_barcode_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "physical_book_barcode",
ADD COLUMN     "physical_book_serial_number" TEXT NOT NULL;
