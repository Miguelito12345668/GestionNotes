import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export type Role =
  | 'ETUDIANT'
  | 'ENSEIGNANT'
  | 'RESPONSABLE_FILIERE'
  | 'SCOLARITE'
  | 'ADMIN';

export function RequireRole({
  roles,
  children,
}: {
  roles: Role[];
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  if (loading) return <div>Chargement…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
