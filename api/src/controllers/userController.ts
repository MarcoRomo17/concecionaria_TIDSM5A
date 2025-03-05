import { Request, Response } from "express";
import { usersModel } from "../models/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Clave secreta para JWT (debería ir en variables de entorno)
const JWT_SECRET = "pocoyo";

// Registrar un usuario
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new usersModel({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Inicio de sesión exitoso", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Obtener todos los usuarios
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await usersModel.find().select("-password"); // Excluir la contraseña
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, password } = req.body;

    const updatedData: any = { name, lastName, email };
    
    // Si hay una nueva contraseña, la encripta antes de actualizar
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await usersModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await usersModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
