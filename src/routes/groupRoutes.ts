import express from 'express';
import app from '../app';
import { createGroup, getAllGroups, addOthers } from '../controllers/groupController';
import { protect } from '../controllers/verifyEmail'

const router = express.Router();

// router


// get route
// router.route("/").get();
router.get("/user",protect, getAllGroups)


// posts route
router.post("/create",protect, createGroup);
router.post("/:groupId",protect, addOthers)







// exported router
export default router;
