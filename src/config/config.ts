interface Config {
  orderAppUrl: string;
  apiBaseUrl: string;
  // backOfficeApiBaseUrl: string;
  // orderApiBaseUrl: string;
  jwtSecret: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  spaceEndPoint: string;
  dataBaseHostUrl: string;
  dataBaseUserName: string;
  dataBasePassword: string;
  dataBaseName: string;
  clientId: string;
  clientSecret: string;
  cloudinaryName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
}

export const config: Config = {
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  // backOfficeApiBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
  // orderApiBaseUrl: process.env.NEXT_PUBLIC_ORDER_API_BASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndPoint: process.env.SPACE_ENDPOINT || "",
  dataBaseHostUrl: process.env.DATABASE_HOST_URL || "",
  dataBaseUserName: process.env.DATABASE_USERNAME || "",
  dataBasePassword: process.env.DATABASE_PASSWORD || "",
  dataBaseName: process.env.DATABASE_NAME || "",
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
};
