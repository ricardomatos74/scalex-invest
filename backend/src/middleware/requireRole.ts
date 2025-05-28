import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export function requireRole(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && roles.includes(user.role)) {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
  };
}
