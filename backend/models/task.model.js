import mongoose, { mongo } from "mongoose"

let TaskSchema= new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    workspaceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Work",
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Task= mongoose.model("Task",TaskSchema)

export default Task