/*
  Warnings:

  - Added the required column `collection_id` to the `PhysicalBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhysicalBook" ADD COLUMN     "collection_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PhysicalBook" ADD CONSTRAINT "PhysicalBook_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Reference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
