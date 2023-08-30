/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: after-pass-company-guard.service.ts
 *   Created at: 2023-06-04, 13:59:00
 *   Last updated at: 2023-08-30, 23:00:33
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
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CompanyCredentialsService } from '../services/company-credentials/company-credentials.service';

@Injectable()
export class CompanyCredentialsGuard {
  canActivate(
    companyCredentialsService: CompanyCredentialsService,
    router: Router
  ): Observable<boolean> {
    return companyCredentialsService.companyCredentials$.pipe(
      map(isAdded => {
        if (isAdded) {
          return true;
        }
        router.navigate(['/auth/company-login']).then(r => r);
        return false;
      })
    );
  }
}

export const canActivateCompanyCredentials: CanActivateFn = () =>
  inject(CompanyCredentialsGuard).canActivate(
    inject(CompanyCredentialsService),
    inject(Router)
  );
