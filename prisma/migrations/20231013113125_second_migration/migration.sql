/*
  Warnings:

  - You are about to drop the column `Position` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Position",
ADD COLUMN     "position" TEXT NOT NULL DEFAULT 'Staff';
