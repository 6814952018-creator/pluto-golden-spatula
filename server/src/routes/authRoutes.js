import { Router } from 'express';
import { currentUser, loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', requireAuth, logoutUser);
router.get('/me', requireAuth, currentUser);
export default router;
