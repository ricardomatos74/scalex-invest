import { Router } from 'express';
import { createBoost, listBoosts } from '../controllers/boostController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', verifyToken, createBoost);
router.get('/', listBoosts);

export default router;
