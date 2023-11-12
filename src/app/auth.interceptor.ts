import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './service-layer/auth.service';
import { SnackbarService } from './snackbar.service';
import { LocalStorageService } from './service-layer/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private snackbar: SnackbarService,
    private localStorage: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //
    const token = this.localStorage.getItem('token');
    console.log('token', token);

    const modifiedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        this.snackbar.openSnackBar(error.error.message, 3000, 'notif-fail'); //
        console.log('eeee', error);

        return throwError(error);
      })
    );
  }
}
