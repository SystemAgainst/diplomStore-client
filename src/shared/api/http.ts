import axios from 'axios';

const CONFIG = 'http://localhost:5173';

const instance = axios.create({
  baseURL: `${CONFIG}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tokenName = 'token';

const getToken = () => localStorage.getItem(tokenName);

const removeToken = () => localStorage.removeItem(tokenName);

instance.interceptors.request.use((requestConfig) => {
  const token = getToken();
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      return Promise.reject({ ...error, isAuthError: true });
    }

    if (error.response?.status > 500) {
      return Promise.reject(error);
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error.message);
  }
);

const get = <T = any>(uri: string, requestConfig = {}) =>
  instance.get<T>(uri, requestConfig);

const post = <T = any>(uri: string, data: any, requestConfig = {}) =>
  instance.post<T>(uri, data, requestConfig);

const put = <T = any>(uri: string, data: any, requestConfig = {}) =>
  instance.put<T>(uri, data, requestConfig);

const del = <T = any>(uri: string, requestConfig = {}) =>
  instance.delete<T>(uri, requestConfig);

const patch = <T = any>(uri: string, data: any = {}, requestConfig = {}) =>
  instance.patch<T>(uri, data, requestConfig);

export default {
  instance,
  get,
  post,
  put,
  del,
  patch,
};
