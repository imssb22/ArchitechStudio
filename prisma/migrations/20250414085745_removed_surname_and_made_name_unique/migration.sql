/*
  Warnings:

  - You are about to drop the column `surname` on the `Architects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Architects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Architects" DROP COLUMN "surname";

-- CreateIndex
CREATE UNIQUE INDEX "Architects_name_key" ON "Architects"("name");
