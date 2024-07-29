import express from 'express';
import { getAllmessages, sendMessage } from '../controllers/messageController.js';
import { isAdminAuth, ispatientAuth  } from '../middlewares/auth.js'

const router = express.Router();

router.post('/send', sendMessage)
router.get('/allMessages', isAdminAuth , getAllmessages)

export default router;

