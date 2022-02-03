import express from 'express';
import app from '../app';
import messageRoutes from './messageRoutes';

const router = express.Router();

// router
router.use('/:chatId/messages', messageRoutes);

// exported router
export default router;
