import express from 'express';
import { createMessages } from '../controllers/messageController';
import { protect } from '../controllers/verifyEmail';
import { upload } from '../utils/cloud_data/multer-main';
import { getMediaType } from '../controllers/messageController';

const router = express.Router({ mergeParams: true });

// , upload.single('image')
// routers
router.post('/', upload.single('media'), protect, createMessages);

// exported router
export default router;
