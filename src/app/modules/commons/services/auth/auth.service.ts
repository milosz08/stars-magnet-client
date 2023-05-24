/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth.service.ts
 * Last modified: 24/05/2023, 00:39
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

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";

import { Utils } from "../../utils/utils";
import { AlertType } from "../../utils/alert.type";
import { StorageKeyType } from "../../types/storage-key.type";
import { IRefreshModelReqDto } from "../../models/refresh.model";
import { IResponseAlertModel } from "../../models/response-alert.model";
import { IRegisterFormModel, IRegisterReqDto } from "../../models/register.model";
import { ILoginFormModel, ILoginResponseDto } from "../../models/login.model";

import { AuthHttpService } from "../auth-http/auth-http.service";
import { LocalStorageService } from "../local-storage/local-storage.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: "root" })
export class AuthService {

    private _isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _suspenseSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _responseAlert$: BehaviorSubject<IResponseAlertModel> = new BehaviorSubject<IResponseAlertModel>({
        type: AlertType.ERROR, content: "",
    });

    constructor(
        private _router: Router,
        private _authHttpService: AuthHttpService,
        private _localStorageService: LocalStorageService,
    ) {
    };

    login(formReq: ILoginFormModel): Observable<any> {
        this._suspenseSpinner$.next(true);
        return this._authHttpService.login(formReq).pipe(
            tap(res => {
                this._localStorageService.save(StorageKeyType.USER_TOKEN, res);
                this._isLogged$.next(true);
                this._suspenseSpinner$.next(false);
            }),
            catchError(err => this.onCatchError(err)),
        );
    };

    register(formReq: IRegisterFormModel): Observable<any> {
        this._suspenseSpinner$.next(true);
        const reqData: IRegisterReqDto = Utils.convertCamelToSnake(formReq);
        return this._authHttpService.register(reqData).pipe(
            tap(() => {
                this._responseAlert$.next({
                    type: AlertType.INFO,
                    content: `Your account was successfully created. Go to <strong>login page</strong> to
                        login on your account.`,
                });
                this._suspenseSpinner$.next(false);
            }),
            catchError(err => this.onCatchError(err)),
        );
    };

    logout(): void {
        this._localStorageService.remove(StorageKeyType.USER_TOKEN);
        this._isLogged$.next(false);
        this._router.navigate([ "/auth/login" ]).then(r => r);
    };

    refresh(): Observable<boolean> {
        const tokenDetails = this._localStorageService.get<ILoginResponseDto>(StorageKeyType.USER_TOKEN);
        if (!tokenDetails) {
            return of(false);
        }
        const reqData: IRefreshModelReqDto = { token: tokenDetails.access, refresh: tokenDetails.refresh };
        return this._authHttpService.refresh(reqData).pipe(
            map(resData => {
                this._localStorageService.update(StorageKeyType.USER_TOKEN, "access", resData.access);
                this._isLogged$.next(true);
                return true;
            }),
            catchError(_ => of(false))
        );
    };

    clearMessages(): void {
        this._responseAlert$.next({ type: AlertType.ERROR, content: "" });
    };

    private onCatchError(err: any): Observable<any> {
        this._suspenseSpinner$.next(false);
        const resMessage = Utils.getFirstObjectErrorValue(err.error);
        this._responseAlert$.next({ type: AlertType.ERROR, content: `${resMessage || "Unknow server error"}.` });
        return throwError(err);
    };

    get suspenseSpinner$(): Observable<boolean>                 { return this._suspenseSpinner$.asObservable(); };
    get responseAlert$(): Observable<IResponseAlertModel>       { return this._responseAlert$.asObservable(); };
    get isLogged$(): Observable<boolean>                        { return this._isLogged$.asObservable(); };
}
