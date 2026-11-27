import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const status = error?.response?.status;
    const body = error?.response?.data;
    const code = body?.code ?? 'UNKNOWN';
    const message = body?.message ?? error?.message ?? 'Erreur inconnue';

    if (status === 401 && error.config && !error.config._retried) {
      error.config._retried = true;
      try {
        await api.post('/auth/refresh');
        return api.request(error.config);
      } catch {
        window.location.href = '/login';
      }
    }

    throw new ApiError(status ?? 500, code, message);
  },
);

export default api;