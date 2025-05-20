import api from './http';

export const banUserByLogin = (login: string) =>
  api.postWithoutBody(`admin/ban/${login}`);

export const unBanUserByLogin = (login: string) =>
  api.postWithoutBody(`admin/anBan/${login}`);

export const getAllSuppliers = () =>
  api.get('admin/suppliers');

export const getAllClients = () =>
  api.get('admin/clients');

export const getAllProducts = () =>
  api.get('admin/products');

export const removeProductById = (id: number) =>
  api.del(`admin/products/delete/${id}`);

