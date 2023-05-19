interface Config {
  apiBaseUrl: string;
  jwtSecret: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  spaceEndPoint: string;
  dataBaseHostUrl: string;
  dataBaseUserName: string;
  dataBasePassword: string;
  dataBaseName: string;
}

export const config: Config = {
  apiBaseUrl: process.env.VITE_API_BASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndPoint: process.env.SPACE_ENDPOINT || "",
  dataBaseHostUrl: process.env.DATABASE_HOST_URL || "",
  dataBaseUserName: process.env.DATABASE_USERNAME || "",
  dataBasePassword: process.env.DATABASE_PASSWORD || "",
  dataBaseName: process.env.DATABASE_NAME || "",
};
