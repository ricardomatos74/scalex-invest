import { Router } from 'express';
import {
  createPost,
  listPosts,
  getPost,
  updatePostStatus,
} from '../controllers/postController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', verifyToken, createPost);
router.get('/', listPosts);
router.get('/:id', getPost);
router.patch('/:id/status', verifyToken, updatePostStatus);

export default router;
