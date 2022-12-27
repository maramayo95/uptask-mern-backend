import Proyecto from "../models/Proyecto.js";
import Tareas from "../models/Tareas.js";
import Tarea from "../models/Tareas.js";

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;
  const encontrarProyecto = await Proyecto.findById(proyecto);
  if (!encontrarProyecto) {
    const error = new Error("El proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (encontrarProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      "No tiene los permisos para poder acceder a este sitio"
    );
    return res.status(403).json({ msg: error.message });
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body);
    res.send(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("No tienes los permisos para poder añadir tareas");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes los permisos para poder añadir tareas");
    return res.status(403).json({ msg: error.message });
  }
  res.json(tarea);
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("No tienes los permisos para poder añadir tareas");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes los permisos para poder añadir tareas");
    return res.status(403).json({ msg: error.message });
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.description = req.body.description || tarea.description;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try {
    const tareaAlmacenada = await tarea.save();
    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTarea = async (req, res) => {
  const {id} = req.params
  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("No tienes los permisos para poder añadir tareas");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes los permisos para poder añadir tareas");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await tarea.deleteOne()
    res.json({msg : "Tarea Eliminada "})
  } catch (error) {
    console.log(error)
    
  }


};

const cambiarEstado = async (req, res) => {

};



export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
