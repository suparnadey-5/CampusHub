import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name cannot exceed 50 characters'),
    email: z
      .string()
      .trim()
      .email('Please provide a valid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(100, 'Password cannot exceed 100 characters'),
    role: z.enum(['student', 'organizer', 'admin']),
    branch: z.string().trim().min(2, 'Branch must be at least 2 characters long').max(50, 'Branch cannot exceed 50 characters'),
    year: z.number().int().min(1).max(8),
    section: z.string().trim().min(1, 'Section must be at least 1 character long').max(5, 'Section cannot exceed 5 characters'). transform((val) => val.toUpperCase()),
    age: z.number().int().min(16, 'Minimum age is 16').max(60, 'Maximum age is 60'),
    phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Please provide a valid 10-digit phone number'),
    rollNumber: z.string().trim().min(1, 'Roll number must be at least 1 character long').max(20, 'Roll number cannot exceed 20 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email('Please provide a valid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  }),
});
