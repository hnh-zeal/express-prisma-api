import express, { Router } from 'express';

import userAuthMiddleware from '@/middlewares/user-auth.middleware';
import { profileRoutes } from '@/modules/users/profile/profile.routes';
import { authRoutes } from '@/modules/admins/auth/auth.route';

const router: Router = express.Router();

export function UserRoutes(): Router {
  router.use('/auth', authRoutes());
  router.use(userAuthMiddleware);
  router.use('/profile', profileRoutes());

  return router;
}
