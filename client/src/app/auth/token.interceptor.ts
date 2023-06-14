import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, first, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacade } from './store/auth-facade';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.authFacade.authToken$.pipe(
      first(),
      switchMap((token: string | null) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: token,
            },
          });
        }
        return next.handle(request);
      }),
      catchError((err: HttpErrorResponse) => this.handleAuthError(err)),
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.router.navigate(['/auth/login'], {
        queryParams: {
          sessionFailed: true,
        },
      });
    }
    return throwError(() => err);
  }
}
