import Proyecto from "../models/Proyecto.js";
import Tareas from "../models/Tareas.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
  res.status(200).send(proyectos);
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById({ _id: id });

  if (!proyecto) {
    const error = new Error("No se pudo encontrar el proyecto");
    return res.send(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No válida");
    return res.status(401).json({ msg: error.message });
  }

  
  const tareas = await Tareas.find().where('proyecto').equals(id)

  res.status(200).json({proyecto, tareas});
};

const nuevoProyecto = async (req, res) => {
  const proyecto = await new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const proyecto = await Proyecto.findById({ _id: id });

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.send(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No válida");
    return res.status(401).json({ msg: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.description = req.body.description || proyecto.description;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error.message);
  }
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const proyecto = await Proyecto.findById({ _id: id });

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.send(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No válida");
    return res.status(401).json({ msg: error.message });
  }
  try {
    await Proyecto.findByIdAndDelete(id)
    res.json({msg: "Proyecto Eliminado"})
  } catch (error) {
    console.log(error.message)
  }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

const obtenerTareas = async (req, res) => {};

export {
  obtenerProyectos,
  obtenerProyecto,
  nuevoProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
};
