import express from 'express';
import app from '../app';
import { Message } from '../models/MessageModel';
import messageRoutes from './messageRoutes';

const router = express.Router();

// router

// get route
router.use('/:chatId/messages', messageRoutes);

// exported router
export default router;
