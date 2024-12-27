import express, { Router } from 'express';

import profileController from './profile.controller';

import { profileSchema } from './profile.schema';
import userAuthMiddleware from '@/middlewares/user-auth.middleware';
import checkSchema from '@/utils/validation-message';

const router: Router = express.Router();

export function profileRoutes(): Router {
  router.get('/', profileController.getUserProfile);
  router.put('/', checkSchema(profileSchema.update), profileController.updateProfile);

  return router;
}
