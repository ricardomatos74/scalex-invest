import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    // constrói explicitamente o objeto para evitar campos extras
    const data = {
      name,
      email,
      passwordHash,
      role: (role || 'INVESTIDOR').toUpperCase(),
    };

    const user = await prisma.user.create({ data });

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.error('ERRO REAL:', err);
    return res.status(400).json({ error: 'Falha ao registrar usuário' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Credenciais inválidas' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}

export async function forgotPassword(_req: Request, res: Response) {
  return res.json({ message: 'ok' });
}
