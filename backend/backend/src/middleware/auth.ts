import { Request, Response, NextFunction } from 'express';

const TOKEN = 'scalex-token';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (auth && auth === `Bearer ${TOKEN}`) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

export function generateToken() {
  return TOKEN;
}
