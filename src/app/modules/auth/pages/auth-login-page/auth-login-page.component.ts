/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth-login-page.component.ts
 * Last modified: 23/05/2023, 09:51
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

import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { first, Observable, takeUntil } from "rxjs";

import { ToastType } from "../../../commons/models/toast.model";
import { ILoginFormModel } from "../../../commons/models/login.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { AuthService } from "../../services/auth/auth.service";
import { LazyCommonsService } from "../../../commons/services/lazy-commons/lazy-commons.service";
import { ToastMessageService } from "../../../commons/services/toast-message/toast-message.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-auth-login-page",
    templateUrl: "./auth-login-page.component.html",
    providers: [ AuthService, LazyCommonsService ],
})
export class AuthLoginPageComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    loginForm: FormGroup;

    suspenseSpinner$: Observable<boolean> = this._authCommonsService.lazyLoader$;
    responseAlert$: Observable<IResponseAlertModel> = this._authCommonsService.responseAlert$;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _authCommonsService: LazyCommonsService,
        private _toastMessageService: ToastMessageService,
    ) {
        super();
        this.loginForm = new FormGroup({
            username: new FormControl("", [ Validators.required ]),
            password: new FormControl("", [ Validators.required ]),
        });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onLoginFormSubmit(): void {
        const data: ILoginFormModel = this.loginForm.getRawValue();
        this._authService.login$(data).pipe(first(), takeUntil(this._unsubscribe)).subscribe({
            next: () => {
                this._router.navigate([ "/" ]).then(() => {
                    this._toastMessageService.showToast("You has been successfully logged.", ToastType.INFO);
                });
            },
            error: () => this.loginForm.get("password")?.reset(),
        });
    };

    validateField(fieldName: string): boolean {
        return this._formHelperService.validateField(this.loginForm, fieldName);
    };
}
