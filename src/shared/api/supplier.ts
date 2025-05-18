import api from './http';

export const getSupplierAllProducts = () => api.get('supplier/my/products');
