// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/utils/db";
import { MenuList } from "@mui/material";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email as string;
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (!user) return res.send(500);
  const companyId = user.companies_id as number;

  const company = await prisma.companies.findFirst({
    where: {
      id: companyId,
    },
  });

  const locations = await prisma.locations.findMany({
    where: {
      companies_id: companyId,
    },
  });

  const locationIds = locations.map((location) => location.id);
  console.log(locationIds);

  const menusLocations = await prisma.menus_locations.findMany({
    where: {
      locations_id: {
        in: locationIds,
      },
    },
  });

  const menuIds = menusLocations.map(
    (menusLocation) => menusLocation.menus_id
  ) as number[];

  const menus = await prisma.menus.findMany({
    where: {
      id: {
        in: menuIds,
      },
    },
  });

  const menusMenuCategories = await prisma.menus_menu_categories.findMany({
    where: {
      menus_id: {
        in: menuIds,
      },
    },
  });

  const menuCategoryIds = menusMenuCategories.map(
    (menusMenuCategory) => menusMenuCategory.menu_categories_id
  ) as number[];

  const menuCategories = await prisma.menu_categories.findMany({
    where: {
      id: {
        in: menuCategoryIds,
      },
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
    (menusAddonCategory) => menusAddonCategory.addon_categories_id
  ) as number[];

  const addons = await prisma.addons.findMany({
    where: {
      addon_categories_id: {
        in: addonCategoryIds,
      },
    },
  });
  const addonCategories = await prisma.addon_categories.findMany({
    where: {
      id: {
        in: addonCategoryIds,
      },
    },
  });

  res.send({
    menus,
    menuCategories,
    addons,
    addonCategories,
    locations,
    menusLocations,
    company,
  });
}
