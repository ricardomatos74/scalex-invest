import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Todas as rotas de admin são protegidas
router.use(authMiddleware);

/**
 * GET /admin/users
 * Lista todos os usuários
 */
router.get('/users', async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
