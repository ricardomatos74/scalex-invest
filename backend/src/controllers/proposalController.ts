import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';

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

export async function createProposalForPost(req: AuthRequest, res: Response) {
  const { postId, amount, percentageRequested } = req.body as {
    postId?: number;
    amount?: number;
    percentageRequested?: number;
  };
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });
  const investorId = req.userId;
  if (!postId || !amount) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  try {
    const proposal = await prisma.proposal.create({
      data: {
        projectId: Number(postId),
        investorId,
        amount: Number(amount),
        percentageRequested: Number(percentageRequested),
        status: 'pendente',
      },
    });
    return res.status(201).json(proposal);
  } catch {
    return res.status(400).json({ error: 'Erro ao criar proposta' });
  }
}

export async function listPostProposals(req: Request, res: Response) {
  const postId = Number(req.params.id);
  const proposals = await prisma.proposal.findMany({
    where: { projectId: postId },
    include: { investor: true },
  });
  return res.json(proposals);
}

export async function acceptProposal(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const proposal = await prisma.proposal.update({
      where: { id },
      data: { status: 'aceita' },
    });
    return res.json(proposal);
  } catch {
    return res.status(400).json({ error: 'Erro ao aceitar proposta' });
  }
}

export async function rejectProposal(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const proposal = await prisma.proposal.update({
      where: { id },
      data: { status: 'recusada' },
    });
    return res.json(proposal);
  } catch {
    return res.status(400).json({ error: 'Erro ao recusar proposta' });
  }
}
