import { create } from 'zustand';
import type { Role } from '@/shared/const';
import { tokenName } from '@/shared/api/http.ts';


interface AuthState {
  user: string | null;
  role: Role | null;
  login: (user: string, role: Role, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,

  login: (user, role, token) => {
    localStorage.setItem(tokenName, token);
    set({ user, role });
  },

  logout: () => {
    localStorage.removeItem(tokenName);
    set({ user: null, role: null });
  },
}));
