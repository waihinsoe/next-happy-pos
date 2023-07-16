import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const queryData = req.query.locationIds as string;
    const locationIds = queryData.split(",").map((item) => Number(item));
    const isValid = locationIds.length;
    if (!isValid) return res.status(400).send("bad request");
    const menusMenuCategoriesLocations =
      await prisma.menus_menu_categories_locations.findMany({
        where: {
          locations_id: {
            in: locationIds,
          },
          is_archived: false,
        },
      });
    return res.status(200).send(menusMenuCategoriesLocations);
  } else {
    return res.status(405).send("method not allowed");
  }
}
