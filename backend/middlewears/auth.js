import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const authCheck = async (req, res, next) => {
    try {
        let userId = req.cookies.token

        if(!userId){
            return res.status(401).json({message:"user is not authenticated"})
        }

        let verify = jwt.verify(userId,process.env.JWT_SECRET)
        req.userId = verify.id
        next()
    } catch (error) {
        console.log(error)
    }
}

export default authCheck