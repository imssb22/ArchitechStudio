-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Bookings_userId_idx" ON "Bookings"("userId");

-- CreateIndex
CREATE INDEX "Bookings_architectId_idx" ON "Bookings"("architectId");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_architectId_fkey" FOREIGN KEY ("architectId") REFERENCES "Architects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
