import { Request } from "express";
import { Types } from "mongoose";

export type UserRole = "student" | "organizer" | "admin";

// Extends Express Request to carry authenticated user context
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    email: string;
  };
}

export interface JwtPayload {
  id: string;
  role: UserRole;
  email: string;
  iat?: number;
  exp?: number;
}
