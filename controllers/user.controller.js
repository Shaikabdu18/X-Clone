import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register=async(req,res,next)=>{
    try {
        const {username,email,password} =req.body
        const user = new User({
            username,email:email.toLowerCase(),password
        })
        console.log();
        await user.save()
        return res.status(201).json({msg:"User Stored Successfully"})
    } catch (error) {
        next(error)
    }
}

export const login=async(req,res,next)=>{
    try {
        const{email,password}=req.body
        
        const user = await User.findOne({email:email.toLowerCase()})
        if(!user) return res.status(400).json({msg:"User Not found"})
        
        const isMatch = await bcrypt.compare(password,user.password)
        
        if (!isMatch) return res.status(400).json({msg:"Invalid Credentials"})
        
        const token = jwt.sign({id:user._id},process.env.jwt,{expiresIn:"5d"})
        return res.status(200).json({token})
    } catch (error) {
        next()
    }
}
