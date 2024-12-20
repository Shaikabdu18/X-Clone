import { register,login,profile} from "../controllers/user.controller.js";
import express from "express"
import authMiddleware from "../middleware/auth.js";
import upload from "../services/multer.Service.js";

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/profile",authMiddleware,upload.single("dp"),profile)





export default router
