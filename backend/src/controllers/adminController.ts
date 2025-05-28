import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function dashboard(_req: Request, res: Response) {
  const users = await prisma.user.count();
  const projects = await prisma.project.count();
  const proposals = await prisma.proposal.count();
  return res.json({ users, projects, proposals });
}
