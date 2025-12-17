import { Router } from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/post.controller';
import { validate } from '../middlewares/validate';
import { createPostSchema, updatePostSchema } from '../validators/post.validator';

const router = Router();

router.post('/', validate(createPostSchema), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', validate(updatePostSchema), updatePost);
router.delete('/:id', deletePost);

export default router;

