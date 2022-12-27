import express from "express";
import {
  usuarios,
  autenticar,
  confirmar,
  comprobarToken,
  olvidePassword,
  nuevoPassword,
  perfil
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const usuariosRoutes = express.Router();

usuariosRoutes.post("/", usuarios);
usuariosRoutes.post("/login", autenticar);
usuariosRoutes.post("/olvide-password", olvidePassword);
usuariosRoutes.get("/confirmar/:token", confirmar);
usuariosRoutes
  .route("/olvide-password/:token")
  .get(comprobarToken)
  .post(nuevoPassword);
usuariosRoutes.get('/perfil', checkAuth, perfil)

export default usuariosRoutes;
