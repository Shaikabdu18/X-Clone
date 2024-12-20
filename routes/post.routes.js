import express from "express"
import authMiddleware from "../middleware/auth.js"
import { createPost,getPost } from "../controllers/post.controller.js"
import upload from "../services/multer.Service.js"
import multer from "multer"


const router = express.Router()

router.post("/createPost",authMiddleware,upload.array("media",10),createPost)
router.get("/getPost",authMiddleware,getPost)


export default router