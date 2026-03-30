import axios from 'axios';
import { API_BASE_URL } from '@env';
import Logger from '../utils/logger';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authInterceptorId: number | null = null;

export const setAuthToken = (token: string | null) => {
  if (authInterceptorId) {
    api.interceptors.request.eject(authInterceptorId);
  }
  if (token) {
    authInterceptorId = api.interceptors.request.use(async config => {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.request.use(
  async config => {
    const fullUrl = `${config.baseURL ?? ''}${config.url ?? ''}`;
    Logger.info('API Request', {
      method: config.method?.toUpperCase(),
      url: fullUrl,
      params: config.params,
      data: config.data,
    });

    return config;
  },
  error => {
    Logger.error('API Request Error', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    const fullUrl = `${response.config.baseURL ?? ''}${response.config.url ?? ''}`;

    Logger.info('API Response', {
      method: response.config.method?.toUpperCase(),
      url: fullUrl,
      status: response.status,
      data: response.data,
    });

    return response;
  },
  error => {
    const fullUrl = `${error.config?.baseURL ?? ''}${error.config?.url ?? ''}`;

    Logger.error('API Error', {
      method: error.config?.method?.toUpperCase(),
      url: fullUrl,
      status: error.response?.status,
      message: error.response?.data || error.message,
    });

    return Promise.reject(error);
  },
);
