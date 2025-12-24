import Task from "../models/task.model.js"

export const createTask = async (req, res) => {
    try {
        let { task, workspaceId } = req.body

        if (!task) {
            return res.status(401).json({ messsage: "No task left" })
        }

        let todo = await Task.create({
            task,
            workspaceId,
            owner: req.userId
        })

        return res.status(201).json(todo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ messsage: "createTask controller error" })
    }
}

export const getTask = async (req, res) => {
    try {
        let userId = req.userId
        let { workspaceId } = req.params

        if (!userId) {
            return res.status(401).json({ messsage: "User is not authenticated" })
        }

        if (!workspaceId) {
            return res.status(401).json({ message: "workspaceId required" });
        }

        let getToDo = await Task.find({
            owner: userId,
            workspaceId
        }).sort({createdAt:-1})
        

        return res.status(200).json(getToDo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ messsage: "getTask controller error" })
    }
}

export const toogleTask=async(req,res)=>{
    try {
        let {id}= req.params

        let currentTask= await Task.findById(id)

        let task= await Task.findByIdAndUpdate(id,{completed: !currentTask.completed},{new:true})
        return res.status(200).json(task)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"toogle task controller error"})
    }
}

export const deleteTask= async(req,res)=>{
    try {
        let {id}= req.params

        let deletedTask=await Task.findByIdAndDelete(id)
        return res.status(200).json({message:"Task deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"deletetask controller error"})
    }
}