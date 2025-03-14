import { Request,Response } from "express";
import { CarroModel } from "../models/CarrosModel";

export const registrarCarro= async (req:Request, res: Response): Promise<any>=>{
    try {
        //Recibimos los parametros del body.
        //Desestructuramos el objeto que nos llega.

        const {nombre,
            precio,
            URLimg,
            year,
            detalles}= req.body

                //Validar que venga todo:
            if(!nombre||!precio||!URLimg||!year||!detalles){
                return res.status(400).json({
                    msg:" faltan datos para crear el registro"
                })                     //devolvemos un json
            }

            const carroRegistrado= await CarroModel.create({
            nombre,
            precio,
            URLimg,
            year,
            detalles
            })

            return res.status(200).json({msg:"Carro registrado con exito."})
    } catch (error) {
        console.log("Error al registrar el carro")
        console.log(error)
        return res.status(500).json({msg:"Fallo al intentar crear tarea."})
    }
}

export const TraerTODOSCarros= async (req:Request, res: Response): Promise<any>=>{
    try {
        const allCars= await CarroModel.find();
        console.log(allCars)
        return res.status(200).json({msg:"Todo bien, encontre", allCars})


    } catch (error) {
        console.log("Error al traer los carros")
        console.log(error)
        return res.status(500).json({msg:"Fallo al intentar crear tarea."})
    }
}


export const actualizarCarro= async (req:Request, res: Response): Promise<any>=>{
    try {
     console.log("Datos recibidos:", req.body);
     const {
        id,
        nombre,
        precio,
        URLimg,
        year,
        detalles}= req.body

            //Validar que venga todo:
        if(!nombre||!precio||!URLimg||!year||!detalles){
            return res.status(400).json({
                msg:" faltan datos para crear el registro"
            })                     //devolvemos un json
        }

 
         const filter= {
             _id:id,
         }
 
         const update={
            nombre,
            precio,
            URLimg,
            year,
            detalles
         }
 
         const CarroActualizado = await CarroModel.findByIdAndUpdate(filter,update)
     return res.status(200).json({msg:"Acualizado correctamente", CarroActualizado})
 
 
    } catch (error) {
     return res.status(500).json({msg:"Algo salio mal en el servidor", error})
    }
}

export const borrarCarro = async (req:Request, res: Response): Promise<any>=>{
    try {
        const {carroID} = req.body


        if(!carroID){
            return res.status(400).json({msg:"No se recibieron datos", carroID})
        }

        const carroeliminado = await CarroModel.deleteOne({_id:carroID})
        console.log("Se supoe elimine la del id", carroID)
        return res.status(200).json({msg:"Todo bien, ya lo elimine"})


    } catch (error) {
        return res.status(500).json({msg:"Algo salio mal en el servidor"})

    }
}

