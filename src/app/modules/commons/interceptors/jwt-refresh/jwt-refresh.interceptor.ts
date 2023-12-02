/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthHttpService } from '~/app-commons/http-services/auth-http/auth-http.service';
import { LoginResponseDto } from '~/app-commons/models/login.model';
import { RefreshModelReqDto } from '~/app-commons/models/refresh.model';
import { LocalStorageService } from '~/app-commons/services/local-storage/local-storage.service';
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { StorageKeyType } from '~/app-commons/types/storage-key.type';

@Injectable()
export class JwtRefreshInterceptor implements HttpInterceptor {
  private _isRefreshing = false;
  private _refreshTokenSubject$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  private readonly TOKEN_HEADER_KEY = 'Authorization';
  private readonly TOKEN_PREFIX = 'Bearer';

  constructor(
    private readonly _authHttpService: AuthHttpService,
    private readonly _loggedStatusService: LoggedStatusService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const tokenData: LoginResponseDto | null = this._localStorageService.get(
      StorageKeyType.USER_TOKEN
    );
    if (tokenData) {
      authReq = this.addTokenHeader(req, tokenData.access);
    }
    return next.handle(authReq).pipe(
      catchError(err => {
        if (
          err instanceof HttpErrorResponse &&
          !authReq.url.includes('login') &&
          err.status === 401
        ) {
          return this.handle401Error(authReq, next, tokenData);
        }
        return throwError(err);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
    tokenData: LoginResponseDto | null
  ) {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject$.next(null);
    }
    if (tokenData && tokenData.refresh) {
      const refreshReqDto: RefreshModelReqDto = {
        token: tokenData.access,
        refresh: tokenData.refresh,
      };
      return this._authHttpService.refresh$(refreshReqDto).pipe(
        switchMap(res => {
          this._isRefreshing = false;
          this._localStorageService.update(
            StorageKeyType.USER_TOKEN,
            'access',
            res.access
          );
          this._refreshTokenSubject$.next(res.access);
          return next.handle(this.addTokenHeader(request, res.access));
        }),
        catchError(err => {
          this._isRefreshing = false;
          this._loggedStatusService.logout();
          return throwError(err);
        })
      );
    }
    return this._refreshTokenSubject$.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(
        this.TOKEN_HEADER_KEY,
        `${this.TOKEN_PREFIX} ${token}`
      ),
    });
  }
}
