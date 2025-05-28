import { Router } from 'express';
import { PrismaClient, OfferType } from '@prisma/client';
import { authMiddleware, roleMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /posts - public feed with boost prioritization
router.get('/', async (req, res) => {
  const { boosted } = req.query as { boosted?: string };
  const now = new Date();

  const posts = await prisma.post.findMany({
    include: {
      empresa: true,
      boosts: { where: { ativo: true, fim: { gte: now } } },
    },
  });

  let result = posts;
  if (boosted === 'true') {
    result = posts.filter((p) => p.boosts.length > 0);
  }

  result.sort((a, b) => {
    const aBoost = a.boosts.length > 0;
    const bBoost = b.boosts.length > 0;
    if (aBoost !== bBoost) return aBoost ? -1 : 1;
    const aPremium = a.empresa.premium;
    const bPremium = b.empresa.premium;
    if (aPremium !== bPremium) return aPremium ? -1 : 1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  res.json(result);
});

// POST /posts - create new post (empresa)
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['EMPRESA']),
  async (req: AuthRequest, res) => {
    const { title, description, valor, percentual, offerType } = req.body as {
      title?: string;
      description?: string;
      valor?: number;
      percentual?: number;
      offerType?: OfferType;
    };

    if (!title || !description || !valor || !percentual || !offerType) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    try {
      const post = await prisma.post.create({
        data: {
          title,
          description,
          valor,
          percentual,
          offerType,
          empresaId: req.user!.id,
        },
      });
      return res.status(201).json(post);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

// POST /posts/:id/boost - create boost for post
router.post(
  '/:id/boost',
  authMiddleware,
  roleMiddleware(['EMPRESA']),
  async (req: AuthRequest, res) => {
    const id = Number(req.params.id);
    const now = new Date();
    const fim = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    try {
      const post = await prisma.post.findUnique({ where: { id } });
      if (!post || post.empresaId !== req.user!.id) {
        return res.status(403).json({ error: 'Operação não permitida' });
      }

      const boost = await prisma.boost.create({
        data: {
          postId: id,
          empresaId: req.user!.id,
          inicio: now,
          fim,
          ativo: true,
        },
      });
      return res.status(201).json(boost);
    } catch (error) {
      console.error('Erro ao impulsionar post:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

export default router;
