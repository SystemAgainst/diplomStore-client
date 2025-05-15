import api from './http';

// лучше product/all
export const getProductsList = () => api.get('product');
