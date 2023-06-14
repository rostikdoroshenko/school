import { createAction, props } from '@ngrx/store';
import { TokenData, User } from '../auth.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const authActions = {
  sendLoginCredentials: createAction(
    '[AUTH] login send credentials',
    props<{ user: User }>(),
  ),
  loginSuccess: createAction(
    '[AUTH] login success',
    props<{ tokenData: TokenData }>(),
  ),
  loginError: createAction(
    '[AUTH] login error',
    props<{ error: HttpErrorResponse }>(),
  ),
  logout: createAction('[AUTH] logout'),
  logoutSuccess: createAction('[AUTH] logout success'),
  checkExpiredToken: createAction('[AUTH] check expired token'),
};
