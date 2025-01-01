/*
  Warnings:

  - Added the required column `email` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "body" SET DATA TYPE TEXT;
