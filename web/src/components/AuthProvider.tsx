import { useEffect, useMemo, useState, type ReactNode } from 'react';
import api from '../api/client';
import { AuthContext, type AuthUser } from '../hooks/useAuth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/auth/me')
      .then((r) => setUser(r.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (email: string, password: string) => {
        const { data } = await api.post('/auth/login', { email, password });
        return { mfa_required: !!data.mfa_required };
      },
      verifyMfa: async (code: string) => {
        const { data } = await api.post('/auth/mfa/verify', { code });
        setUser(data.user);
      },
      logout: async () => {
        await api.post('/auth/logout');
        setUser(null);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}