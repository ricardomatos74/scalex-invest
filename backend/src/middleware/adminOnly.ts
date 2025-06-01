import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.userType !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}
