import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface AuthRequest extends Request {
  userId?: number;
  userType?: string;
}

export function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.substring(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      req.userId = payload.userId;
      req.userType = payload.type || payload.role;
      return next();
    } catch {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

export const authMiddleware = verifyToken;

export function generateToken(user: { id: number; role: string }) {
  return jwt.sign(
    { userId: user.id, type: user.role.toLowerCase() },
    JWT_SECRET
  );
}
