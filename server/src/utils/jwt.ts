import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/user.types';

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET as string | undefined;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions);
};
