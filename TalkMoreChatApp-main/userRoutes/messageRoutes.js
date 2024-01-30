
import express from 'express'; 
import authmiddle from '../middlewear/authmiddle.js';
const router = express.Router();
import {allMessages , sendMessage} from '../controllers/messageControllers.js';

router.route("/:chatId").get(authmiddle, allMessages);
router.route("/").post(authmiddle, sendMessage);

export default router; 