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
  } else if (req.method === "PUT") {
    const { id: addonId, name, price } = req.body;
    const isValid = addonId && name;
    if (!isValid) return res.send(400);
    await prisma.addons.update({
      data: {
        name,
        price,
      },
      where: {
        id: addonId,
      },
    });
    return res.send(200);
  } else if (req.method === "DELETE") {
    const addonId = req.query.addonId as string;

    await prisma.addons.update({
      data: {
        is_archived: true,
      },
      where: {
        id: Number(addonId),
      },
    });

    return res.send(200);
  } else {
    return res.send(405);
  }
}
