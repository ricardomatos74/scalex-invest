import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken();
    return res.json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
