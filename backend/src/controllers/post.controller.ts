import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/response';
import * as postService from '../services/post.service';

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.createPost(req.body);
  sendSuccess(res, post, 'Post created successfully', 201);
});

export const getPosts = asyncHandler(async (_req: Request, res: Response) => {
  const posts = await postService.getPosts();
  sendSuccess(res, posts);
});

export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.getPostById(req.params.id);
  sendSuccess(res, post);
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.updatePost(req.params.id, req.body);
  sendSuccess(res, post, 'Post updated successfully');
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  await postService.deletePost(req.params.id);
  sendSuccess(res, null, 'Post deleted successfully');
});
