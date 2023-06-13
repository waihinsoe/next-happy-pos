/*
  Warnings:

  - A unique constraint covering the columns `[menus_id,menu_categories_id,locations_id]` on the table `menus_menu_categories_locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "menus_menu_categories_locations_menus_id_menu_categories_id_key" ON "menus_menu_categories_locations"("menus_id", "menu_categories_id", "locations_id");
