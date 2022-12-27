import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  actualizarTarea,
  agregarTarea,
  cambiarEstado,
  eliminarTarea,
  obtenerTarea,
  
} from "../controllers/tareasController.js";

const tareaRoute = express.Router();

tareaRoute.post("/", checkAuth, agregarTarea);
tareaRoute.route("/:id")
  .get(checkAuth, obtenerTarea)
  .put(checkAuth, actualizarTarea)
  .delete(checkAuth, eliminarTarea);
tareaRoute.post('/estado/:id', checkAuth, cambiarEstado)
export default tareaRoute;
