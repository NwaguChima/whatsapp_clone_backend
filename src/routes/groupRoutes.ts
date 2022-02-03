import express from 'express';
import app from '../app';
import messageRoutes from './messageRoutes'
import { Message } from '../models/MessageModel';


const router = express.Router();

// router
// get route
router.use('/:chatId/messages', messageRoutes);
// delete route
router.use('/:chatId/messages/:messageId', messageRoutes)
// exported router
export default router;
