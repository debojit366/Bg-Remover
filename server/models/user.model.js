import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    clerkId : {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    creditBalance:{
        type:Number,
        default:5
    }
})
export const userModel = mongoose.model("user",userSchema)
