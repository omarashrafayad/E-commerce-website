import { ZodError, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

const zodValidator =
  (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          params: req.params,
          query: req.query,
        });

        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            status: 'fail',
            errors: error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          });
        }
        next(error);
      }
    };

export default zodValidator;
