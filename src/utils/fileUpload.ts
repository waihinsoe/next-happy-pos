import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";
import QRCode from "qrcode";

//set s3 endpoint to digitalocean spaces
const s3Client = new S3Client({
  endpoint: config.spaceEndPoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const qrCodeImageUpload = async () => {
  const data = {
    Bucket: "msquarefdc",
    Key: "happy-pos/qrcode/wai-hin-soe/qrcode.png",
    ACL: "public-read",
    body: Buffer.from(""),
  };

  try {
    const qrCodeImageData = await QRCode.toDataURL("https://google.com");
    const buf = Buffer.from(
      qrCodeImageData.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    data.body = buf;
    const command = new PutObjectCommand(data);
    const response = await s3Client.send(command);
    console.log(response);
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
