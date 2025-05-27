import { Router } from 'express';
import { dashboard } from '../controllers/adminController';
import { authMiddleware } from '../middleware/auth';
import prisma from '../prisma/client';

const router = Router();

router.use(authMiddleware);
router.get('/dashboard', dashboard);
router.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
