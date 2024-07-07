import { Router } from 'express';
import userController from '../controllers/user.js';
const router = Router();


router.post('/create', userController.createUser);

export default router;