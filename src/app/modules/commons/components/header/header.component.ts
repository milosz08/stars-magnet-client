/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDetailsModel } from '~/app-commons/models/login.model';
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { AccountRole } from '~/app-commons/types/account-role.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isNavbarCollapsed = true;
  companyRole = AccountRole.COMPANY;

  isLogged$: Observable<boolean> = this._loggedStatusService.isLogged$;
  loggedRole$: Observable<AccountRole> = this._loggedStatusService.loggedRole$;
  loggedDetails$: Observable<LoginDetailsModel | null> =
    this._loggedStatusService.loggedDetails$;

  constructor(private readonly _loggedStatusService: LoggedStatusService) {}

  onLogout(): void {
    this._loggedStatusService.logout();
  }
}
