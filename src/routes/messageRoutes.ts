import express from 'express';
import {
  getGroupMessages,
  getMessages,
} from '../controllers/messageController';

const router = express.Router();

// routers
router.get('/:chatId/messages', getMessages);
router.get('/group/:chatId/messages', getGroupMessages);

// exported router
export default router;
