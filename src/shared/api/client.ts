import api from './http';

export const getAllInfoAboutSupplier = (login: string) =>
  api.get(`user/${login}`);

export const getDetailInfoAboutOrder = (id: number) =>
  api.get(`client/my/orders/${id}`);