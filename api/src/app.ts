import  { Application, Response, Request } from "express";
import cors from "cors";
import express from "express"
import { actualizarCarro, borrarCarro, registrarCarro, TraerTODOSCarros } from "./controllers/CarrosController";
import { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } from "./controllers/userController";


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

app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/", getUsers);
app.get("/:id", getUserById);
app.put("/:id", updateUser);
app.delete("/:id", deleteUser);

export default app;