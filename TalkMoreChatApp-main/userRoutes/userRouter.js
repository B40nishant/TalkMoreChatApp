import express from 'express'; 
import { userlogin, userRegister,allUsers } from '../controllers/auth.js';
import authmiddle from '../middlewear/authmiddle.js';
const router = express.Router();


router.route('/login').post(userlogin);
router.route('/register').post(userRegister);
router.route('/alluser').get(authmiddle,allUsers);

export default router; 
