// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const locationId = req.query.locationId as string;
    const {
      name,
      price,
      menuCategoryIds,
      asset_url = "",
      description = "",
    } = req.body;
    console.log(req.body);
    const isValid = name && price && locationId && menuCategoryIds.length;
    if (!isValid) return res.send(400);

    const menu = await prisma.menus.create({
      data: {
        name,
        price,
        asset_url: asset_url,
        description,
      },
    });
    const menuId = menu.id;

    if (menuCategoryIds.length > 1) {
      const data = menuCategoryIds.map((menuCategoryId: number) => ({
        menus_id: menuId,
        locations_id: Number(locationId),
        menu_categories_id: menuCategoryId,
      }));
      await prisma.menus_menu_categories_locations.createMany({
        data,
      });
    } else {
      await prisma.menus_menu_categories_locations.create({
        data: {
          menus_id: menuId,
          locations_id: Number(locationId),
          menu_categories_id: menuCategoryIds[0],
        },
      });
    }
  } else if (req.method === "PUT") {
    console.log(req.body);
    const { id, name, price, menuCategoryIds, locationId } = req.body;

    await prisma.menus.update({
      where: {
        id,
      },
      data: {
        name,
        price,
      },
    });

    if (menuCategoryIds.length) {
      await prisma.menus_menu_categories_locations.deleteMany({
        where: {
          menus_id: id,
        },
      });

      const data = menuCategoryIds.map((menuCategoryId: number) => ({
        menus_id: id,
        locations_id: Number(locationId),
        menu_categories_id: menuCategoryId,
      }));

      await prisma.menus_menu_categories_locations.createMany({
        data,
      });
    }
    return res.send(200);
  }
  res.send(200);
}
