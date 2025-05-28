import { Router } from 'express';
import {
  createPost,
  listPosts,
  getPost,
  updatePostStatus,
} from '../controllers/postController';

const router = Router();

router.post('/', createPost);
router.get('/', listPosts);
router.get('/:id', getPost);
router.patch('/:id/status', updatePostStatus);

export default router;
