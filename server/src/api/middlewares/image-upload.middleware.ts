import multer from 'multer';
import { NextFunction, Request, Response } from 'express';

export const imageUploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  multer({ storage: multer.memoryStorage() }).single('image');
  next();
};
