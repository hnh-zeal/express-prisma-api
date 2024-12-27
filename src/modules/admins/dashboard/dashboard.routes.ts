import express, { Router } from 'express';

import dashboardController from './dashboard.controller';

const router: Router = express.Router();

export function dashboardRoutes(): Router {
  router.get('/dashboard', dashboardController.dashboard);

  return router;
}
