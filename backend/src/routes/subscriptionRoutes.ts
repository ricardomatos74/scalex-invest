import { Router } from 'express';
import { createSubscription, listSubscriptions } from '../controllers/subscriptionController';

const router = Router();

router.post('/', createSubscription);
router.get('/', listSubscriptions);

export default router;
