import { create } from 'zustand';

type Role = 'client' | 'supplier' | 'admin' | null;

interface AuthState {
  user: string | null;
  role: Role;
  login: (user: string, role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  login: (user, role) => set({ user, role }),
  logout: () => set({ user: null, role: null }),
}));
