/*
  Warnings:

  - Added the required column `price` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetails" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" ALTER COLUMN "main" SET DEFAULT false;
