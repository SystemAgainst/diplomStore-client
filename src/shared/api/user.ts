import api from './http';

export const authUser = (login: string, password: string) =>
  api.post('login', { login, password });

export const getUserInfo = () => api.get('user');

export const logoutUser = () => api.post('logout', {});

export const getAllUsers = () => api.get('users/all');
