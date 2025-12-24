import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import workSpaceRouter from "./routes/workspace.routes.js"
import taskRouter from "./routes/task.routes.js"
dotenv.config()

const port=process.env.PORT || 5000
const app=express()
app.use(cors({
    origin:"https://planora-frontend-site.onrender.com",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api",authRouter)
app.use("/api",workSpaceRouter)
app.use("/api",taskRouter)

app.listen(port,()=>{
    connectDB()
    console.log(`server is started at ${port}`)
})
