import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";
import QRCode from "qrcode";
import { generateLinkForQRCode } from ".";
import { v2 as cloudinary } from "cloudinary";
import { config as myConfig } from "@/config/config";

cloudinary.config({
  cloud_name: myConfig.cloudinaryName,
  api_key: myConfig.cloudinaryApiKey,
  api_secret: myConfig.cloudinaryApiSecret,
});

//set s3 endpoint to digitalocean spaces
const s3Client = new S3Client({
  endpoint: config.spaceEndPoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const qrCodeImageUpload = async (
  locationId: number,
  tableId: number
) => {
  try {
    const qrCodeImageData = await QRCode.toDataURL(
      generateLinkForQRCode(locationId, tableId)
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
          public_id: `happy-pos/qrcode/locationId-${locationId}-tableId-${tableId}`,
          format: "png", // Set the format according to your buffer content
        },
        (error, result) => {
          if (error) {
            console.error(error);
          } else {
            return result?.secure_url;
          }
        }
      )
      .end(imageBuffer);
    // const input = {
    //   Bucket: "msquarefdc",
    //   Key: `happy-pos/qrcode/wai-hin-soe/locationId-${locationId}-tableId-${tableId}.png`,
    //   ACL: "public-read",
    //   Body: Buffer.from(
    //     qrCodeImageData.replace(/^data:image\/\w+;base64,/, ""),
    //     "base64"
    //   ),
    // };
    // const command = new PutObjectCommand(input);
    // await s3Client.send(command);
  } catch (err) {
    console.log("##################error ##################");
    console.log(err);
  }
};

// Change bucket property to your space name
export const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `happy-pos/wai-hin-soe/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage }).array("files", 1);
