import express from 'express';
import app from '../app';
import { getAllGroups } from '../controllers/get_groups.controller';
import { protect } from '../controllers/verifyEmail';

const router = express.Router();

// router

// get route
// router.route('/').get();

router.route('/').get(protect,getAllGroups);
// posts route
router.route('/').post();

// exported router
export default router;
