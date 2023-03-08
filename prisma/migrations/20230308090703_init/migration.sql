/*
  Warnings:

  - You are about to drop the column `inventoryId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `ProductInventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `ProductInventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_inventoryId_fkey";

-- DropIndex
DROP INDEX "Product_inventoryId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "inventoryId";

-- AlterTable
ALTER TABLE "ProductInventory" ADD COLUMN     "productId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductInventory_productId_key" ON "ProductInventory"("productId");

-- AddForeignKey
ALTER TABLE "ProductInventory" ADD CONSTRAINT "ProductInventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
