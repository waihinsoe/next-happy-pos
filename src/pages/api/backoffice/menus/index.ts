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
    const { id: menuId, name, price, addonCategoryIds } = req.body;

    await prisma.menus.update({
      where: {
        id: menuId,
      },
      data: {
        name,
        price,
      },
    });

    if (addonCategoryIds.length) {
      const menusAddonCategories = await prisma.menus_addon_categories.findMany(
        {
          where: {
            menus_id: menuId,
          },
        }
      );

      const existingAddonCategoryIds = menusAddonCategories.map(
        (item) => item.addon_categories_id
      );

      const addedAddonCategoryIds = addonCategoryIds.filter(
        (item: number) => !existingAddonCategoryIds.includes(item)
      ) as number[];

      const removedAddonCategoryIds = existingAddonCategoryIds.filter(
        (item) => !addonCategoryIds.includes(item)
      ) as number[];

      if (addedAddonCategoryIds.length) {
        const newMenusAddonCategoriesData = addedAddonCategoryIds.map(
          (item: number) => ({
            menus_id: menuId,
            addon_categories_id: item,
          })
        );
        await prisma.menus_addon_categories.createMany({
          data: newMenusAddonCategoriesData,
        });
      }

      if (removedAddonCategoryIds.length) {
        await prisma.menus_addon_categories.deleteMany({
          where: {
            menus_id: menuId,
            addon_categories_id: {
              in: removedAddonCategoryIds,
            },
          },
        });
      }
      return res.send(200);
    }
  } else if (req.method === "DELETE") {
    const menuId = req.query.menuId as string;
    if (!menuId) return res.send(400);

    await prisma.menus.update({
      data: {
        is_archived: true,
      },
      where: {
        id: Number(menuId),
      },
    });
    return res.send(200);
  } else {
    return res.send(405);
  }
}
