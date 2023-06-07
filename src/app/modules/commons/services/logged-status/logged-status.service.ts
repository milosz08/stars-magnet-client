/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: logged-status.service.ts
 * Last modified: 6/4/23, 2:38 PM
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

import { BehaviorSubject, catchError, map, Observable, of, throwError } from "rxjs";

import { ToastType } from "../../models/toast.model";
import { AccountRole } from "../../types/account-role.type";
import { StorageKeyType } from "../../types/storage-key.type";
import { IRefreshModelReqDto } from "../../models/refresh.model";
import { ILoginDetailsModel, ILoginResponseDto } from "../../models/login.model";

import { LocalStorageService } from "../local-storage/local-storage.service";
import { AuthHttpService } from "../../http-services/auth-http/auth-http.service";
import { ToastMessageService } from "../toast-message/toast-message.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: "root" })
export class LoggedStatusService {

    private _isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _loggedRole$: BehaviorSubject<AccountRole> = new BehaviorSubject<AccountRole>(AccountRole.USER);
    private _loggedDetails$: BehaviorSubject<ILoginDetailsModel | null> = new BehaviorSubject<ILoginDetailsModel | null>(null);

    constructor(
        private _router: Router,
        private _authHttpService: AuthHttpService,
        private _toastMessageService: ToastMessageService,
        private _localStorageService: LocalStorageService,
    ) {
    };

    setLoggedUserData(isLogged: boolean, role: AccountRole, loggedDetails: ILoginDetailsModel): void {
        this._isLogged$.next(isLogged);
        this._loggedRole$.next(role);
        this._loggedDetails$.next(loggedDetails);
    };

    refresh$(): Observable<boolean> {
        const tokenDetails = this._localStorageService.get<ILoginResponseDto>(StorageKeyType.USER_TOKEN);
        if (!tokenDetails) {
            return of(false);
        }
        const reqData: IRefreshModelReqDto = { token: tokenDetails.access, refresh: tokenDetails.refresh };
        return this._authHttpService.autoLogin$(reqData).pipe(
            map(({ id, username, name, role, access }) => {
                this._localStorageService.update(StorageKeyType.USER_TOKEN, "access", access);
                this.setLoggedUserData(true, role, { id, name, username });
                this._toastMessageService.showToast("You has been successfully logged.", ToastType.INFO);
                return true;
            }),
            catchError(err => {
                this.logout();
                this._toastMessageService.showToast("Your session has been expired.", ToastType.DANGER);
                return throwError(err);
            }),
        );
    };

    logout(): void {
        this._localStorageService.remove(StorageKeyType.USER_TOKEN);
        this._isLogged$.next(false);
        this._loggedRole$.next(AccountRole.USER);
        this._loggedDetails$.next(null);
        this._router.navigate([ "/auth/login" ]).then(() => {
            this._toastMessageService.showToast("You has been successfully logout.", ToastType.INFO);
        });
    };

    get isLogged$(): Observable<boolean> { return this._isLogged$.asObservable(); };
    get loggedRole$(): Observable<AccountRole> { return this._loggedRole$.asObservable(); };
    get loggedDetails$(): Observable<ILoginDetailsModel | null> { return this._loggedDetails$.asObservable(); };
}
