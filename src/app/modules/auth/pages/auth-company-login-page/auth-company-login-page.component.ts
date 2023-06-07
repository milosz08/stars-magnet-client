/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth-company-login-page.component.ts
 * Last modified: 6/7/23, 9:02 PM
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
import { ICompanyLoginFormModel } from "../../../commons/models/login.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { LazyCommonsService } from "../../../commons/services/lazy-commons/lazy-commons.service";
import { AuthCompanyService } from "../../services/auth-company/auth-company.service";
import { FormHelperService } from "../../../commons/services/form-helper/form-helper.service";
import { ToastMessageService } from "../../../commons/services/toast-message/toast-message.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-auth-company-login-page",
    templateUrl: "./auth-company-login-page.component.html",
    providers: [ AuthCompanyService, LazyCommonsService ],
})
export class AuthCompanyLoginPageComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    companyLoginForm: FormGroup;

    suspenseSpinner$: Observable<boolean> = this._authCommonsService.lazyLoader$;
    responseAlert$: Observable<IResponseAlertModel> = this._authCommonsService.responseAlert$;

    constructor(
        private _router: Router,
        private _authCompanyService: AuthCompanyService,
        private _authCommonsService: LazyCommonsService,
        private _formHelperService: FormHelperService,
        private _toastMessageService: ToastMessageService,
    ) {
        super();
        this.companyLoginForm = new FormGroup({
            username: new FormControl("", [ Validators.required ]),
            password: new FormControl("", [ Validators.required ]),
            token: new FormControl("", [ Validators.required ]),
        });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onLoginCompanyFormSubmit(): void {
        const data: ICompanyLoginFormModel = this.companyLoginForm.getRawValue();
        this._authCompanyService.login$(data).pipe(first(), takeUntil(this._unsubscribe)).subscribe({
            next: () => {
                this._router.navigate([ "/" ]).then(r => {
                    this._toastMessageService.showToast("You has been successfully logged.", ToastType.INFO);
                });
            },
            error: () => {
                this.companyLoginForm.get("password")?.reset();
                this.companyLoginForm.get("token")?.reset();
            },
        });
    };

    validateField(fieldName: string): boolean {
        return this._formHelperService.validateField(this.companyLoginForm, fieldName);
    };
}
