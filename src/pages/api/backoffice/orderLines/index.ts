import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { orderId, menuId, status } = req.body;
    const isValid = orderId && menuId;
    if (!isValid) return res.send(400);

    await prisma.orderLines.updateMany({
      where: {
        orders_id: Number(orderId),
        menus_id: Number(menuId),
      },
      data: {
        order_status: status,
      },
    });

    res.send(200);
  } else {
    res.send(405);
  }
}
