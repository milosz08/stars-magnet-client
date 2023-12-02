/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
