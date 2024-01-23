import { generateLinkForQRCode, getQrCodeUrl } from "@/utils";
import { prisma } from "@/utils/db";
import { qrCodeImageUpload } from "@/utils/fileUpload";
import { NextApiRequest, NextApiResponse } from "next";
import QRCode from "qrcode";
import { v2 as cloudinary } from "cloudinary";
import { config as myConfig } from "@/config/config";

cloudinary.config({
  cloud_name: myConfig.cloudinaryName,
  api_key: myConfig.cloudinaryApiKey,
  api_secret: myConfig.cloudinaryApiSecret,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("bad request");

    const newTable = await prisma.tables.create({
      data: {
        name,
        locations_id: Number(locationId),
      },
    });

    // const qrcodeUrl = await qrCodeImageUpload(Number(locationId), newTable.id);
    const qrCodeImageData = await QRCode.toDataURL(
      generateLinkForQRCode(locationId, newTable.id)
    );
    const imageBuffer = Buffer.from(
      qrCodeImageData.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    // Upload the buffer to Cloudinary
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          public_id: `happy-pos/qrcode/locationId-${locationId}-tableId-${newTable.id}`,
          format: "png", // Set the format according to your buffer content
        },
        async (error, result) => {
          if (error) {
            console.error(error);
          } else {
            const tableCreated = await prisma.tables.update({
              data: {
                asset_url: result?.secure_url,
              },
              where: {
                id: newTable.id,
              },
            });

            return res.status(200).send(tableCreated);
          }
        }
      )
      .end(imageBuffer);

    // const qrcodeUrl = getQrCodeUrl(Number(locationId), newTable.id);
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
