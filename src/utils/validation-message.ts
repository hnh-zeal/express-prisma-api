import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

const checkSchema =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          isSuccess: false,
          message: 'Validation Error',
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        next(error);
      }
    }
  };

export default checkSchema;
