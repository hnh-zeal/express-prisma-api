import express, { Router } from "express";

import { AdminRoutes } from "./admins";
import { UserRoutes } from "./users";

const router: Router = express.Router();

export function versionOneRoutes(): Router {
  router.use("/admins", AdminRoutes());
  router.use("/users", UserRoutes());

  return router;
}
