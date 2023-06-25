// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import { FormatListBulleted } from "@mui/icons-material";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const locationId = req.query.locationId as string;

    const location = await prisma.locations.findFirst({
      where: {
        id: Number(locationId),
        is_archived: false,
      },
    });

    const menusMenuCategoriesLocations =
      await prisma.menus_menu_categories_locations.findMany({
        where: {
          locations_id: Number(locationId),
          is_archived: false,
        },
      });

    //menuIds may be [1,2,null]
    const menuIds = menusMenuCategoriesLocations
      .map((item) => item.menus_id)
      .filter((item) => item !== null) as number[];

    const menus = await prisma.menus.findMany({
      where: {
        id: {
          in: menuIds,
        },
        is_archived: false,
      },
    });

    const menuCategoryIds = menusMenuCategoriesLocations.map(
      (item) => item.menu_categories_id
    ) as number[];

    const menuCategories = await prisma.menu_categories.findMany({
      where: {
        id: {
          in: menuCategoryIds,
        },
        is_archived: false,
      },
    });

    const menusAddonCategories = await prisma.menus_addon_categories.findMany({
      where: {
        menus_id: {
          in: menuIds,
        },
      },
    });

    const addonCategoryIds = menusAddonCategories.map(
      (menuAddonCategory) => menuAddonCategory.addon_categories_id
    ) as number[];

    const addonCategories = await prisma.addon_categories.findMany({
      where: {
        id: {
          in: addonCategoryIds,
        },
        is_archived: false,
      },
    });

    const addons = await prisma.addons.findMany({
      where: {
        addon_categories_id: {
          in: addonCategoryIds,
        },
        is_archived: false,
      },
    });

    return res.send({
      locations: [location],
      menus,
      menuCategories,
      addons,
      menusAddonCategories,
      addonCategories,
      menusMenuCategoriesLocations,
    });
  }
}
