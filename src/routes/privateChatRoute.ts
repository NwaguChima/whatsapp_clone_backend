import express from 'express';
import messageRoutes from './messageRoutes'

const router = express.Router();

// routers
router.use('/:chatId/messages/:messageId', messageRoutes)

// exported router
export default router;
