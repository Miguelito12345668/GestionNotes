import { createContext, useContext } from 'react';
import type { Role } from '../routes/guards';

export interface AuthUser {
  id: string;
  role: Role;
  email: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ mfa_required: boolean }>;
  verifyMfa: (code: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}