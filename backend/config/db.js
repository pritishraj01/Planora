import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const mongoUrl= process.env.MONGO_URL
const connectDB= async()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB