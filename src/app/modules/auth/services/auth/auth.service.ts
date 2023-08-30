/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth.service.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 23:05:51
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
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthHttpService } from '~/app-commons/http-services/auth-http/auth-http.service';
import { LoginFormModel } from '~/app-commons/models/login.model';
import {
  RegisterFormModel,
  RegisterReqDto,
} from '~/app-commons/models/register.model';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { LocalStorageService } from '~/app-commons/services/local-storage/local-storage.service';
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { AccountRole } from '~/app-commons/types/account-role.type';
import { StorageKeyType } from '~/app-commons/types/storage-key.type';
import { AlertType } from '~/app-commons/utils/alert.type';
import { Utils } from '~/app-commons/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly _authHttpService: AuthHttpService,
    private readonly _authCommonsService: LazyCommonsService,
    private readonly _loggedStatusService: LoggedStatusService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  login$(formReq: LoginFormModel): Observable<any> {
    this._authCommonsService.setLazyLoader(true);
    return this._authHttpService.login$(formReq).pipe(
      tap(({ id, username, name, access, refresh }) => {
        this._localStorageService.save(StorageKeyType.USER_TOKEN, {
          access,
          refresh,
        });
        this._loggedStatusService.setLoggedUserData(true, AccountRole.USER, {
          id,
          name,
          username,
        });
        this._authCommonsService.setLazyLoader(false);
      }),
      catchError(err => this.onCatchError$(err))
    );
  }

  register$(formReq: RegisterFormModel): Observable<any> {
    this._authCommonsService.setLazyLoader(true);
    const reqData: RegisterReqDto = Utils.convertCamelToSnake(formReq);
    return this._authHttpService.register$(reqData).pipe(
      tap(() => {
        this._authCommonsService.setResponseAlert({
          type: AlertType.INFO,
          content: `Your account was successfully created. Go to <strong>login page</strong> to
                        login on your account.`,
        });
        this._authCommonsService.setLazyLoader(false);
      }),
      catchError(err => this.onCatchError$(err))
    );
  }

  private onCatchError$(err: any): Observable<any> {
    this._authCommonsService.setLazyLoader(false);
    const resMessage = Utils.getFirstObjectErrorValue(err.error);
    this._authCommonsService.setResponseAlert({
      type: AlertType.ERROR,
      content: `${resMessage || 'Unknow server error'}.`,
    });
    return throwError(() => new Error(err));
  }
}
