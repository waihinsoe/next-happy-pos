import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name.length > 0 && addonCategoryId;
    if (!isValid) return res.send(400);

    await prisma.addons.create({
      data: {
        name,
        price,
        addon_categories_id: addonCategoryId,
      },
    });
    res.send(200);
  }
}
