import { Router } from 'express';
import userController from '../controllers/user.js';
const router = Router();
router.post('/login', userController.login);
router.get('/', userController.getMe);
router.post('/create', userController.createUser);

export default router;