import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/passwordController';
import { signup } from '../controllers/userAuthController';
import { getAllFriends, addFriends, addFavoriteFriends, getFavoriteFriends, removeFavoriteFriends } from '../controllers/userFriendController';
import { updateUser, getUser } from '../controllers/updateUserController';
import { protect } from '../controllers/verifyEmail';

const upload = require('../multer');
const router = express.Router();
//reset

router.get('/friends', protect, getAllFriends);


router.post('/signup', signup);
router.post('/friends', protect, addFriends);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:hashedToken', resetPassword);


router.patch('/changePassword', protect, changePassword);
router.get('/', protect, getUser);
router.patch('/updateUser', protect, upload.single('avatar'), updateUser);


//add favorite friends route

router.post("/friends/:id", protect, addFavoriteFriends);

//get all favorite friends

router.get("/friend", protect, getFavoriteFriends);


// Remove from favorite friends array from Friends to UserAuth collection by id

router.delete('/friends/:id', protect, removeFavoriteFriends);
export default router;
