import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body as {
    email?: string;
    password?: string;
    role?: Role;
  };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, role: role || 'INVESTIDOR' },
    });
    return res.status(201).json({ id: user.id });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken({ id: user.id, role: user.role });
    return res.json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /auth/forgot-password (mock)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }
  // Mock response
  return res.json({ message: 'E-mail de recuperação enviado' });
});

export default router;
