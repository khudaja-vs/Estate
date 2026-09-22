import express from 'express';
import { updateUser, deleteUser, signOut } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getUserListings } from '../controller/user.controller.js';
import { getUser } from '../controller/user.controller.js';

export const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/signout', signOut);
router.get('/listings', verifyToken, getUserListings);
router.get('/:id', getUser);

export default router;
