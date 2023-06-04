/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth-register-page.component.ts
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

import { first, Observable, takeUntil } from "rxjs";

import { IRegisterFormModel } from "../../../commons/models/register.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { passwordMatchValidator } from "../../../commons/validators/password-match.validator";
import { REGEX_EMAIL, REGEX_LOGIN, REGEX_NAME, REGEX_PASSWORD } from "../../../commons/validators/regex.constant";

import { AuthService } from "../../services/auth/auth.service";
import { FormHelperService } from "../../../commons/services/form-helper/form-helper.service";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-auth-register-page",
    templateUrl: "./auth-register-page.component.html",
    providers: [ AuthService ],
})
export class AuthRegisterPageComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    registerForm: FormGroup;

    suspenseSpinner$: Observable<boolean> = this._authService.suspenseSpinner$;
    responseAlert$: Observable<IResponseAlertModel> = this._authService.responseAlert$;

    constructor(
        private _authService: AuthService,
        private _formHelperService: FormHelperService,
    ) {
        super();
        this.registerForm = new FormGroup({
            firstName: new FormControl("", [ Validators.required, Validators.pattern(REGEX_NAME) ]),
            lastName: new FormControl("", [ Validators.required, Validators.pattern(REGEX_NAME) ]),
            username: new FormControl("", [ Validators.required, Validators.pattern(REGEX_LOGIN) ]),
            email: new FormControl("", [ Validators.required, Validators.pattern(REGEX_EMAIL) ]),
            password: new FormControl("", [ Validators.required, Validators.pattern(REGEX_PASSWORD) ]),
            confirmPassword: new FormControl("", [ Validators.required, passwordMatchValidator ]),
        });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onRegisterFormSubmit(): void {
        const data: IRegisterFormModel = this.registerForm.getRawValue();
        this._authService.register(data).pipe(first(), takeUntil(this._unsubscribe)).subscribe({
            next: () => this.registerForm.reset(),
            error: () => {
                this.registerForm.get("password")?.reset();
                this.registerForm.get("confirmPassword")?.reset();
            },
        });
    };

    validateField(fieldName: string): boolean {
        return this._formHelperService.validateField(this.registerForm, fieldName);
    };
}
