import { Router } from 'express';
import movieController from '../controllers/movieController.js';
import AuthMiddleware from "../utils/Auth.js";
const router = Router();

router.get('/movies', movieController.fetchMovies);
router.get('/search/movie', movieController.fetchSingleMovie)
router.post('/favourite/movie', AuthMiddleware.authMiddleware, movieController.favouriteMovie)

export default router;