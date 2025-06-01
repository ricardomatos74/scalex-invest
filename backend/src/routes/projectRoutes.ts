import { Router } from 'express';
import { createProject, listProjects } from '../controllers/investmentProjectController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', verifyToken, createProject);
router.get('/', verifyToken, listProjects);

export default router;
