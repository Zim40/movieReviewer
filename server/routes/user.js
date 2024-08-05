import { Router } from 'express';
import userController from '../controllers/user.js';
import Auth from "../utils/Auth.js";
const router = Router();
router.post('/login', userController.login);
router.get('/',Auth.authMiddleware, userController.getMe);
router.post('/create', userController.createUser);

export default router;