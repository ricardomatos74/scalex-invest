import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export function requireRole(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const type = req.userType;
    if (type && roles.includes(type)) {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
  };
}
