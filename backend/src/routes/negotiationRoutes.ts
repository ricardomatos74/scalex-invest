import { Router } from 'express';
import { updateNegotiation } from '../controllers/negotiationController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.patch('/:id', verifyToken, updateNegotiation);

export default router;
