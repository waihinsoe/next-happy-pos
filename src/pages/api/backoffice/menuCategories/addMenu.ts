import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { menuId, menuCategoryId, locationId } = req.body;
    const isValid = menuId && menuCategoryId && locationId;
    if (!isValid) return res.send(400);

    await prisma.menus_menu_categories_locations.create({
      data: {
        menus_id: menuId,
        menu_categories_id: Number(menuCategoryId),
        locations_id: Number(locationId),
      },
    });
    res.send(200);
  }
}
