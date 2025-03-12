import { NextFunction, Request, Response } from 'express';
import { NODE_ENV } from '../config/env';

export class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (NODE_ENV === 'development') {
    console.error('Error: ', err);
  }

  res.status(statusCode).json({ success: false, message });
};
