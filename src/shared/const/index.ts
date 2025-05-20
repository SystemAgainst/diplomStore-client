export const ROLES = {
  SUPPLIER: 'SUPPLIER',
  CLIENT: 'SOLE_TRADER',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const API_URL = import.meta.env.VITE_API_URL;

export const getFullImageUrl = (path: string) => {
  if (!path) return '/mock-product.jpg';
  return path.startsWith('http')
    ? path
    : `${import.meta.env.VITE_API_URL}${path}`;
};
