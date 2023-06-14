import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_KEY, AuthState } from './auth-state';

export const authFeatureSelector = createFeatureSelector<AuthState>(AUTH_KEY);

export const user = createSelector(authFeatureSelector, (state) => state.User);
export const isLoading = createSelector(
  authFeatureSelector,
  (state) => state.isLoading,
);
export const token = createSelector(
  authFeatureSelector,
  (state) => state.token,
);

export const isAuthenticated = createSelector(
  authFeatureSelector,
  (state) => !!state.token,
);
