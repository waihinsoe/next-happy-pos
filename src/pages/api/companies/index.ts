import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, name, address } = req.body;
    const isValid = id && name && address;
    if (!isValid) return res.status(400).send("bad request");

    const companyUpdated = await prisma.companies.update({
      data: {
        name,
        address,
      },
      where: {
        id,
      },
    });

    return res.status(200).send(companyUpdated);
  }
}
