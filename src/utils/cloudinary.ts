import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config";

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});
