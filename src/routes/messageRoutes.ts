import express from 'express';
import { deleteMessage} from '../controllers/messageController';
import { protect } from '../controllers/verifyEmail';

const router = express.Router({ mergeParams: true});

// routers
// delete route
router.delete('/', protect, deleteMessage)

// exported router
export default router;
