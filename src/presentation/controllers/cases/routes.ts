import { Router } from "express";
import { MonoController } from "./controller";

export class MonoRoutes{
  static get routes(): Router{
    const router = Router()
    const controller = new MonoController();
    router.get("/", controller.getCases); // Obtener todos los casos registrados
    router.get("/recent", controller.getMostRecentCases); //Obtener los casos más recientes de la ultima semana
    router.post("/", controller.createCase); //Crear un nuevo caso
    router.put("/:id",controller.updateCase); //Actualizar un caso
    router.delete("/:id",controller.deleteCase); //Eliminar un caso

    return router;
  }
}