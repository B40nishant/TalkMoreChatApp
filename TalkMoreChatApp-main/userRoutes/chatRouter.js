import express from 'express'; 
import authmiddle from '../middlewear/authmiddle.js';
import { accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup } from '../controllers/chatcontroller.js';
const router = express.Router();
 


router.route("/").post(authmiddle, accessChat);
router.route("/").get(authmiddle, fetchChats);
router.route("/group").post(authmiddle, createGroupChat);
router.route("/rename").put(authmiddle, renameGroup);
router.route("/groupremove").put(authmiddle, removeFromGroup);
router.route("/groupadd").put(authmiddle, addToGroup);




export default router; 
