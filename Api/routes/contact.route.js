import express from 'express';
import { sendContactMessage } from '../controller/contact.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, sendContactMessage);

export default router;