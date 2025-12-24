import express, { Router } from "express"
import { createWorkspace, deleteWorkspace, getAllWorkspace } from "../controllers/workspace.controllers.js"
import authCheck from "../middlewears/auth.js"

const workSpaceRouter= express(Router())

workSpaceRouter.post("/createworkspace",authCheck,createWorkspace)
workSpaceRouter.get("/getworkspace",authCheck,getAllWorkspace)
workSpaceRouter.delete("/deleteWorkspace/:id",authCheck,deleteWorkspace)

export default workSpaceRouter