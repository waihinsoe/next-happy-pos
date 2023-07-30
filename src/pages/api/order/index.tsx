// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import { CartItem } from "@/typings/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getCartTotalPrice } from "@/utils";

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

    if (!location) return;

    const company = await prisma.companies.findFirst({
      where: {
        id: location.companies_id as number,
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

    const orders = await prisma.orders.findMany({
      where: {
        locations_id: Number(locationId),
      },
    });

    const orderIds = orders.map((order) => order.id);

    const orderLines = await prisma.orderLines.findMany({
      where: {
        orders_id: {
          in: orderIds,
        },
      },
    });

    return res.send({
      company,
      locations: [location],
      menus,
      menuCategories,
      addons,
      menusAddonCategories,
      addonCategories,
      menusMenuCategoriesLocations,
      orders,
      orderLines,
    });
  } else if (req.method === "POST") {
    const { locationId, tableId } = req.query;
    const cart: CartItem[] = req.body.cart;

    const isValid = locationId && tableId && cart.length;
    if (!isValid) return res.send(400);

    const newOrder = await prisma.orders.create({
      data: {
        locations_id: Number(locationId),
        tables_id: Number(tableId),
        price: getCartTotalPrice(cart),
      },
    });

    cart.forEach(async (orderLine) => {
      const menu = orderLine.menu;
      const hasAddons = orderLine.addons.length;
      if (hasAddons) {
        const addons = orderLine.addons;
        const orderLineData = addons.map((addon) => {
          return {
            orders_id: newOrder.id,
            menus_id: menu.id,
            addons_id: addon.id,
          };
        });
        await prisma.orderLines.createMany({
          data: orderLineData,
        });
      } else {
        await prisma.orderLines.create({
          data: {
            orders_id: newOrder.id,
            menus_id: menu.id,
          },
        });
      }
    });
    return res.send({ order: newOrder });
  } else {
    return res.send(405);
  }
}
