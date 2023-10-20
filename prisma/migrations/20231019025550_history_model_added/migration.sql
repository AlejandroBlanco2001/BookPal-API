-- CreateEnum
CREATE TYPE "HistoryAction" AS ENUM ('create', 'update', 'delete');

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,
    "action" "HistoryAction" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
