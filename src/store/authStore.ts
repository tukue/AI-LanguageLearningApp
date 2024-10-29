import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  setAuth: (isAuth: boolean, userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (isAuth, userData) => set({ isAuthenticated: isAuth, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));