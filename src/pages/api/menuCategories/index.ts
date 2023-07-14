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

    const deletedMenuCategory = await prisma.menu_categories.update({
      where: {
        id: Number(menuCategoryId),
      },
      data: {
        is_archived: true,
      },
    });

    console.log(deletedMenuCategory);
    res.send(200);
  } else if (req.method === "PUT") {
    const { id, name, locations } = req.body;
    const menuCategoryId = Number(id);
    const locationIds = locations.map((item: any) => item.id) as number[];
    const isValid = id && name && locations.length && locationIds.length;

    if (!isValid) return res.status(400).send("Bad request");

    //edit name
    await prisma.menu_categories.update({
      data: {
        name,
      },
      where: {
        id: menuCategoryId,
      },
    });

    // if (!locationIds.length) {
    //   //null all locations
    //   await prisma.menus_menu_categories_locations.updateMany({
    //     data: {
    //       locations_id: null,
    //     },
    //     where: {
    //       menu_categories_id: menuCategoryId,
    //     },
    //   });
    //   return res.send(200);
    // }

    // get rows from database
    const menusMenuCategoriesLocations =
      await prisma.menus_menu_categories_locations.findMany({
        where: {
          menu_categories_id: menuCategoryId,
        },
      });

    //get locations ids that already existed in database
    const existingLocationIds = [
      ...new Set(
        menusMenuCategoriesLocations
          .map((item) => item.locations_id)
          .filter((item) => item)
      ),
    ];

    //find added location Ids
    const addedLocationIds = locationIds.filter(
      (item) => !existingLocationIds.includes(item)
    );

    const removedLocationIds = existingLocationIds.filter(
      (item: any) => !locationIds.includes(item as number)
    ) as number[];

    if (addedLocationIds.length) {
      const newMenusMenuCategoriesLocations = addedLocationIds.map((item) => ({
        locations_id: item,
        menu_categories_id: menuCategoryId,
      }));

      await prisma.menus_menu_categories_locations.createMany({
        data: newMenusMenuCategoriesLocations,
      });
    }

    if (removedLocationIds.length) {
      removedLocationIds.forEach(async (locationId) => {
        const row = await prisma.menus_menu_categories_locations.findFirst({
          where: {
            locations_id: locationId,
            menu_categories_id: menuCategoryId,
          },
        });

        if (row) {
          if (row.menus_id) {
            await prisma.menus_menu_categories_locations.update({
              data: {
                locations_id: null,
              },
              where: {
                id: row.id,
              },
            });
          } else {
            await prisma.menus_menu_categories_locations.delete({
              where: {
                id: row.id,
              },
            });
          }
        }
      });
      return res.send(200);
    }

    return res.send(200);
  }
}
