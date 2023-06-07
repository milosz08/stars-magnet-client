/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: jwt-refresh.interceptor.ts
 * Last modified: 24/05/2023, 15:19
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";

import { ILoginResponseDto } from "../../models/login.model";
import { IRefreshModelReqDto } from "../../models/refresh.model";
import { StorageKeyType } from "../../types/storage-key.type";

import { AuthHttpService } from "../../http-services/auth-http/auth-http.service";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { LoggedStatusService } from "../../services/logged-status/logged-status.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class JwtRefreshInterceptor implements HttpInterceptor {

    private _isRefreshing = false;
    private _refreshTokenSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    private readonly TOKEN_HEADER_KEY = "Authorization";
    private readonly TOKEN_PREFIX = "Bearer";

    constructor(
        private _authHttpService: AuthHttpService,
        private _loggedStatusService: LoggedStatusService,
        private _localStorageService: LocalStorageService,
    ) {
    };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const tokenData: ILoginResponseDto | null = this._localStorageService.get(StorageKeyType.USER_TOKEN);
        if (tokenData) {
            authReq = this.addTokenHeader(req, tokenData.access);
        }
        return next.handle(authReq).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse && !authReq.url.includes("api/login") && err.status === 401) {
                return this.handle401Error(authReq, next, tokenData);
            }
            return throwError(err);
        }));
    };

    private handle401Error(request: HttpRequest<any>, next: HttpHandler, tokenData: ILoginResponseDto | null) {
        if (!this._isRefreshing) {
            this._isRefreshing = true;
            this._refreshTokenSubject$.next(null);
        }
        if (tokenData && tokenData.refresh) {
            const refreshReqDto: IRefreshModelReqDto = { token: tokenData.access, refresh: tokenData.refresh };
            return this._authHttpService.refresh$(refreshReqDto).pipe(
                switchMap(res => {
                    this._isRefreshing = false;
                    this._localStorageService.update(StorageKeyType.USER_TOKEN, "access", res.access);
                    this._refreshTokenSubject$.next(res.access);
                    return next.handle(this.addTokenHeader(request, res.access));
                }),
                catchError((err) => {
                    this._isRefreshing = false;
                    this._loggedStatusService.logout();
                    return throwError(err);
                }),
            );
        }
        return this._refreshTokenSubject$.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => next.handle(this.addTokenHeader(request, token))),
        );
    };

    private addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ headers: req.headers.set(this.TOKEN_HEADER_KEY, `${this.TOKEN_PREFIX} ${token}`) });
    };
}
