/*
  Warnings:

  - Added the required column `itemId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "itemId" TEXT NOT NULL;
