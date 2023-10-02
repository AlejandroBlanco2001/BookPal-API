-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('unread', 'read', 'deleted');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('active', 'returned', 'overdue');

-- CreateEnum
CREATE TYPE "FineStatus" AS ENUM ('paid', 'unpaid');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('available', 'unavailable');

-- CreateEnum
CREATE TYPE "BookScanMethod" AS ENUM ('barcode', 'rfid');

-- CreateTable
CREATE TABLE "Company" (
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enable_book_scan_methodos" "BookScanMethod"[] DEFAULT ARRAY['barcode']::"BookScanMethod"[],
    "logo" TEXT,
    "primary_color" TEXT DEFAULT '#000000',
    "secondary_color" TEXT DEFAULT '#000000',

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT,
    "last_name" TEXT NOT NULL,
    "second_last_name" TEXT,
    "date_of_birth" DATE NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "academic_program" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'unread',
    "next_schedule_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "loan_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "barcode_physical_book" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "user_return_date" TIMESTAMP(3) NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("loan_id")
);

-- CreateTable
CREATE TABLE "Fine" (
    "fine_id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "FineStatus" NOT NULL DEFAULT 'unpaid',
    "pay_date" TIMESTAMP(3) NOT NULL,
    "has_been_paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Fine_pkey" PRIMARY KEY ("fine_id")
);

-- CreateTable
CREATE TABLE "PhysicalBook" (
    "physica_book_id" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "edition" TEXT,
    "dewey_code" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "isbn" TEXT,
    "isbn13" TEXT,
    "publisher" TEXT,
    "publication_date" TIMESTAMP(3),
    "language" TEXT,
    "status" "BookStatus" NOT NULL DEFAULT 'available',
    "bibliographic_gps" TEXT,

    CONSTRAINT "PhysicalBook_pkey" PRIMARY KEY ("physica_book_id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "reference_id" TEXT NOT NULL,
    "numerical_id" TEXT NOT NULL,
    "reference_name" TEXT NOT NULL,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("reference_id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subject_id" TEXT NOT NULL,
    "subect_name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "Subject_Book" (
    "subject_book_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "Subject_Book_pkey" PRIMARY KEY ("subject_book_id")
);

-- CreateTable
CREATE TABLE "Book" (
    "book_id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "original_title" TEXT,
    "publish_date" DATE,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "inventory_id" TEXT NOT NULL,
    "physical_book_barcode" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "minimum_quantity" INTEGER NOT NULL DEFAULT 0,
    "maximum_quantity" INTEGER NOT NULL,
    "reorder_quantity" INTEGER,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventory_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalBook_barcode_key" ON "PhysicalBook"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalBook_dewey_code_key" ON "PhysicalBook"("dewey_code");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalBook_isbn_key" ON "PhysicalBook"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalBook_isbn13_key" ON "PhysicalBook"("isbn13");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalBook_bibliographic_gps_key" ON "PhysicalBook"("bibliographic_gps");

-- CreateIndex
CREATE UNIQUE INDEX "Reference_numerical_id_key" ON "Reference"("numerical_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reference_reference_name_key" ON "Reference"("reference_name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subect_name_key" ON "Subject"("subect_name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_barcode_physical_book_fkey" FOREIGN KEY ("barcode_physical_book") REFERENCES "PhysicalBook"("barcode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "Loan"("loan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalBook" ADD CONSTRAINT "PhysicalBook_reference_id_fkey" FOREIGN KEY ("reference_id") REFERENCES "Book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject_Book" ADD CONSTRAINT "Subject_Book_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject_Book" ADD CONSTRAINT "Subject_Book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_reference_id_fkey" FOREIGN KEY ("reference_id") REFERENCES "Reference"("reference_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_physical_book_barcode_fkey" FOREIGN KEY ("physical_book_barcode") REFERENCES "PhysicalBook"("barcode") ON DELETE RESTRICT ON UPDATE CASCADE;
