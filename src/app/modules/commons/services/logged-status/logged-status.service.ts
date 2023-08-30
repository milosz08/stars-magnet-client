/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: logged-status.service.ts
 *   Created at: 2023-06-04, 14:38:56
 *   Last updated at: 2023-08-30, 22:53:56
 *   Project name: stars-magnet-client
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { AuthHttpService } from '~/app-commons/http-services/auth-http/auth-http.service';
import {
  LoginDetailsModel,
  LoginResponseDto,
} from '~/app-commons/models/login.model';
import { RefreshModelReqDto } from '~/app-commons/models/refresh.model';
import { ToastType } from '~/app-commons/models/toast.model';
import { AccountRole } from '~/app-commons/types/account-role.type';
import { StorageKeyType } from '~/app-commons/types/storage-key.type';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ToastMessageService } from '../toast-message/toast-message.service';

@Injectable({ providedIn: 'root' })
export class LoggedStatusService {
  private _isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _loggedRole$: BehaviorSubject<AccountRole> =
    new BehaviorSubject<AccountRole>(AccountRole.USER);
  private _loggedDetails$: BehaviorSubject<LoginDetailsModel | null> =
    new BehaviorSubject<LoginDetailsModel | null>(null);

  constructor(
    private readonly _router: Router,
    private readonly _authHttpService: AuthHttpService,
    private readonly _toastMessageService: ToastMessageService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  setLoggedUserData(
    isLogged: boolean,
    role: AccountRole,
    loggedDetails: LoginDetailsModel
  ): void {
    this._isLogged$.next(isLogged);
    this._loggedRole$.next(role);
    this._loggedDetails$.next(loggedDetails);
  }

  refresh$(): Observable<boolean> {
    const tokenDetails = this._localStorageService.get<LoginResponseDto>(
      StorageKeyType.USER_TOKEN
    );
    if (!tokenDetails) {
      return of(false);
    }
    const reqData: RefreshModelReqDto = {
      token: tokenDetails.access,
      refresh: tokenDetails.refresh,
    };
    return this._authHttpService.autoLogin$(reqData).pipe(
      map(({ id, username, name, role, access }) => {
        this._localStorageService.update(
          StorageKeyType.USER_TOKEN,
          'access',
          access
        );
        this.setLoggedUserData(true, role, { id, name, username });
        this._toastMessageService.showToast(
          'You has been successfully logged.',
          ToastType.INFO
        );
        return true;
      }),
      catchError(err => {
        this.logout();
        this._toastMessageService.showToast(
          'Your session has been expired.',
          ToastType.DANGER
        );
        return throwError(err);
      })
    );
  }

  logout(): void {
    this._localStorageService.remove(StorageKeyType.USER_TOKEN);
    this._isLogged$.next(false);
    this._loggedRole$.next(AccountRole.USER);
    this._loggedDetails$.next(null);
    this._router.navigate(['/auth/login']).then(() => {
      this._toastMessageService.showToast(
        'You has been successfully logout.',
        ToastType.INFO
      );
    });
  }

  get isLogged$(): Observable<boolean> {
    return this._isLogged$.asObservable();
  }
  get loggedRole$(): Observable<AccountRole> {
    return this._loggedRole$.asObservable();
  }
  get loggedDetails$(): Observable<LoginDetailsModel | null> {
    return this._loggedDetails$.asObservable();
  }
}
