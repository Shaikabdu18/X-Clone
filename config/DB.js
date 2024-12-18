import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/X-clone")
        console.log("MongoDB connected Successfully");
        
    } catch (error) {
        console.log("Mongo Connection Error",error.message)
    }
}

export default connectDB