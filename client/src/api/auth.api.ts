import api from './axios';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'organizer';
  branch: string;
  year: number;
  section: string;
  age: number;
  phone: string;
  rollNumber: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'organizer' | 'admin';
  branch: string;
  year: number;
  section: string;
  age: number;
  phone: string;
  rollNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};