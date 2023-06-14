import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../auth.interface';
import { isAuthenticated, isLoading, token } from './auth-selectors';
import { authActions } from './auth-actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  isAuthLoading$: Observable<boolean> = this.store.select(isLoading);
  isAuthenticated$: Observable<boolean> = this.store.select(isAuthenticated);
  authToken$: Observable<string | null> = this.store.select(token);
  constructor(private store: Store) {}

  sendCredentials(user: User) {
    this.store.dispatch(authActions.sendLoginCredentials({ user }));
  }

  logoutUser() {
    this.store.dispatch(authActions.logout());
  }

  checkExpiredToken() {
    this.store.dispatch(authActions.checkExpiredToken());
  }
}
