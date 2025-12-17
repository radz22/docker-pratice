import { prisma } from '../config/database';
import { NotFoundError } from '../utils/app-error';
import { CreatePostInput, UpdatePostInput } from '../validators/post.validator';

export async function createPost(data: CreatePostInput) {
  const userExists = await prisma.user.findUnique({
    where: { id: data.authorId },
  });

  if (!userExists) {
    throw new NotFoundError('Author not found');
  }

  const post = await prisma.post.create({
    data,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return post;
}

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
}

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    throw new NotFoundError('Post not found');
  }

  return post;
}

export async function updatePost(id: string, data: UpdatePostInput) {
  const existingPost = await prisma.post.findUnique({
    where: { id },
  });

  if (!existingPost) {
    throw new NotFoundError('Post not found');
  }

  const post = await prisma.post.update({
    where: { id },
    data,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return post;
}

export async function deletePost(id: string) {
  const existingPost = await prisma.post.findUnique({
    where: { id },
  });

  if (!existingPost) {
    throw new NotFoundError('Post not found');
  }

  await prisma.post.delete({
    where: { id },
  });
}

