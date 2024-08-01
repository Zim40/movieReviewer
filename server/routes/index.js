import { Router } from 'express';
import  userRoutes  from './user.js';
import movieRoutes from './movies.js';
import AuthMiddleWare from "../utils/Auth.js";

const router = Router();

router.use('/', movieRoutes);
router.use('/users', userRoutes);

export default router;