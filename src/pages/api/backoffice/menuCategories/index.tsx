import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const menuCategoryId = req.query.menuCategoryId as string;

    const deletedMenuCategory = await prisma.menu_categories.delete({
      where: {
        id: Number(menuCategoryId),
      },
    });

    console.log(deletedMenuCategory);
    res.send(200);
  }
}
