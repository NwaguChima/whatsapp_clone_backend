import express from 'express';
import { createMessages, getMessages } from '../controllers/messageController';
import { protect } from '../controllers/verifyEmail';
import { upload } from '../utils/cloud_data/multer-main';
import { getMediaType } from '../controllers/messageController';

const router = express.Router({ mergeParams: true });

// , upload.single('image')
// routers
router.get('/', getMessages);
// router.get('/group/:chatId/messages', getGroupMessages);
router.post('/', upload.single('media'), protect, createMessages);

// exported router
export default router
