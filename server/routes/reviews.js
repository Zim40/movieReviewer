import { Router } from 'express';
import reviewController from '../controllers/reviewController.js';
import AuthMiddleware from "../utils/Auth.js";
const router = Router();

router.post('/movie/review', AuthMiddleware.authMiddleware, reviewController.postReview);
export default router;