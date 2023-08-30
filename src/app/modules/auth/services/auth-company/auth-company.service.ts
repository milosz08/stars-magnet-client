/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-company.service.ts
 *   Created at: 2023-06-07, 21:16:13
 *   Last updated at: 2023-08-30, 23:06:49
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
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthHttpService } from '~/app-commons/http-services/auth-http/auth-http.service';
import { ResetTokenReqDto } from '~/app-commons/models/company.model';
import { CompanyLoginFormModel } from '~/app-commons/models/login.model';
import { ToastType } from '~/app-commons/models/toast.model';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { LocalStorageService } from '~/app-commons/services/local-storage/local-storage.service';
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';
import { AccountRole } from '~/app-commons/types/account-role.type';
import { StorageKeyType } from '~/app-commons/types/storage-key.type';
import { AlertType } from '~/app-commons/utils/alert.type';
import { Utils } from '~/app-commons/utils/utils';
import { CompanyCredentialsService } from '../company-credentials/company-credentials.service';

@Injectable()
export class AuthCompanyService {
  constructor(
    private readonly _router: Router,
    private readonly _authHttpService: AuthHttpService,
    private readonly _authCommonsService: LazyCommonsService,
    private readonly _loggedStatusService: LoggedStatusService,
    private readonly _toastMessageService: ToastMessageService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _companyCredentialsService: CompanyCredentialsService
  ) {}

  login$(formReq: CompanyLoginFormModel): Observable<any> {
    this._authCommonsService.setLazyLoader(true);
    return this._authHttpService.companyLogin$(formReq).pipe(
      tap(({ id, username, name, access, refresh }) => {
        this._localStorageService.save(StorageKeyType.USER_TOKEN, {
          access,
          refresh,
        });
        this._loggedStatusService.setLoggedUserData(true, AccountRole.COMPANY, {
          id,
          username,
          name,
        });
        this._authCommonsService.setLazyLoader(false);
        this._router.navigate(['/']).then(() => {
          this._toastMessageService.showToast(
            'You has been successfully logged.',
            ToastType.INFO
          );
        });
      }),
      catchError(err => this.onCatchError$(err))
    );
  }

  resetToken$(formReq: ResetTokenReqDto): Observable<any> {
    this._authCommonsService.setLazyLoader(true);
    return this._authHttpService.companyResetToken$(formReq).pipe(
      tap(res => {
        this._companyCredentialsService.assignCredentials(res);
        this._authCommonsService.setLazyLoader(false);
        this._router.navigate(['/auth/company-credentials']).then(r => r);
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
