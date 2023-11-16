-- CreateTable
CREATE TABLE "UserFavoritePhyiscalBook" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "physical_book_barcode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoritePhyiscalBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFavoritePhyiscalBook" ADD CONSTRAINT "UserFavoritePhyiscalBook_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoritePhyiscalBook" ADD CONSTRAINT "UserFavoritePhyiscalBook_physical_book_barcode_fkey" FOREIGN KEY ("physical_book_barcode") REFERENCES "PhysicalBook"("barcode") ON DELETE RESTRICT ON UPDATE CASCADE;
