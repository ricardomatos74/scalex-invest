import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function createProposal(req: Request, res: Response) {
  const projectId = Number(req.params.id);
  const { investorId, amount, percentageRequested } = req.body;
  if (!investorId || !amount) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  try {
    const proposal = await prisma.proposal.create({
      data: {
        projectId,
        investorId: Number(investorId),
        amount: Number(amount),
        percentageRequested: Number(percentageRequested),
        status: 'pendente',
      },
    });
    return res.status(201).json(proposal);
  } catch (err) {
    return res.status(400).json({ error: 'Erro ao criar proposta' });
  }
}

export async function listUserProposals(req: Request, res: Response) {
  const userId = Number(req.params.id);
  const proposals = await prisma.proposal.findMany({ where: { investorId: userId } });
  return res.json(proposals);
}
