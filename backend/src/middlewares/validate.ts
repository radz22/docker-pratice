import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError } from '../utils/app-error';

export function validate(schema: AnyZodObject) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));
        next(
          new BadRequestError(
            JSON.stringify(errorMessages, null, 2)
          )
        );
      } else {
        next(error);
      }
    }
  };
}

