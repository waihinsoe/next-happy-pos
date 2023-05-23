import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";

//set s3 endpoint to digitalocean spaces
const s3Config = new S3Client({
  endpoint: "https://sgp1.digitaloceanspaces.com",
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

// Change bucket property to your space name
export const fileUpload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `happy-pos/wai-hin-soe/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);
