import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function createPost(req: Request, res: Response) {
  const {
    companyId,
    title,
    description,
    totalAmount,
    percentageOffered,
    maxInvestors,
    deadline,
  } = req.body;
  if (!companyId || !title) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  try {
    const post = await prisma.project.create({
      data: {
        companyId: Number(companyId),
        title,
        description,
        totalAmount: Number(totalAmount),
        percentageOffered: Number(percentageOffered),
        maxInvestors: Number(maxInvestors),
        deadline: deadline ? new Date(deadline) : new Date(),
        status: 'ativo',
      },
    });
    return res.status(201).json(post);
  } catch {
    return res.status(400).json({ error: 'Erro ao criar post' });
  }
}

export async function listPosts(_req: Request, res: Response) {
  const posts = await prisma.project.findMany();
  return res.json(posts);
}

export async function getPost(req: Request, res: Response) {
  const id = Number(req.params.id);
  const post = await prisma.project.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ error: 'Post não encontrado' });
  return res.json(post);
}

export async function updatePostStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body as { status?: string };
  if (!status) return res.status(400).json({ error: 'Status obrigatório' });
  try {
    const post = await prisma.project.update({ where: { id }, data: { status } });
    return res.json(post);
  } catch {
    return res.status(400).json({ error: 'Erro ao atualizar status' });
  }
}
