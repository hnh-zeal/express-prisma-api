import express, { Router } from 'express';

import authController from './auth.controller';

import { profileSchema } from './auth.schema';
import checkSchema from '@/utils/validation-message';

const router: Router = express.Router();

export function authRoutes(): Router {
  router.post('/', checkSchema(profileSchema.login), authController.loginOrRegister);

  return router;
}
