import { Router } from 'express';
import movieController from '../controllers/movieController.js';
const router = Router();

router.get('/movies', movieController.fetchMovies);
router.get('/search/movie', movieController.fetchSingleMovie)

export default router;