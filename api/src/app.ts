import  { Application, Response, Request } from "express";
import cors from "cors";
import express from "express"
import { actualizarCarro, borrarCarro, registrarCarro, TraerTODOSCarros } from "./controllers/CarrosController";
import {registrarUsuario, loginUsuario, obtenerTodosUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario, login2} from "./controllers/userController"


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

app.post("/user/register", registrarUsuario)
app.post("/user/login", loginUsuario)
app.get("/", obtenerTodosUsuarios)
app.get("/:id", obtenerUsuarioPorId)
app.put("/:id", actualizarUsuario)
app.delete("/:id", eliminarUsuario)

<<<<<<< HEAD
app.post("/api/cars", registrarCarro);
app.get("/api/cars", TraerTODOSCarros);
app.put("/api/cars", actualizarCarro);
app.delete("/api/cars", borrarCarro);
=======
app.post("/user/login2", login2)


>>>>>>> 6fe20844b6ca8666fb9c1f8d1e453471e8f7229a


export default app;