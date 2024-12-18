import express from "express"
import authMiddleware from "../middleware/auth.js"
import { createPost } from "../controllers/post.controller.js"
import upload from "../services/multer.Service.js"
import multer from "multer"

const router = express.Router()

router.post("/createPost",authMiddleware,upload.array("media",10),createPost)

export default router