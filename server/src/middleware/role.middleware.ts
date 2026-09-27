import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';
import { UserRole } from '../types/user.types';

const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Unauthorized access', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to access this resource', 403));
    }

    next();
  };
};

export default authorizeRoles;
