import { Router } from 'express';
import { createSubscription, listSubscriptions } from '../controllers/subscriptionController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', verifyToken, createSubscription);
router.get('/', listSubscriptions);

export default router;
