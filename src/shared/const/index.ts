export const ROLES = {
  SUPPLIER: 'SUPPLIER',
  CLIENT: 'SOLE_TRADER',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];