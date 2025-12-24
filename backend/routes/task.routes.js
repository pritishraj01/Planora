import express, { Router } from "express"
import { createTask, deleteTask, getTask, toogleTask } from "../controllers/task.controllers.js"
import authCheck from "../middlewears/auth.js"

const taskRouter= express(Router())

taskRouter.post("/createtask",authCheck,createTask)
taskRouter.get("/gettask/:workspaceId",authCheck,getTask)
taskRouter.put("/toogleTask/:id",authCheck,toogleTask)
taskRouter.delete("/deleteTask/:id",authCheck,deleteTask)

export default taskRouter