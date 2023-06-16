// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { qrCodeImageUpload } from "@/utils/fileUpload";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  qrCodeImageUpload();
  res.status(200).json({ name: "John Doe" });
}
