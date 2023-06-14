import { AuthState } from './auth-state';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { authActions } from './auth-actions';
import { EXPIRATION_DATE, TOKEN } from '../auth.config';

export const initialAuthState: AuthState = {
  User: null,
  token: localStorage.getItem(TOKEN),
  expiresIn: localStorage.getItem(EXPIRATION_DATE),
  isLoading: false,
  errorMessage: null,
};

export const authReducer: ActionReducer<AuthState> = createReducer<AuthState>(
  initialAuthState,
  on(authActions.sendLoginCredentials, (state: AuthState) => ({
    ...state,
    isLoading: true,
  })),
  on(authActions.loginSuccess, (state: AuthState, { tokenData }) => ({
    ...state,
    isLoading: false,
    token: tokenData.token,
    expiresIn: tokenData.expiresIn,
  })),
  on(authActions.loginError, (state: AuthState, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message,
    User: null,
    token: null,
  })),
  on(authActions.logoutSuccess, (state: AuthState) => ({
    ...state,
    User: null,
    token: null,
    expiresIn: null,
  })),
);
