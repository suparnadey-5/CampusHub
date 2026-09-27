export interface RegisterData {
  name: string;
  email: string;
  password: string;
  branch: string;
  year: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "student" | "organizer" | "admin";
  branch: string;
  year: number;
  age?: number;
  phone?: string;
  section?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}