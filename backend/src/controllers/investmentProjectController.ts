import { Response } from 'express';
import prisma from '../prisma/client';
import { AuthRequest } from '../middleware/auth';

export async function createProject(req: AuthRequest, res: Response) {
  const { title, description, targetValue, quotaCount, category, media } = req.body as {
    title?: string;
    description?: string;
    targetValue?: number;
    quotaCount?: number;
    category?: string;
    media?: string;
  };

  if (req.userType !== 'empresa') {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  if (!title || !description || !targetValue || !quotaCount || !category) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        targetValue: Number(targetValue),
        quotaCount: Number(quotaCount),
        category,
        media,
        userId: req.userId!,
      },
    });
    return res.status(201).json(project);
  } catch {
    return res.status(400).json({ error: 'Erro ao criar projeto' });
  }
}

export async function listProjects(_req: AuthRequest, res: Response) {
  const projects = await prisma.project.findMany();
  return res.json(projects);
}
