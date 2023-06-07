/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth-add-company-page.component.ts
 * Last modified: 6/4/23, 3:52 PM
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

import { IAddCompanyFormModel } from "../../../commons/models/company.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { passwordMatchValidator } from "../../../commons/validators/password-match.validator";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";
import { REGEX_COMPANY_NAME, REGEX_EMAIL, REGEX_LINK, REGEX_LOGIN, REGEX_PASSWORD } from "../../../commons/validators/regex.constant";

import { AddCompanyService } from "../../services/add-company/add-company.service";
import { FormHelperService } from "../../../commons/services/form-helper/form-helper.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-auth-add-company-page",
    templateUrl: "./auth-add-company-page.component.html",
    providers: [ AddCompanyService ],
})
export class AuthAddCompanyPageComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    addCompanyForm: FormGroup;

    suspenseSpinner$: Observable<boolean> = this._addCompanyService.suspenseSpinner$;
    responseAlert$: Observable<IResponseAlertModel> = this._addCompanyService.responseAlert$;

    constructor(
        private _addCompanyService: AddCompanyService,
        private _formHelperService: FormHelperService,
    ) {
        super();
        this.addCompanyForm = new FormGroup({
            name: new FormControl("", [ Validators.required, Validators.pattern(REGEX_COMPANY_NAME) ]),
            site: new FormControl("", [ Validators.required, Validators.pattern(REGEX_LINK) ]),
            username: new FormControl("", [ Validators.required, Validators.pattern(REGEX_LOGIN) ]),
            email: new FormControl("", [ Validators.required, Validators.pattern(REGEX_EMAIL) ]),
            password: new FormControl("", [ Validators.required, Validators.pattern(REGEX_PASSWORD) ]),
            confirmPassword: new FormControl("", [ Validators.required, passwordMatchValidator ]),
        });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onAddCompanySubmitForm(): void {
        const data: IAddCompanyFormModel = this.addCompanyForm.getRawValue();
        this._addCompanyService.addCompany$(data).pipe(first(), takeUntil(this._unsubscribe)).subscribe({
            next: () => this.addCompanyForm.reset(),
            error: () => {
                this.addCompanyForm.get("password")?.reset();
                this.addCompanyForm.get("confirmPassword")?.reset();
            },
        });
    };

    validateField(fieldName: string): boolean {
        return this._formHelperService.validateField(this.addCompanyForm, fieldName);
    };
}
