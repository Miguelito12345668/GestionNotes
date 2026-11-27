import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MfaPage from '../pages/MfaPage';
import DashboardPage from '../pages/DashboardPage';
import { RequireRole } from './guards';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/mfa', element: <MfaPage /> },
  {
    path: '/dashboard',
    element: (
      <RequireRole
        roles={[
          'ETUDIANT',
          'ENSEIGNANT',
          'RESPONSABLE_FILIERE',
          'SCOLARITE',
          'ADMIN',
        ]}
      >
        <DashboardPage />
      </RequireRole>
    ),
  },
  { path: '/', element: <Navigate to="/dashboard" replace /> },
]);