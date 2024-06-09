import {config} from 'dotenv';
import { cleanEnv, str, num, url } from 'envalid';
import { resolve } from 'path';

const environment = process.env.NODE_ENV || 'development';

config({ path: resolve(__dirname, `../../.env.${environment}`) });

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  SERVER_PORT: num(),
  API_URL: url(),
  CLIENT_URL: url(),
  DB_HOST: str(),
  DB_PORT: num(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
  MONGO_DB_CONNECTION: url(),
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  SMTP_HOST: str(),
  SMTP_PORT: num(),
  SMTP_USER: str(),
  SMTP_PASSWORD: str(),
  FIREBASE_API_KEY: str(),
  FIREBASE_AUTH_DOMAIN: str(),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_STORAGE_BUCKET: str(),
  FIREBASE_MESSAGING_SENDER_ID: str(),
  FIREBASE_APP_ID: str(),
  FIREBASE_MEASUREMENT_ID: str(),
});

export {env};