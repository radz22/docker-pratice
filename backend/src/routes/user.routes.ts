import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';

const router = Router();

router.post('/', validate(createUserSchema), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;

