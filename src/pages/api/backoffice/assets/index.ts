import type { NextApiRequest, NextApiResponse } from "next";
import type { Request, Response } from "express";
import { fileUpload } from "@/utils/fileUpload";

export const config = {
  api: {
    bodyParser: false,
  },
};

type CustomNextApiRequest = NextApiRequest & Request & { files: any[] };

type CustomNextApiResponse = NextApiResponse & Response;

export default function handler(
  req: CustomNextApiRequest,
  res: CustomNextApiResponse
) {
  try {
    fileUpload(req, res, (error) => {
      if (error) return res.status(500).json({ err: "error" });
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.status(200).json({ assetUrl });
    });
  } catch (error) {
    res.status(500).json({ err: "error" });
  }
}
