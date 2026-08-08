import express from 'express';
import { updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Update user route (JWT token verification ke sath)
router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);

export default router;