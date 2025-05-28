import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface AuthRequest extends Request {
  user?: { id: number; role: Role };
}

export function generateToken(payload: { id: number; role: Role }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: Role };
    req.user = { id: decoded.id, role: decoded.role };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export function roleMiddleware(roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
  };
}
