import { Request, Response } from 'express';
import prisma from '../prisma/client';

export async function createPost(req: Request, res: Response) {
  const { authorId, title, content } = req.body as {
    authorId?: number;
    title?: string;
    content?: string;
  };
  if (!authorId || !title) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  try {
    const post = await prisma.post.create({
      data: {
        authorId: Number(authorId),
        title,
        content,
      },
    });
    return res.status(201).json(post);
  } catch {
    return res.status(400).json({ error: 'Erro ao criar post' });
  }
}

export async function listPosts(_req: Request, res: Response) {
  const posts = await prisma.post.findMany();
  return res.json(posts);
}

export async function getPost(req: Request, res: Response) {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ error: 'Post não encontrado' });
  return res.json(post);
}
