import { Router } from "express";
import { MonoRoutes } from "./controllers/cases/routes";
export class AppRoutes{
  static get routes() : Router{
    const router = Router();
    router.use("/api/cases", MonoRoutes.routes);
    return router;
  }
}