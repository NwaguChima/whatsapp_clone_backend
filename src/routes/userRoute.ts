import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/passwordController';
import { signup } from '../controllers/userAuthController';
import {
  getAllFriends,
  addFriends,
  addFavoriteFriends,
  getFavoriteFriends,
  removeFavoriteFriends,
  getFavouriteFriend,
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

// users/friends

router.get('/friends', protect, getAllFriends);
// router.get('/', protect, getAllFriends);

// users/profile/jlsl
router.get('/profile/:userId', protect, otherUserProfile);

router.post('/signup', signup);
router.post('/friends', protect, addFriends);

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

//add favorite friends route
router.get('/friends/:id', protect, getFavouriteFriend);

router.post('/friends/:id', protect, addFavoriteFriends);

//get all favorite friends

router.get('/friend', protect, getFavoriteFriends);

// Remove from favorite friends array from Friends to UserAuth collection by id

router.delete('/friends/:id', protect, removeFavoriteFriends);
export default router;

const wantedCriminals = [
    "rob-debob",
    "jeff-bizos",
    "de-coder",
    "intu-ishun",
];

