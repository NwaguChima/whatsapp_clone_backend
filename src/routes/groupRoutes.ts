import express from 'express';
import app from '../app';
import { createGroup, getAllGroups, addOthers } from '../controllers/groupController';
import { protect } from '../controllers/verifyEmail'
import messageRoutes from './messageRoutes'
import { Message } from '../models/MessageModel';


const router = express.Router();

// router
// get route
// router.route("/").get();
router.get("/user",protect, getAllGroups)


// posts route
router.post("/create",protect, createGroup);
router.post("/:groupId",protect, addOthers)







router.use('/:chatId/messages', messageRoutes);
// delete route
router.use('/:chatId/messages/:messageId', messageRoutes)
// exported router
export default router;
