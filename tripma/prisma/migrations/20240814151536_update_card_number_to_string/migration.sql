-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment_info" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameOnCard" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expDate" TEXT NOT NULL,
    "CVV" INTEGER NOT NULL
);
INSERT INTO "new_Payment_info" ("CVV", "cardNumber", "expDate", "id", "nameOnCard") SELECT "CVV", "cardNumber", "expDate", "id", "nameOnCard" FROM "Payment_info";
DROP TABLE "Payment_info";
ALTER TABLE "new_Payment_info" RENAME TO "Payment_info";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
