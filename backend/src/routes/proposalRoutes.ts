import { Router } from 'express';
import { listUserProposals } from '../controllers/proposalController';

const router = Router();

router.get('/users/:id/proposals', listUserProposals);

export default router;
