// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../utils/db";
type Menu = {
  id?: string;
  name: string;
  price: number;
  locationIds: string[];
  imageUrl?: string;
  menuCategoryIds?: string[];
  addonCategoryIds?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Menu[]>
) {
  const menusResult = await pool.query("SELECT * FROM menus");
  res.send(menusResult.rows);
}
