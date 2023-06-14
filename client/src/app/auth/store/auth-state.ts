import { User } from '../auth.interface';

export const AUTH_KEY = 'auth';

export interface AuthState {
  User: User | null;
  token: string | null;
  expiresIn: string | null;
  isLoading: boolean;
  errorMessage: string | null;
}
