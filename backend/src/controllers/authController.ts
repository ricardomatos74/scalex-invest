import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client';
import { generateToken } from '../middleware/auth';


export async function register(req: Request, res: Response) {
  // Extrai apenas os campos necessários do corpo da requisição. Isso evita que
  // propriedades inesperadas sejam repassadas para o ORM.
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
    // Gera o hash da senha original e monta manualmente o objeto que será
    // enviado ao Prisma. Assim garantimos que apenas os campos permitidos serão
    // utilizados na criação do usuário.
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      // O hash da senha é armazenado em passwordHash; nunca repassamos o campo
      // password em si para o Prisma.
      passwordHash,
      // Se role não vier definida, assumimos INVESTIDOR como padrão e
      // normalizamos para maiúsculas.
      role: ((role ?? 'INVESTIDOR').toUpperCase() as 'EMPRESA' | 'INVESTIDOR' | 'ADMIN'),
    };

    // Chama o Prisma passando apenas o objeto sanitizado.
    const user = await prisma.user.create({ data: userData });

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

    const token = generateToken({ id: user.id, role: user.role });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}

export async function forgotPassword(_req: Request, res: Response) {
  return res.json({ message: 'ok' });
}
