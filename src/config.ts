import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';
import dotenv from 'dotenv';
dotenv.config({});

export const prisma = new PrismaClient().$extends(
  readReplicas({
    url: process.env.DATABASE_URL_REPLICA_1!
  })
);

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_PORT: process.env.SERVER_PORT as string,
  SALT: process.env.SALT as string,

  ADMIN_JWT_SECRET_KEY: process.env.ADMIN_JWT_SECRET_KEY,
  USER_JWT_SECRET_KEY: process.env.USER_JWT_SECRET_KEY as string,

  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET as string,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
  AWS_REGION: process.env.AWS_REGION as string,

  PUSHY_SECRET_API_KEY: process.env.PUSHY_SECRET_API_KEY as string,
  PUSHY_STATUS: process.env.PUSHY_STATUS,

  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN as string,
  TELEGRAM_SUCCESS_CHANNEL: process.env.TELEGRAM_SUCCESS_CHANNEL as string,
  TELEGRAM_ERROR_CHANNEL: process.env.TELEGRAM_ERROR_CHANNEL as string
};
