import express from 'express';
import app from '../app';
import { getGroup, createGroup } from '../controllers/get_groups.controller';
import { protect } from '../controllers/verifyEmail';
const upload = require('../multer');

const router = express.Router();

// router

// get route
router.route('/').get();

router.route('/').get(protect, getGroup);

// posts route
router.route('/').post(protect, upload.single('groupImage'), createGroup);

// exported router
export default router;
