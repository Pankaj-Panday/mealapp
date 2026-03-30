import { User } from './user';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignupFormValues = {
  phone: string;
  email: string;
  password: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
};
