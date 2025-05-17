import { create } from 'zustand';
import type { Role } from '@/shared/const';

interface AuthState {
  user: string | null;
  role: Role | null;
  login: (user: string, role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  login: (user, role) => set({ user, role }),
  logout: () => set({ user: null, role: null }),
}));
