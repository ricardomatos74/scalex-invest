import { Router } from 'express';
import { createProject, listProjects, getProject, updateProjectStatus } from '../controllers/projectController';
import { createProposal } from '../controllers/proposalController';

const router = Router();

router.post('/', createProject);
router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/:id/proposals', createProposal);
router.patch('/:id/status', updateProjectStatus);

export default router;
