import express from 'express';
import {
  // getGroupMessages,
  getMessages,
} from '../controllers/messageController';

const router = express.Router({ mergeParams: true });

// routers
router.get('/', getMessages);
// router.get('/group/:chatId/messages', getGroupMessages);

// exported router
export default router;
