import express from 'express';
import app from '../app';
import { createGroup } from '../controllers/groupController';

const router = express.Router();

// router


// get route
// router.route("/").get();


// posts route
router.post("/create", createGroup);







// exported router
export default router;
