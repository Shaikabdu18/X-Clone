import express from "express"
import authMiddleware from "../middleware/auth.js";
import { followUser,unFollow } from "../controllers/follow.controller.js";

const router = express.Router()


router.post("/follow",authMiddleware,followUser)
router.post("/unfollow/:userId",authMiddleware,unFollow)



export default router
