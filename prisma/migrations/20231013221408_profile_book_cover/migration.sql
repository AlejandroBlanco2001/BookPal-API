-- AlterTable
ALTER TABLE "PhysicalBook" ADD COLUMN     "book_cover" TEXT NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/bookpal-4f333.appspot.com/o/books%2Fno_cover.jpg?alt=media&token=fa8c05d0-724e-4bd2-acb2-f1731a15d60c&_gl=1*1k7glp8*_ga*ODQ3MjYwMjYuMTY5NTQ5NzMxNg..*_ga_CW55HF8NVT*MTY5NzIzNTA4NC45LjEuMTY5NzIzNTE2NS41OC4wLjA.';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_image" TEXT NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/bookpal-4f333.appspot.com/o/users%2Fdefault_avatar.jpg?alt=media&token=7cf36132-15dd-492e-9a59-c26ca0af6bd6&_gl=1*h5pmgv*_ga*ODQ3MjYwMjYuMTY5NTQ5NzMxNg..*_ga_CW55HF8NVT*MTY5NzIzNTA4NC45LjEuMTY5NzIzNTEwNC40MC4wLjA.';
