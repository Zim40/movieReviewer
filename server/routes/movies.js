import { Router } from 'express';
import movieController from '../controllers/movieController.js';
const router = Router();

router.get('/movies', movieController.fetchMovies);

export default router;