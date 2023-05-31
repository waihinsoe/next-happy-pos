/*
  Warnings:

  - Made the column `locations_id` on table `menus_menu_categories_locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `menu_categories_id` on table `menus_menu_categories_locations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "menus_menu_categories_locations" ALTER COLUMN "locations_id" SET NOT NULL,
ALTER COLUMN "menu_categories_id" SET NOT NULL,
ALTER COLUMN "is_available" SET DEFAULT true;
