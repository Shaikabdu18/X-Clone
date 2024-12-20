import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const  authMiddleware = async(req,res,next)=>{
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) return res.status(401).json({msg:"Access Denied No token provided"})
        
        const decoded = jwt.verify(token,process.env.jwt)
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found.' });

        req.user = user; 
        
        
        next();
    } catch (error) {
        next()
    }
}

export default authMiddleware