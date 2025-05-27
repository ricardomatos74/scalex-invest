import { Request, Response } from 'express';
import { register } from './authController';

export async function createUser(req: Request, res: Response) {
  // reuse register logic
  return register(req, res);
}
