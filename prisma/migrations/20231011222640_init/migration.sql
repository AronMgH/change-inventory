/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Position` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'ADMIN');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('Logged', 'Created', 'Deleted', 'Updated');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Position" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STAFF';

-- CreateTable
CREATE TABLE "ActivityHistory" (
    "id" SERIAL NOT NULL,
    "activityMessage" TEXT NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "topLevel" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ActivityHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "functionalItems" INTEGER NOT NULL,
    "disfunctionalItems" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "remark" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
