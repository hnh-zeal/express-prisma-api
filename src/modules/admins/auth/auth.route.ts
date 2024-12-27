import express, { Router } from 'express';

import authController from './auth.controller';

const router: Router = express.Router();

export function authRoutes(): Router {
  router.post('/login', authController.login);

  return router;
}
