import { Router } from 'express';
import { createBoost, listBoosts } from '../controllers/boostController';

const router = Router();

router.post('/', createBoost);
router.get('/', listBoosts);

export default router;
