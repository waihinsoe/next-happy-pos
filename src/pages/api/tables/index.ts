import { getQrCodeUrl } from "@/utils";
import { prisma } from "@/utils/db";
import { qrCodeImageUpload } from "@/utils/fileUpload";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("bad request");

    const tableCreated = await prisma.tables.create({
      data: {
        name,
        locations_id: Number(locationId),
      },
    });

    await qrCodeImageUpload(Number(locationId), tableCreated.id);

    const qrcodeUrl = getQrCodeUrl(Number(locationId), tableCreated.id);

    await prisma.tables.update({
      data: {
        asset_url: qrcodeUrl,
      },
      where: {
        id: tableCreated.id,
      },
    });

    return res.status(200).send(tableCreated);
  } else if (req.method === "PUT") {
    const { id: tableId, name } = req.body;
    const isValid = tableId && name;
    if (!isValid) return res.status(400).send("bad request");

    const tableUpdated = await prisma.tables.update({
      data: {
        name,
      },
      where: {
        id: Number(tableId),
      },
    });
    res.status(200).send(tableUpdated);
  } else if (req.method === "DELETE") {
    const tableId = req.query.tableId as string;
    if (!tableId) return res.send(400);
    await prisma.tables.update({
      data: {
        is_archived: true,
      },
      where: {
        id: Number(tableId),
      },
    });

    return res.send(200);
  } else {
    res.send(405);
  }
}
