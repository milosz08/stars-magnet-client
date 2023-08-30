/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: header.component.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 22:38:55
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
