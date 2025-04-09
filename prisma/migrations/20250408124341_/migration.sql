/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_title_key" ON "Orders"("title");
