import Work from "../models/workspace.schema.js"


export const createWorkspace= async(req,res)=>{
    try {
        let {title}= req.body

        if(!title){
            return res.status(401).json({message:"Give title to your workspace"})
        }

        let folder= await Work.create({
            title,
            owner:req.userId
        })

        return res.status(201).json({message:`folder created: ${folder}`})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"create workspace error"})
    }
}

export const getAllWorkspace= async(req,res)=>{
    try {

        let userId= req.userId

        if(!userId){
            return res.status(401).json({message:"User is not authenticated"})
        }

        let workspace= await Work.find({
            owner:userId
        })

        if(!workspace){
            return res.status(401).json({message:"No workspace created by the user"})
        }

        return res.status(200).json(workspace)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"getallworkspace error"})
    }
}

export const deleteWorkspace= async(req,res)=>{
    try {
        let {id}= req.params

        let deletedWork= await Work.findByIdAndDelete(id)
        return res.status(200).json({message:"workspace deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"delete workspace error"})
    }
}