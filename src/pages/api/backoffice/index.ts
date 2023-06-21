// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.send(401);

  const user = session.user;
  const name = user?.name as string;
  const email = user?.email as string;

  const userFromDb = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (!userFromDb) {
    const newCompany = await prisma.companies.create({
      data: {
        name: "defaultCompany",
        address: "defaultAddress",
      },
    });

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: "",
        companies_id: newCompany.id,
        role: "user",
      },
    });

    const newLocation = await prisma.locations.create({
      data: {
        name: "defaultLocation",
        address: "defaultAddress",
        companies_id: newCompany.id,
      },
    });

    const newMenusData = [
      { name: "lat-phet-tope", price: 500 },
      { name: "shan-khout-swe", price: 500 },
    ];

    const newMenus = await prisma.$transaction(
      newMenusData.map((menu) => prisma.menus.create({ data: menu }))
    );

    const newMenuCategoriesData = [
      { name: "default category1" },
      { name: "default category2" },
    ];

    const newMenuCategories = await prisma.$transaction(
      newMenuCategoriesData.map((menuCategory) =>
        prisma.menu_categories.create({ data: menuCategory })
      )
    );
    const newMenusMenuCategoriesLocationsData = [
      {
        menus_id: newMenus[0].id,
        menu_categories_id: newMenuCategories[0].id,
        locations_id: newLocation.id,
      },
      {
        menus_id: newMenus[1].id,
        menu_categories_id: newMenuCategories[1].id,
        locations_id: newLocation.id,
      },
    ];
    const newMenusMenuCategoriesLocations = await prisma.$transaction(
      newMenusMenuCategoriesLocationsData.map((menuMenuCategoryLocation) =>
        prisma.menus_menu_categories_locations.create({
          data: menuMenuCategoryLocation,
        })
      )
    );

    const newAddonCategoriesData = [
      { name: "drink", is_required: false },
      { name: "size", is_required: true },
    ];

    const newAddonCategories = await prisma.$transaction(
      newAddonCategoriesData.map((addonCategory) =>
        prisma.addon_categories.create({ data: addonCategory })
      )
    );

    await prisma.menus_addon_categories.createMany({
      data: [
        {
          menus_id: newMenus[0].id,
          addon_categories_id: newAddonCategories[0].id,
        },
        {
          menus_id: newMenus[1].id,
          addon_categories_id: newAddonCategories[1].id,
        },
      ],
    });

    const newAddonsData = [
      {
        name: "cola",
        price: 500,
        addon_categories_id: newAddonCategories[0].id,
      },
      {
        name: "pepsi",
        price: 500,
        addon_categories_id: newAddonCategories[0].id,
      },
      {
        name: "normal",
        price: 0,
        addon_categories_id: newAddonCategories[1].id,
      },
      {
        name: "large",
        price: 300,
        addon_categories_id: newAddonCategories[1].id,
      },
    ];

    const newAddons = await prisma.$transaction(
      newAddonsData.map((addon) => prisma.addons.create({ data: addon }))
    );

    return res.send({
      menus: newMenus,
      menuCategories: newMenuCategories,
      addons: newAddons,
      addonCategories: newAddonCategories,
      locations: newLocation,
      menusMenuCategoriesLocations: newMenusMenuCategoriesLocations,
      company: newCompany,
    });
  } else {
    const companyId = userFromDb.companies_id as number;

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

    const tables = await prisma.tables.findMany({
      where: {
        locations_id: {
          in: locationIds,
        },
      },
    });

    const menusMenuCategoriesLocations =
      await prisma.menus_menu_categories_locations.findMany({
        where: {
          locations_id: {
            in: locationIds,
          },
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
      (menusAddonCategory) => menusAddonCategory.addon_categories_id
    ) as number[];

    const addons = await prisma.addons.findMany({
      where: {
        addon_categories_id: {
          in: addonCategoryIds,
        },
        is_archived: false,
      },
    });
    const addonCategories = await prisma.addon_categories.findMany({
      where: {
        id: {
          in: addonCategoryIds,
        },
        is_archived: false,
      },
    });

    res.send({
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
    });
  }
}
