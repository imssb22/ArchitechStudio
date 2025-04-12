/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Orders_title_key";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Items_title_key" ON "Items"("title");
