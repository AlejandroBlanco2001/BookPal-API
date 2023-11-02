/*
  Warnings:

  - You are about to drop the column `user_id` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_token` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_id_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "user_id",
ADD COLUMN     "user_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_token_key" ON "User"("phone_token");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_token_fkey" FOREIGN KEY ("user_token") REFERENCES "User"("phone_token") ON DELETE RESTRICT ON UPDATE CASCADE;
