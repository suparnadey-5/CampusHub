import User, { IUser } from '../models/User.model';
import AppError from '../utils/AppError';
import { generateToken } from '../utils/jwt';
import { UserRole } from '../types/user.types';

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  branch: string;
  year: number;
  section: string;
  age: number;
  phone: string;
  rollNumber: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

const sanitizeUser = (user: IUser) => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    branch: user.branch,
    year: user.year,
    section: user.section,
    age: user.age,
    phone: user.phone,
    rollNumber: user.rollNumber,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const registerUser = async (payload: RegisterUserInput) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError('User already exists with this email', 409);
  }

  if (payload.role === 'admin') {
    throw new AppError('Admin registration is not allowed', 403);
  }

  const createData = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: payload.role ?? 'student',
    branch: payload.branch,
    year: payload.year,
    section: payload.section,
    age: payload.age,
    phone: payload.phone,
    rollNumber: payload.rollNumber,
  };

  if (payload.branch !== undefined) createData.branch = payload.branch;
  if (payload.year !== undefined) createData.year = payload.year;

  const user = await User.create(createData);

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: sanitizeUser(user),
  };
};

export const loginUser = async (payload: LoginUserInput) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordMatched = await user.comparePassword(payload.password);

  if (!isPasswordMatched) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: sanitizeUser(user),
  };
};
