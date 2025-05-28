import { Router } from 'express';
import { createPost, listPosts, getPost } from '../controllers/postController';

const router = Router();

router.post('/', createPost);
router.get('/', listPosts);
router.get('/:id', getPost);

export default router;
