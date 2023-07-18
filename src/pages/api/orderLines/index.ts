import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const queryData = req.query.orderIds as string;
    console.log(queryData);
    const orderIds = queryData.split(",").map((item) => Number(item));
    const orderLines = await prisma.orderLines.findMany({
      where: {
        orders_id: {
          in: orderIds,
        },
      },
    });
    res.status(200).send(orderLines);
  } else if (req.method === "PUT") {
    const { orderId, menuId, status } = req.body;
    console.log("ok");
    const isValid = orderId && menuId;
    if (!isValid) return res.status(400).send("bad request");

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
    res.status(405).send("bad request");
  }
}
