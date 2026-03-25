import { create } from 'zustand';
import { AuthState } from '../types/auth';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../api/axios';

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    set => ({
      user: null,
      token: '',
      isAuthenticated: false,
      setAuth: (user, token) => {
        setAuthToken(token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        setAuthToken(null);
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: state => {
        if (state?.token) {
          setAuthToken(state.token);
        }
      },
    },
  ),
);
