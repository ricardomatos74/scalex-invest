import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function createSubscription(req: Request, res: Response) {
  const { userId, end } = req.body as { userId?: number; end?: Date };
  if (!userId) return res.status(400).json({ error: 'Dados inválidos' });
  try {
    const subscription = await prisma.subscription.create({
      data: {
        userId: Number(userId),
        end: end ? new Date(end) : null,
      },
    });
    await prisma.user.update({ where: { id: Number(userId) }, data: { premium: true } });
    return res.status(201).json(subscription);
  } catch {
    return res.status(400).json({ error: 'Erro ao criar assinatura' });
  }
}

export async function listSubscriptions(_req: Request, res: Response) {
  const subs = await prisma.subscription.findMany();
  return res.json(subs);
}
