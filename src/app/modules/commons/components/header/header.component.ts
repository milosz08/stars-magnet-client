/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: header.component.ts
 * Last modified: 24/05/2023, 04:16
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

import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { AccountRole } from "../../types/account-role.type";
import { ILoginDetailsModel } from "../../models/login.model";

import { LoggedStatusService } from "../../services/logged-status/logged-status.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
})
export class HeaderComponent {

    isNavbarCollapsed = true;
    companyRole = AccountRole.COMPANY;

    isLogged$: Observable<boolean> = this._loggedStatusService.isLogged$;
    loggedRole$: Observable<AccountRole> = this._loggedStatusService.loggedRole$;
    loggedDetails$: Observable<ILoginDetailsModel | null> = this._loggedStatusService.loggedDetails$;

    constructor(
        private _router: Router,
        private _loggedStatusService: LoggedStatusService,
    ) {
    };

    onLogout(): void {
        this._loggedStatusService.logout();
    };
}
