import { Router } from 'express';
import {
  dashboard,
  analytics,
  listAllProposals,
  listNegotiations,
  listPosts,
} from '../controllers/adminController';
import { authMiddleware } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import prisma from '../prisma/client';

const router = Router();

router.use(authMiddleware);
router.use(adminOnly);
router.get('/dashboard', dashboard);
router.get('/analytics', analytics);
router.get('/proposals', listAllProposals);
router.get('/negotiations', listNegotiations);
router.get('/posts', listPosts);
router.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
