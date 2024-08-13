/*
  Warnings:

  - You are about to drop the column `availableSeats` on the `Flight` table. All the data in the column will be lost.
  - Added the required column `businessprice` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dividerLocations` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flightid` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatsData` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "paymentInfoId" TEXT NOT NULL,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_paymentInfoId_fkey" FOREIGN KEY ("paymentInfoId") REFERENCES "Payment_info" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment_info" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameOnCard" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "expDate" TEXT NOT NULL,
    "CVV" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Payment_passenger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paymentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "suffix" TEXT,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "redressNumber" TEXT,
    "knownTravelNumber" TEXT,
    "emergencyFirstName" TEXT NOT NULL,
    "emergencyLastName" TEXT NOT NULL,
    "emergencyEmailAddress" TEXT NOT NULL,
    "emergencyPhoneNumber" TEXT NOT NULL,
    "checkedBags" INTEGER NOT NULL,
    CONSTRAINT "Payment_passenger_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "duration" TEXT NOT NULL,
    "fromtoTime" TEXT NOT NULL,
    "stops" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "businessprice" INTEGER NOT NULL,
    "airline" TEXT NOT NULL,
    "stopduration" TEXT,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "taxes" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "flightid" TEXT NOT NULL,
    "dividerLocations" TEXT NOT NULL,
    "seatsData" TEXT NOT NULL
);
INSERT INTO "new_Flight" ("airline", "duration", "endDate", "from", "fromtoTime", "id", "image", "price", "startDate", "stopduration", "stops", "taxes", "to", "type") SELECT "airline", "duration", "endDate", "from", "fromtoTime", "id", "image", "price", "startDate", "stopduration", "stops", "taxes", "to", "type" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentInfoId_key" ON "Payment"("paymentInfoId");
