import express, { Router } from "express"
import { getme, login, logout, signup } from "../controllers/auth.contollers.js"
import authCheck from "../middlewears/auth.js"

const authRouter= express(Router())

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.get("/getme",authCheck,getme)

export default authRouter