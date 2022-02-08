import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/passwordController';
import { signup } from '../controllers/userAuthController';
import {
  getAllFriends,
  addFriend,
  getFriend,
  addFavoriteFriend,
  getFavoriteFriends,
  removeFavoriteFriend,
  getFavoriteFriend,
} from '../controllers/userFriendController';
import {
  updateUserProfilePicture,
  updateUser,
  getUser,
} from '../controllers/updateUserController';
import { protect } from '../controllers/verifyEmail';
import { otherUserProfile } from '../controllers/userAuthController';

const upload = require('../multer');
const router = express.Router();
//reset

// users/profile/jlsl
router.get('/profile/:userId', protect, otherUserProfile);

router.post('/signup', signup);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);

router.patch('/changePassword', protect, changePassword);
router.patch(
  '/updateUserProfilePicture',
  protect,
  upload.single('avatar'),
  updateUserProfilePicture
);
router.get('/', protect, getUser);
router.patch('/updateUser', protect, updateUser);

// users/friends

router
  .route('/user/friends')
  .get(protect, getAllFriends)
  .post(protect, addFriend);
router.route('/user/friends/:id').get(protect, getFriend);

router.route('/user/friends/favorite').get(protect, getFavoriteFriends);

router
  .route('/user/friends/favorite/:id')
  .post(protect, addFavoriteFriend)
  .get(protect, getFavoriteFriend)
  .delete(protect, removeFavoriteFriend);
// Remove from favorite friends array from Friends to UserAuth collection by id

export default router;
