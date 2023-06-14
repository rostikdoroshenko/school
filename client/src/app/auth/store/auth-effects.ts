import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { authActions } from './auth-actions';
import {
  catchError,
  delay,
  filter,
  first,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { TokenData } from '../auth.interface';
import { EXPIRATION_DATE, TOKEN } from '../auth.config';
import { PanelClass, SnackbarService } from '../../shared/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthFacade } from './auth-facade';
import { AppFacade } from '../../store/facade';
@Injectable()
export class AuthEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.sendLoginCredentials),
      switchMap(({ user }) =>
        this.authService.login(user).pipe(
          first(),
          map((tokenData: TokenData) =>
            authActions.loginSuccess({ tokenData }),
          ),
          catchError((error: HttpErrorResponse) => {
            this.snackbarService.openSnackbar(error.error, PanelClass.error);
            return of(authActions.loginError({ error }));
          }),
        ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(({ tokenData }) => {
          console.log('success', tokenData);
          this.saveAuthData(tokenData);
          this.snackbarService.openSnackbar(
            'Login successful',
            PanelClass.success,
          );
          this.appFacade.loadClasses();
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        this.logout();
        this.snackbarService.openSnackbar(
          'Logout successful',
          PanelClass.success,
        );
        return authActions.logoutSuccess();
      }),
    ),
  );

  checkExpiredToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.checkExpiredToken),
      concatLatestFrom(() => this.authFacade.isAuthenticated$),
      filter(([, value]) => value),
      delay(this.getExpTime()),
      map(() => authActions.logout()),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private authFacade: AuthFacade,
    private appFacade: AppFacade,
  ) {}

  logout(): void {
    console.log('logout');
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRATION_DATE);
    this.router.navigate(['/auth', 'login']);
  }

  saveAuthData({ token, expiresIn }: TokenData): void {
    if (token && expiresIn) {
      const now = new Date();
      const expDate = new Date(now.getTime() + +expiresIn * 1000);
      localStorage.setItem(TOKEN, token);
      localStorage.setItem(EXPIRATION_DATE, expDate.getTime().toString());
    }
  }

  getExpTime(): number {
    const exp = localStorage.getItem(EXPIRATION_DATE) || 0;
    return +exp - new Date().getTime();
  }
}
