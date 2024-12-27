import { Application } from "express";

import { versionOneRoutes } from "@/routes/v1";
import errorMiddleware from "@/utils/error";

export function appRoutes(app: Application): void {
  // API Version 1 routes
  app.use("/api/v1", versionOneRoutes());

  // Error middleware
  app.use(errorMiddleware);
}
