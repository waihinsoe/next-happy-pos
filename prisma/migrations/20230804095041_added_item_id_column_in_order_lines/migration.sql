/*
  Warnings:

  - Added the required column `item_id` to the `orderLines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderLines" ADD COLUMN     "item_id" TEXT NOT NULL;
