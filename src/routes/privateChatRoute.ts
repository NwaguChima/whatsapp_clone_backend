import express from 'express';
import { getMediaType } from '../controllers/messageController';
import { privateChat } from '../controllers/privateChatController';
import { protect } from '../controllers/verifyEmail';
import messageRoutes from './messageRoutes';

const router = express.Router();

// routers
router.use('/:chatId/messages', messageRoutes);
router.post('/', protect, privateChat);

// exported router
export default router;
