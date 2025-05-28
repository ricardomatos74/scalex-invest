import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function updateNegotiation(req: Request, res: Response) {
  const proposalId = Number(req.params.id);
  const { status } = req.body as { status?: string };
  if (!status) return res.status(400).json({ error: 'Status obrigatório' });
  try {
    const proposal = await prisma.proposal.update({ where: { id: proposalId }, data: { status } });
    return res.json(proposal);
  } catch {
    return res.status(400).json({ error: 'Erro ao atualizar negociação' });
  }
}
