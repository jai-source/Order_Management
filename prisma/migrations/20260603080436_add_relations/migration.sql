/*
  Warnings:

  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Buyer', 'Seller', 'Admin');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropEnum
DROP TYPE "role";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_SellerID_fkey" FOREIGN KEY ("SellerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_BuyerID_fkey" FOREIGN KEY ("BuyerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
