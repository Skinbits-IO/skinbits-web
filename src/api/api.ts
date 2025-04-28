import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { Cookies } from 'react-cookie';
import { API_BASE } from '../constants';

type AxiosRequestConfigWithRetry = AxiosRequestConfig & { _retry?: boolean };

const cookies = new Cookies();
const getAccessToken = () => cookies.get('access_token') as string | undefined;
const getRefreshToken = () =>
  cookies.get('refresh_token') as string | undefined;

const setTokens = (accessToken: string, refreshToken: string) => {
  cookies.set('access_token', accessToken, {
    path: '/',
    sameSite: 'lax',
    secure: true,
  });
  cookies.set('refresh_token', refreshToken, {
    path: '/',
    sameSite: 'lax',
    secure: true,
  });
};

const clearTokens = () => {
  cookies.remove('access_token', { path: '/' });
  cookies.remove('refresh_token', { path: '/' });
};

// --- Axios instance ---
export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${API_BASE}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { access_token, refresh_token } = data;
        setTokens(access_token, refresh_token);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
