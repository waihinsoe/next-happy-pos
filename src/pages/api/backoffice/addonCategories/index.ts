import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name.length > 0 && menuIds.length > 0;
    if (!isValid) return res.send(400);

    const newAddonCategory = await prisma.addon_categories.create({
      data: {
        name,
        is_required: isRequired,
      },
    });

    const menusAddonCategoriesData = menuIds.map((menuId: number) => ({
      menus_id: menuId,
      addon_categories_id: newAddonCategory.id,
    }));

    await prisma.menus_addon_categories.createMany({
      data: menusAddonCategoriesData,
    });
    res.send(200);
  } else if (req.method === "PUT") {
    res.send("this put ");
  } else if (req.method === "DELETE") {
    res.send("this is delete");
  } else {
    res.send(405);
  }
}
