import { apiRequest } from "./api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface MeResponse {
  user: AuthUser;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getMe = async (): Promise<MeResponse> => {
  return apiRequest<MeResponse>("/auth/me", {
    method: "GET",
  });
};

export const logout = (): void => {
  localStorage.removeItem("token");
};