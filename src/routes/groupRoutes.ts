import express from 'express';
import app from '../app';
import { createGroup, getAllGroups } from '../controllers/groupController';

const router = express.Router();

// router


// get route
// router.route("/").get();
router.get("/user", getAllGroups)


// posts route
router.post("/create", createGroup);







// exported router
export default router;
