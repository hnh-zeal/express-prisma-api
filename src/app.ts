import express, { Express } from 'express';

import { databaseConnection, start } from '@/server';

const initialize = (): void => {
  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();
