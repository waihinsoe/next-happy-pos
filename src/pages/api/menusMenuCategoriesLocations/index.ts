import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const locationId = req.query.locationId as string;
    const isValid = locationId;
    if (!isValid) return res.status(400).send("bad request");
    const menusMenuCategoriesLocations =
      await prisma.menus_menu_categories_locations.findMany({
        where: {
          locations_id: Number(locationId),
          is_archived: false,
        },
      });
    return res.status(200).send(menusMenuCategoriesLocations);
  } else {
    return res.status(405).send("method not allowed");
  }
}
