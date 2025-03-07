import { Request, Response } from "express";
import { usersModel } from "../models/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Clave secreta para JWT (debería ir en variables de entorno)
const JWT_SECRET = "pocoyo";

// Registrar un usuario
export const registrarUsuario = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Faltan datos para crear el usuario" });
    }

    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await usersModel.create({ name, lastName, email, password: hashedPassword });

    return res.status(200).json({ msg: "Usuario registrado con éxito", newUser });
  } catch (error) {
    console.log("Error al registrar el usuario");
    console.log(error);
    return res.status(500).json({ msg: "Fallo al intentar crear el usuario." });
  }
};

// Login de usuario
export const loginUsuario = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Correo o contraseña incorrectos" });
    }

    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ msg: "Login exitoso", token });
  } catch (error) {
    console.log("Error en login");
    console.log(error);
    return res.status(500).json({ msg: "Error al iniciar sesión" });
  }
};

// Obtener todos los usuarios
export const obtenerTodosUsuarios = async (_req: Request, res: Response): Promise<any> => {
  try {
    const allUsers = await usersModel.find().select("-password"); // Excluir la contraseña
    return res.status(200).json({ msg: "Usuarios obtenidos con éxito", allUsers });
  } catch (error) {
    console.log("Error al obtener los usuarios");
    console.log(error);
    return res.status(500).json({ msg: "Fallo al intentar obtener los usuarios." });
  }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await usersModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json({ msg: "Usuario encontrado", user });
  } catch (error) {
    console.log("Error al obtener el usuario");
    console.log(error);
    return res.status(500).json({ msg: "Fallo al intentar obtener el usuario." });
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Faltan datos para actualizar el usuario" });
    }

    const updatedData: any = { name, lastName, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await usersModel.findByIdAndUpdate(id, updatedData, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json({ msg: "Usuario actualizado con éxito", updatedUser });
  } catch (error) {
    console.log("Error al actualizar el usuario");
    console.log(error);
    return res.status(500).json({ msg: "Fallo al intentar actualizar el usuario." });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "No se proporcionó un ID para eliminar el usuario" });
    }

    const deletedUser = await usersModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json({ msg: "Usuario eliminado con éxito" });
  } catch (error) {
    console.log("Error al eliminar el usuario");
    console.log(error);
    return res.status(500).json({ msg: "Fallo al intentar eliminar el usuario." });
  }
};
