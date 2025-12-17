import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/response';
import * as userService from '../services/user.service';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  sendSuccess(res, user, 'User created successfully', 201);
});

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.getUsers();
  sendSuccess(res, users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  sendSuccess(res, user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  sendSuccess(res, user, 'User updated successfully');
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  sendSuccess(res, null, 'User deleted successfully');
});
