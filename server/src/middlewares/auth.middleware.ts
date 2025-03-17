import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from './error.middleware';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  sub: string;
  'custom:role'?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw new ErrorResponse('Unauthorized', 401);
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded['custom:role'] || '';
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRoles.includes(userRole.toLowerCase());
      if (!hasAccess) throw new ErrorResponse('Access Denied', 403);

      next();
    } catch (error) {
      console.error('Failed to decode token: ', error);
      next(error);
    }
  };
};
