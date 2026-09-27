import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';
import { JwtPayload } from '../types/user.types';

const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authorization token is missing or invalid', 401));
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!token) {
  return next(new AppError("Authorization token is missing", 401));
  }

  if (!secret) {
    return next(new AppError('JWT_SECRET is not configured', 500));
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown as JwtPayload;

    req.user = {
      id: decoded.userId,
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    return next(new AppError('Invalid or expired token', 401));
  }
};

export default authMiddleware;
