import express from 'express';
import messageRoutes from './messageRoutes'
import { getMediaType } from '../controllers/messageController';
import { privateChat } from '../controllers/privateChatController';
import { protect } from '../controllers/verifyEmail';


const router = express.Router();

// routers
router.use('/:chatId/messages/:messageId', messageRoutes)
router.use('/:chatId/messages', messageRoutes);
router.post('/', protect, privateChat);

// exported router
export default router;
