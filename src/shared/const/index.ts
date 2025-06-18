export const ROLES = {
  SUPPLIER: 'SUPPLIER',
  CLIENT: 'SOLE_TRADER',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const API_URL = import.meta.env.VITE_API_URL;
export const STATIC_URL = import.meta.env.VITE_STATIC_URL;

export const getFullImageUrl = (path: string | undefined) => {
  if (!path) return '/mock-product.jpg';

  const fullPath = path.startsWith('http')
    ? path
    : `${STATIC_URL}${path}`;

  return encodeURI(fullPath);
};


