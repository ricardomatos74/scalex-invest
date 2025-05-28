import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function createProject(req: Request, res: Response) {
  const { companyId, title, description, totalAmount, percentageOffered, maxInvestors, deadline } = req.body;
  if (!companyId || !title) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  try {
    const project = await prisma.project.create({
      data: {
        companyId: Number(companyId),
        title,
        description,
        totalAmount: Number(totalAmount),
        percentageOffered: Number(percentageOffered),
        maxInvestors: Number(maxInvestors),
        deadline: new Date(deadline),
        status: 'ativo',
      },
    });
    return res.status(201).json(project);
  } catch (err) {
    return res.status(400).json({ error: 'Erro ao criar projeto' });
  }
}

export async function listProjects(_req: Request, res: Response) {
  const projects = await prisma.project.findMany();
  return res.json(projects);
}

export async function getProject(req: Request, res: Response) {
  const id = Number(req.params.id);
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });
  return res.json(project);
}

export async function updateProjectStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body as { status?: string };
  if (!status) return res.status(400).json({ error: 'Status obrigatório' });
  try {
    const project = await prisma.project.update({ where: { id }, data: { status } });
    return res.json(project);
  } catch {
    return res.status(400).json({ error: 'Erro ao atualizar status' });
  }
}
