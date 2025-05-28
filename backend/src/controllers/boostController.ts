import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function createBoost(req: Request, res: Response) {
  const { companyId, message } = req.body as { companyId?: number; message?: string };
  if (!companyId || !message) return res.status(400).json({ error: 'Dados inválidos' });
  try {
    const boost = await prisma.boost.create({
      data: {
        companyId: Number(companyId),
        message,
      },
    });
    return res.status(201).json(boost);
  } catch {
    return res.status(400).json({ error: 'Erro ao criar boost' });
  }
}

export async function listBoosts(_req: Request, res: Response) {
  const boosts = await prisma.boost.findMany();
  return res.json(boosts);
}
