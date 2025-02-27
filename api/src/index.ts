import app from "./app";
import mongoose from "mongoose";

async function main(){
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/CONCE"
        );
        console.log('BD corriendo con exito');
        app.listen(4010, ()=>{
            console.log("Aplicacion corriendo con exito")
        })
    } catch (error) {
        console.log("Algo salio mal con la base de datos")
    }


}
main();
