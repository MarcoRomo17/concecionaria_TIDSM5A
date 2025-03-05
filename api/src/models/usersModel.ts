import { model, Schema } from "mongoose";
import { IUser } from "../GlobalTypes";


const UserSchema= new Schema<IUser>({
    name:{
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export const usersModel= model("users", UserSchema)
