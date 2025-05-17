export const ROLES = {
  SUPPLIER: 'SUPPLIER',
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];