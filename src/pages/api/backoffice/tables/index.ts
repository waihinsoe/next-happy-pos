import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.send(400);

    await prisma.tables.create({
      data: {
        name,
        locations_id: Number(locationId),
      },
    });

    return res.send(200);
  } else if (req.method === "PUT") {
    const { tableId, name } = req.body;
    const isValid = tableId && name;
    if (!isValid) return res.send(400);

    await prisma.tables.update({
      data: {
        name,
      },
      where: {
        id: Number(tableId),
      },
    });
    res.send(200);
  } else {
    res.send(405);
  }
}
