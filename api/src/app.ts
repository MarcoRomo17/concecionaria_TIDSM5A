import  { Application, Response, Request } from "express";
import cors from "cors";
import express from "express"
import { actualizarCarro, borrarCarro, registrarCarro, TraerTODOSCarros } from "./controllers/CarrosController";
import {registrarUsuario, loginUsuario, obtenerTodosUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario} from "./controllers/userController"


const app:Application = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (_req: Request,res: Response)=>{
    res.send("Hola desde mi servidor con TS")

})

//ENDPOINTS de carro
app.post("/carro/create", registrarCarro )
app.get("/carro/getAll", TraerTODOSCarros)
app.post("/carro/update",actualizarCarro)
app.delete("/carro/delete", borrarCarro)

app.post("/register", registrarUsuario)
app.post("/login", loginUsuario)
app.get("/", obtenerTodosUsuarios)
app.get("/:id", obtenerUsuarioPorId)
app.put("/:id", actualizarUsuario)
app.delete("/:id", eliminarUsuario)

export default app;