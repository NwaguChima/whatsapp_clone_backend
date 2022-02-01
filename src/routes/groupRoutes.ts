import express from 'express';
import app from '../app';
import { getGroupInfo } from '../controllers/userAuthController'
import { protect } from '../controllers/verifyEmail'; 


const router = express.Router();

// router


// get route
router.route("/").get();


// posts route
router.route("/").post();

//get group imfo

router.get('/:groupId',protect, getGroupInfo)







// exported router
export default router;
