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
    const { id, name, is_required } = req.body;
    const isValid = id && name;
    if (!isValid) return res.send(400);

    await prisma.addon_categories.update({
      data: {
        name,
        is_required,
      },
      where: {
        id,
      },
    });
    res.send(200);
  } else if (req.method === "DELETE") {
    const addonCategoryId = req.query.id as string;

    await prisma.addon_categories.update({
      where: {
        id: Number(addonCategoryId),
      },
      data: {
        is_archived: true,
      },
    });
    res.send(200);
  } else {
    res.send(405);
  }
}
