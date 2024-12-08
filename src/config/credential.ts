import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string | undefined;
  MONGO_URI: string | undefined;
  REDIS_HOST: string | undefined;
  REDIS_PORT: string | undefined;
  REDIS_USERNAME: string | undefined;
  REDIS_PASSWORD: string | undefined;
}

const envConfig: EnvConfig = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};

export const MONGO_URI = envConfig.MONGO_URI!;
export const REDIS_HOST = envConfig.REDIS_HOST!;
export const REDIS_PORT = envConfig.REDIS_PORT!;
export const REDIS_USERNAME = envConfig.REDIS_USERNAME!;
export const REDIS_PASSWORD = envConfig.REDIS_PASSWORD!;
export const PORT = envConfig.PORT!;
