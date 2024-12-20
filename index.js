import express from "express"
import connectDB from "./config/DB.js"
import dotenv from "dotenv"
import morgan from "morgan"
import helmet from "helmet"
import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import follow from "./routes/follow.routes.js"



const app = express()
dotenv.config()

// MiddleWare
app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())


// Routes
app.use("/api/auth",authRoutes)
app.use("/api",postRoutes)
app.use("/api",follow)

app.use(errorHandler)





const Port = process.env.Port||6666

app.listen(Port,()=>{
    connectDB()
    console.log(`Server is running on ${Port}`);
    
    
})