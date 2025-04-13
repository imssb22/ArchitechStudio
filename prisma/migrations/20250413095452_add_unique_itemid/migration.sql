/*
  Warnings:

  - A unique constraint covering the columns `[itemId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_itemId_key" ON "Orders"("itemId");
