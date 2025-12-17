import { prisma } from '../config/database';
import { NotFoundError, ConflictError } from '../utils/app-error';
import { CreateUserInput, UpdateUserInput } from '../validators/user.validator';

export async function createUser(data: CreateUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new ConflictError('User with this email already exists');
  }

  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      posts: {
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
}

export async function updateUser(id: string, data: UpdateUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new NotFoundError('User not found');
  }

  if (data.email && data.email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (emailExists) {
      throw new ConflictError('Email already in use');
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

export async function deleteUser(id: string) {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new NotFoundError('User not found');
  }

  await prisma.user.delete({
    where: { id },
  });
}

