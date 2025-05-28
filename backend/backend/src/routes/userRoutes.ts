import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { email, password, role } = req.body as {
    email?: string;
    password?: string;
    role?: Role;
  };
  if (!email || !password) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, role: role || 'INVESTIDOR' },
  });
  res.status(201).json({ id: user.id });
});

export default router;
