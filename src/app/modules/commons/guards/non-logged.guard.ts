/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoggedStatusService } from '../services/logged-status/logged-status.service';

@Injectable({ providedIn: 'root' })
export class NonLoggedGuard {
  canActivate(
    loggedStatusService: LoggedStatusService,
    router: Router
  ): Observable<boolean> {
    return loggedStatusService.isLogged$.pipe(
      map(isLogged => {
        if (!isLogged) {
          return true;
        }
        router.navigate(['/']).then(r => r);
        return false;
      })
    );
  }
}

export const canActivateNonLogged: CanActivateFn = () =>
  inject(NonLoggedGuard).canActivate(
    inject(LoggedStatusService),
    inject(Router)
  );
