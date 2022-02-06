import express from 'express';
import { protect } from '../controllers/verifyEmail';
import { getFriend } from '../controllers/get_friend_controller';
import { getFavouriteFriends } from '../controllers/get_favourite_controller';
const router = express.Router();

router.route('/getFavoriteFriends').get(protect, getFavouriteFriends);
router.route('/').get(protect, getFriend);

export default router;
