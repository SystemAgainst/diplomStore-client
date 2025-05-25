import api from './http';

export const getAllInfoAboutSupplier = (login: string) =>
  api.get(`user/${login}`);