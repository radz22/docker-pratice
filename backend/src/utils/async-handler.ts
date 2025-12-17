import { Request, Response, NextFunction } from 'express';
import { AsyncHandler } from '../types';

export function asyncHandler(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

