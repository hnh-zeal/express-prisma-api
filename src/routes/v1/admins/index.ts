import express, { Router } from "express";

import adminAuthMiddleware from "@/middlewares/admin-auth.middleware";
import { authRoutes } from "@/modules/admins/auth/auth.route";
import { dashboardRoutes } from "@/modules/admins/dashboard/dashboard.routes";

const router: Router = express.Router();

export function AdminRoutes(): Router {
  router.use("/auth", authRoutes());
  router.use(adminAuthMiddleware);
  router.use("/dashboard", dashboardRoutes());

  return router;
}
