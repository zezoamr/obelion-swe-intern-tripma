-- AlterTable
ALTER TABLE "Payment_passenger" ADD COLUMN "seatClass" TEXT;
ALTER TABLE "Payment_passenger" ADD COLUMN "seatDisplay" TEXT;
ALTER TABLE "Payment_passenger" ADD COLUMN "upgradeCost" INTEGER;
ALTER TABLE "Payment_passenger" ADD COLUMN "upgraded" BOOLEAN;
