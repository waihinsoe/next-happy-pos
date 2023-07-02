/*
  Warnings:

  - You are about to drop the column `order_status` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderLines" ADD COLUMN     "order_status" "OrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "order_status",
ADD COLUMN     "price" INTEGER DEFAULT 0;
