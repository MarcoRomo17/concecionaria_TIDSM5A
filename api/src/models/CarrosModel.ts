import { model, Schema } from "mongoose";
import { ICarro } from "../GlobalTypes";


const CarroEsquema= new Schema<ICarro>({
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    URLimg:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    detalles:{
        type:String,
        required:true
    }
})

export const CarroModel= model("CARROS", CarroEsquema)
