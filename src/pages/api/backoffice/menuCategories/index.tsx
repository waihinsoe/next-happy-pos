import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const locationId = req.query.locationId as string;
    const { name } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.send(400);

    const menuCategory = await prisma.menu_categories.create({
      data: {
        name,
      },
    });

    await prisma.menus_menu_categories_locations.create({
      data: {
        menu_categories_id: menuCategory.id,
        locations_id: Number(locationId),
      },
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
