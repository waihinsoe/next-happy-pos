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
    if (!isValid) return res.status(400).send("bad request");

    const locationCreated = await prisma.locations.create({
      data: {
        name,
        address,
        companies_id: Number(companyId),
      },
    });

    return res.status(200).send(locationCreated);
  } else if (req.method === "PUT") {
    const { id: locationId, name, address } = req.body;
    if (!locationId || !name || !address)
      return res.status(400).send("bad request");
    const locationUpdated = await prisma.locations.update({
      where: {
        id: locationId,
      },
      data: {
        name,
        address,
      },
    });
    res.status(200).send(locationUpdated);
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
