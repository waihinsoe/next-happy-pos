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

    const table = await prisma.tables.create({
      data: {
        name,
        locations_id: Number(locationId),
      },
    });

    await qrCodeImageUpload(Number(locationId), table.id);

    const qrcodeUrl = getQrCodeUrl(Number(locationId), table.id);

    await prisma.tables.update({
      data: {
        asset_url: qrcodeUrl,
      },
      where: {
        id: table.id,
      },
    });

    return res.status(200).send(table);
  } else if (req.method === "PUT") {
    const { id: tableId, name } = req.body;
    const isValid = tableId && name;
    if (!isValid) return res.send(400);

    const table = await prisma.tables.update({
      data: {
        name,
      },
      where: {
        id: Number(tableId),
      },
    });
    res.status(200).send(table);
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
