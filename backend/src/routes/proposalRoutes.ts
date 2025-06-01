import { Router } from 'express';
import {
  listUserProposals,
  createProposalForPost,
  listPostProposals,
  acceptProposal,
  rejectProposal,
} from '../controllers/proposalController';
import { verifyToken } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

router.use(verifyToken);

router.post('/propostas', requireRole(['investidor']), createProposalForPost);
router.get('/posts/:id/propostas', requireRole(['empresa']), listPostProposals);
router.patch('/propostas/:id/aceitar', requireRole(['empresa']), acceptProposal);
router.patch('/propostas/:id/recusar', requireRole(['empresa']), rejectProposal);
router.get('/users/:id/proposals', requireRole(['investidor']), listUserProposals);

export default router;
