import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const companyId = req.query.companyId as string;
    const { name, address } = req.body;
    const isValid = name && address && companyId;
    if (!isValid) return res.send(500);

    const newLocation = await prisma.locations.create({
      data: {
        name,
        address,
        companies_id: Number(companyId),
      },
    });

    return res.status(200).send(newLocation);
  } else if (req.method === "PUT") {
    const { id: locationId, name, address } = req.body;
    if (!locationId || !name || !address) return res.send(400);
    const location = await prisma.locations.update({
      where: {
        id: locationId,
      },
      data: {
        name,
        address,
      },
    });
    res.status(200).send(location);
  } else if (req.method === "DELETE") {
    const locationId = req.query.locationId as string;
    await prisma.locations.delete({
      where: {
        id: Number(locationId),
      },
    });
    res.send(200);
  }
}
