import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/response';
import { prisma } from '../config/database';

export const healthCheck = asyncHandler(
  async (_req: Request, res: Response) => {
    try {
      await prisma.$connect();
      sendSuccess(res, {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: 'connected',
      });
    } catch (error) {
      sendSuccess(
        res,
        {
          status: 'degraded',
          timestamp: new Date().toISOString(),
          database: 'disconnected',
        },
        undefined,
        503
      );
    }
  }
);
