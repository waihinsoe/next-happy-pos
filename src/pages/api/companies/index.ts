import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, name, address } = req.body;
    const isValid = id && name && address;
    if (!isValid) return res.send(400);

    await prisma.companies.update({
      data: {
        name,
        address,
      },
      where: {
        id,
      },
    });

    return res.send(200);
  }
}
