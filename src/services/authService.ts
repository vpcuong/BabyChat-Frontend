import apiClient from '../api/apiClient';
import type { AuthResponse } from '../types/api.types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SESSION_KEYS = {
  username:                 'username',
  email:                    'email',
  access_token:             'access_token',
  refresh_token:            'refresh_token',
  access_token_expires_at:  'access_token_expires_at',
  refresh_token_expires_at: 'refresh_token_expires_at',
} as const;

const persistSession = (data: AuthResponse): void => {
  localStorage.setItem(SESSION_KEYS.username,                 data.user.username);
  localStorage.setItem(SESSION_KEYS.email,                    data.user.email);
  localStorage.setItem(SESSION_KEYS.access_token,             data.access_token);
  localStorage.setItem(SESSION_KEYS.refresh_token,            data.refresh_token);
  localStorage.setItem(SESSION_KEYS.access_token_expires_at,  data.access_token_expires_at);
  localStorage.setItem(SESSION_KEYS.refresh_token_expires_at, data.refresh_token_expires_at);
};

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    persistSession(data);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
    persistSession(data);
    return data;
  },

  logout(): void {
    Object.values(SESSION_KEYS).forEach((key) => localStorage.removeItem(key));
  },

  getAccessToken(): string | null {
    return localStorage.getItem(SESSION_KEYS.access_token);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(SESSION_KEYS.refresh_token);
  },

  // Returns true if access token is missing or expires within the next 30s
  isAccessTokenExpired(): boolean {
    const expiresAt = localStorage.getItem(SESSION_KEYS.access_token_expires_at);
    if (!expiresAt) return true;
    return Date.now() >= new Date(expiresAt).getTime() - 30_000;
  },

  isRefreshTokenExpired(): boolean {
    const expiresAt = localStorage.getItem(SESSION_KEYS.refresh_token_expires_at);
    if (!expiresAt) return true;
    return Date.now() >= new Date(expiresAt).getTime();
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken() && !this.isRefreshTokenExpired();
  },
};