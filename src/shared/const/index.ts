export const ROLES = {
  SUPPLIER: 'supplier',
  CLIENT: 'client',
  ADMIN: 'admin',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];