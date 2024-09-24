import { StateCreator } from 'zustand';

export interface AuthSLice {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

export const createAuthSlice: StateCreator<AuthSLice> = (set) => ({
  isLoggedIn: false,
  setLoggedIn: (value: boolean) => {
    set({ isLoggedIn: value });
  },
});
