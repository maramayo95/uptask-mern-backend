import {
  obtenerProyectos,
  obtenerProyecto,
  nuevoProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
} from "../controllers/proyectoController.js";
import express from "express";
import checkAuth from "../middleware/checkAuth.js";

const proyectoRouter = express.Router();
proyectoRouter
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);
proyectoRouter
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);
proyectoRouter.get("/tareas/:id", checkAuth, obtenerTareas);
proyectoRouter.post("/agregar-colaborador/:id", checkAuth, agregarColaborador);
proyectoRouter.post(
  "/eliminar-colaborador/:id",
  checkAuth,
  eliminarColaborador
);

export default proyectoRouter;
