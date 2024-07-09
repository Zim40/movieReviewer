import { Router } from 'express';
import  userRoutes  from './user.js';
import movieRoutes from './movies.js';

const router = Router();

router.use('/', movieRoutes);
router.use('/users', userRoutes);

export default router;