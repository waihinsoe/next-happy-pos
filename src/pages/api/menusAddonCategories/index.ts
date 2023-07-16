import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const queryData = req.query.menuIds as string;
    const menuIds = queryData.split(",").map((item) => Number(item));
    const isValid = menuIds.length;
    if (!isValid) return res.status(400).send("bad request");
    const menusAddonCategories = await prisma.menus_addon_categories.findMany({
      where: {
        menus_id: {
          in: menuIds,
        },
      },
    });

    return res.status(200).send(menusAddonCategories);
  } else {
    return res.status(405).send("method not allowed");
  }
}
