import type { NextApiRequest, NextApiResponse } from "next";
import type { Request, Response } from "express";
import { fileUpload, upload } from "@/utils/fileUpload";
import { v2 as cloudinary } from "cloudinary";
import { config as myConfig } from "@/config/config";

cloudinary.config({
  cloud_name: myConfig.cloudinaryName,
  api_key: myConfig.cloudinaryApiKey,
  api_secret: myConfig.cloudinaryApiSecret,
});

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
    upload(req, res, (error) => {
      if (error) return res.status(500).json({ err: "error" });
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      // const publicId = `blog/${file.originalname}`;

      cloudinary.uploader.upload(
        file.path,
        // { public_id: publicId },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error",
            });
          }
          console.log(result?.secure_url);
          res.status(200).json({ assetUrl: result?.secure_url });
          // res.status(200).json({
          //   success: true,
          //   message: "Uploaded!",
          //   url: result?.secure_url,
          // });
        }
      );
      // const assetUrl = file.location;
      // res.status(200).json({ assetUrl });
    });
  } catch (error) {
    res.status(500).json({ err: "error" });
  }
}
