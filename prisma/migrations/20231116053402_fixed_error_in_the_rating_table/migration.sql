-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_id_fkey";

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
