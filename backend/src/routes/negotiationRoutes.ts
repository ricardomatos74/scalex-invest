import { Router } from 'express';
import { updateNegotiation } from '../controllers/negotiationController';

const router = Router();

router.patch('/:id', updateNegotiation);

export default router;
