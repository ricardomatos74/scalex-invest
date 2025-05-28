import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function dashboard(_req: Request, res: Response) {
  const users = await prisma.user.count();
  const projects = await prisma.project.count();
  const proposals = await prisma.proposal.count();
  return res.json({ users, projects, proposals });
}

export async function analytics(_req: Request, res: Response) {
  const totalCompanies = await prisma.user.count({ where: { role: 'empresa' } });
  const totalInvestors = await prisma.user.count({ where: { role: 'investidor' } });
  const totalPosts = await prisma.post.count();

  const proposalsPending = await prisma.proposal.count({ where: { status: 'pendente' } });
  const proposalsAccepted = await prisma.proposal.count({ where: { status: 'aceita' } });
  const proposalsRejected = await prisma.proposal.count({ where: { status: 'recusada' } });

  const totalInvestedAgg = await prisma.proposal.aggregate({
    where: { status: 'aceita' },
    _sum: { amount: true },
  });
  const totalInvested = totalInvestedAgg._sum.amount || 0;
  const totalCommission = totalInvested * 0.05;

  return res.json({
    totalCompanies,
    totalInvestors,
    totalPosts,
    proposals: {
      pending: proposalsPending,
      accepted: proposalsAccepted,
      rejected: proposalsRejected,
    },
    negotiations: proposalsAccepted,
    totalInvested,
    totalCommission,
  });
}

export async function listAllProposals(_req: Request, res: Response) {
  const proposals = await prisma.proposal.findMany({
    include: { investor: true, project: true },
  });
  return res.json(proposals);
}

export async function listNegotiations(_req: Request, res: Response) {
  const negotiations = await prisma.proposal.findMany({
    where: { status: 'aceita' },
    include: { investor: true, project: true },
  });
  return res.json(negotiations);
}

export async function listPosts(_req: Request, res: Response) {
  const posts = await prisma.post.findMany({ include: { author: true } });
  return res.json(posts);
}
