import api from './http';

export const createProduct = (data: FormData) =>
  api.post('product/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
