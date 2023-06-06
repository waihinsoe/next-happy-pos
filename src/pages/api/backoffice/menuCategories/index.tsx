import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationIds } = req.body;
    const isValid = name && locationIds.length;
    if (!isValid) return res.send(400);

    const menuCategory = await prisma.menu_categories.create({
      data: {
        name,
      },
    });

    const menusMenuCategoriesLocationsData = locationIds.map(
      (locationId: number) => ({
        menu_categories_id: menuCategory.id,
        locations_id: locationId,
      })
    );

    await prisma.menus_menu_categories_locations.createMany({
      data: menusMenuCategoriesLocationsData,
    });

    res.send(200);
  } else if (req.method === "DELETE") {
    const menuCategoryId = req.query.menuCategoryId as string;

    const deletedMenuCategory = await prisma.menu_categories.delete({
      where: {
        id: Number(menuCategoryId),
      },
    });

    console.log(deletedMenuCategory);
    res.send(200);
  }
}
