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

    const addonCreated = await prisma.addons.create({
      data: {
        name,
        price,
        addon_categories_id: addonCategoryId,
      },
    });
    res.status(200).send(addonCreated);
  } else if (req.method === "PUT") {
    const { id: addonId, name, price } = req.body;
    const isValid = addonId && name;
    if (!isValid) return res.status(400).send("bad request");
    const addonUpdated = await prisma.addons.update({
      data: {
        name,
        price,
      },
      where: {
        id: addonId,
      },
    });
    return res.status(200).send(addonUpdated);
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
