-- CreateEnum
CREATE TYPE "role" AS ENUM ('Buyer', 'Seller', 'Admin');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('created', 'accepted', 'rejected', 'cancelled', 'shipped', 'delivered');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "SellerID" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "BuyerID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'created',
    "TotalPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
