import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup= async(req,res)=>{
    try {
        let {name,email,password}= req.body

        if (!name || !email || !password) {
            return res.status(401).json({message:"Fill all the details"})
        }

        if (password.length < 8) {
            return res.status(401).json({message:"Password is too short (atleast 8 letters)"})
        }

        let existUser= await User.findOne({email})

        if(existUser){
            return res.status(401).json({message:"User already exist"})
        }

        const hashpass= await bcrypt.hash(password,10)

        let user= await User.create({
            name,
            email,
            password:hashpass
        })

        return res.status(201).json({message:`user created successfully, Now Login!`})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"signup controller error"})
    }
}

export const login= async(req,res)=>{
    try {
        let {email,password}= req.body

        if (!email || !password) {
            return res.status(401).json({message:"Fill all the datails"})
        }

        let existUser= await User.findOne({email})

        if(!existUser){
            return res.status(401).json({message:"User not exist signup first!"})
        }

        let matchPass= await bcrypt.compare(password,existUser.password)

        if (!matchPass) {
            return res.status(401).json({message:"Password does not matched"})
        }

        let token= generateToken(existUser._id)
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"None",
            secure:true,
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({message:`user login successfully`})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Login controller error"})
    }
}

export const logout= async(req,res)=>{
    try {
        res.clearCookie("token",token,{
            httpOnly:true,
            sameSite:"None",
            secure:true,
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json({message:"Logout successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Logout controller error"})
    }
}

export const getme= async(req,res)=>{
    try {
        let userId= req.userId

        if(!userId){
            return res.status(401).json({message:"User is not authenticated"})
        }

        let user= await User.findById(userId)

        if(!user){
            return res.status(401).json({message:"USer not found"})
        }

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"getme controller error"})
    }
}
