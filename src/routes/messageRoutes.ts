import express from 'express';
import {
  getGroupMessages,
  getMessages,
} from '../controllers/messageController';

const router = express.Router();

// routers
router.get('/:chatId', getMessages);
router.get('/group/:chatId', getGroupMessages);

// exported router
export default router;
