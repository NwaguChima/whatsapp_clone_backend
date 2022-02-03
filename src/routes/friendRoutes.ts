import express from "express"
import { protect } from "../controllers/verifyEmail"
import { getFriend } from "../controllers/get_friend_controller"
const router = express.Router();

router.route("/").get(protect,getFriend);

export default router;