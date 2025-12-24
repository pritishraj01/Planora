import mongoose from "mongoose"

const workSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Work= mongoose.model("Work",workSchema)

export default Work