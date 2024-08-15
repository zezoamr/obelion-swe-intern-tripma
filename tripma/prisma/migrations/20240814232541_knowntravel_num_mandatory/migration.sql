/*
  Warnings:

  - Made the column `knownTravelNumber` on table `Payment_passenger` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment_passenger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paymentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "suffix" TEXT,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "redressNumber" TEXT,
    "knownTravelNumber" TEXT NOT NULL,
    "emergencyFirstName" TEXT NOT NULL,
    "emergencyLastName" TEXT NOT NULL,
    "emergencyEmailAddress" TEXT NOT NULL,
    "emergencyPhoneNumber" TEXT NOT NULL,
    "checkedBags" INTEGER NOT NULL,
    "flightId" TEXT NOT NULL,
    "seatRow" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "seatClass" TEXT,
    "seatDisplay" TEXT,
    "upgraded" BOOLEAN,
    "upgradeCost" INTEGER,
    CONSTRAINT "Payment_passenger_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payment_passenger" ("checkedBags", "emailAddress", "emergencyEmailAddress", "emergencyFirstName", "emergencyLastName", "emergencyPhoneNumber", "firstName", "flightId", "id", "knownTravelNumber", "lastName", "middleName", "paymentId", "phoneNumber", "redressNumber", "seatClass", "seatDisplay", "seatNumber", "seatRow", "suffix", "upgradeCost", "upgraded") SELECT "checkedBags", "emailAddress", "emergencyEmailAddress", "emergencyFirstName", "emergencyLastName", "emergencyPhoneNumber", "firstName", "flightId", "id", "knownTravelNumber", "lastName", "middleName", "paymentId", "phoneNumber", "redressNumber", "seatClass", "seatDisplay", "seatNumber", "seatRow", "suffix", "upgradeCost", "upgraded" FROM "Payment_passenger";
DROP TABLE "Payment_passenger";
ALTER TABLE "new_Payment_passenger" RENAME TO "Payment_passenger";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
