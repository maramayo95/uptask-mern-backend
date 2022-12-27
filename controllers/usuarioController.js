import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const usuarios = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await Usuario.findOne({ email: email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  const usuarioRequest = req.body;
  try {
    const usuario = await new Usuario(usuarioRequest);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.send("Usuario almacenado correctamente");
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email: email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Los campos ingresados no son correctos");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  
  if (!usuarioConfirmar) {
    const error = new Error("No se ha podido realizar la solicitud");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente! " });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email: email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {}
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "Solicitud valida , Token Existe" });
  } else {
    const error = new Error("No se pudo procesar la solicitud");
    return res.status(404).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    try {
      await usuario.save();
      res.json({ msg: "Password modificada correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("No se pudo procesar la solicitud");
    return res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req,res) => {
  const {usuario} = req
  res.json(usuario)
}

export {
  usuarios,
  autenticar,
  confirmar,
  comprobarToken,
  olvidePassword,
  nuevoPassword,
  perfil
};