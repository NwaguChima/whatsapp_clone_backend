import express from 'express';
import app from '../app';
import { getAllGroups, getGroup } from '../controllers/get_groups.controller';
import { protect } from '../controllers/verifyEmail';

const router = express.Router();

// router

// get route
router.route('/').get();

router.route('/').get(protect, getAllGroups);
router.route('/:id').get(protect, getGroup);
// posts route
router.route('/').post();

// exported router
export default router;
