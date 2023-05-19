import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  host: config.dataBaseHostUrl,
  user: config.dataBaseUserName,
  password: config.dataBasePassword,
  database: config.dataBaseName,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
