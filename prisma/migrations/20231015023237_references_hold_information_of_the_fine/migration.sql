/*
  Warnings:

  - You are about to drop the column `numerical_id` on the `Reference` table. All the data in the column will be lost.
  - Added the required column `amount_of_days_per_loan` to the `Reference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_of_money_per_day` to the `Reference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limit_of_books_per_user` to the `Reference` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reference_numerical_id_key";

-- AlterTable
ALTER TABLE "Reference" DROP COLUMN "numerical_id",
ADD COLUMN     "amount_of_days_per_loan" INTEGER NOT NULL,
ADD COLUMN     "amount_of_money_per_day" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "limit_of_books_per_user" INTEGER NOT NULL;
