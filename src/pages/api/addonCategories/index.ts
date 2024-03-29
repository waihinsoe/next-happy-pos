import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name.length > 0 && menuIds.length > 0;
    if (!isValid) return res.status(400).send("bad request");

    const addonCategoryCreated = await prisma.addon_categories.create({
      data: {
        name,
        is_required: isRequired,
      },
    });

    const menusAddonCategoriesData = menuIds.map((menuId: number) => ({
      menus_id: menuId,
      addon_categories_id: addonCategoryCreated.id,
    }));

    await prisma.menus_addon_categories.createMany({
      data: menusAddonCategoriesData,
    });
    res.status(200).send(addonCategoryCreated);
  } else if (req.method === "PUT") {
    const { id, name, is_required } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(400).send("bad request");

    const addonCategoryUpdated = await prisma.addon_categories.update({
      data: {
        name,
        is_required,
      },
      where: {
        id,
      },
    });
    res.status(200).send(addonCategoryUpdated);
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
    res.status(200).send("ok");
  } else {
    res.status(405).send("method not allowed");
  }
}
