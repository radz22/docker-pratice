import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().optional(),
    published: z.boolean().optional(),
    authorId: z.string().min(1, 'Author ID is required'),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];
export type UpdatePostInput = z.infer<typeof updatePostSchema>['body'];

