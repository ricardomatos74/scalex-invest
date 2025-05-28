import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.substring(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      req.user = payload;
      return next();
    } catch {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET);
}
