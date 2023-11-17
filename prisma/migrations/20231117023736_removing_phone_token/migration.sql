/*
  Warnings:

  - You are about to drop the column `user_token` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `phone_token` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_token_fkey";

-- DropIndex
DROP INDEX "User_phone_token_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "user_token";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone_token";
