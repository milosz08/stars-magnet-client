/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth-reset-token-page.component.ts
 * Last modified: 6/8/23, 12:40 AM
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
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable, takeUntil } from "rxjs";

import { IResetTokenReqDto } from "../../../commons/models/company.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { AuthCompanyService } from "../../services/auth-company/auth-company.service";
import { FormHelperService } from "../../../commons/services/form-helper/form-helper.service";
import { LazyCommonsService } from "../../../commons/services/lazy-commons/lazy-commons.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-auth-forgot-token-page",
    templateUrl: "./auth-reset-token-page.component.html",
    providers: [ AuthCompanyService, LazyCommonsService ],
})
export class AuthResetTokenPageComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    resetTokenForm: FormGroup;
    defWords = Array.from({ length: 10 }).fill("");

    suspenseSpinner$: Observable<boolean> = this._authCommonsService.lazyLoader$;
    responseAlert$: Observable<IResponseAlertModel> = this._authCommonsService.responseAlert$;

    constructor(
        private _formHelperService: FormHelperService,
        private _authCompanyService: AuthCompanyService,
        private _authCommonsService: LazyCommonsService,
    ) {
        super();
        this.resetTokenForm = new FormGroup({
            user: new FormControl("", [ Validators.required ]),
            words: new FormArray(Array.from({ length: 10 }).map(() => new FormControl("", Validators.required)))
        });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onResetTokenFormSubmit(): void {
        const data: IResetTokenReqDto = this.resetTokenForm.getRawValue();
        this._authCompanyService.resetToken$(data).pipe(takeUntil(this._unsubscribe)).subscribe({
            next: () => this.resetTokenForm.reset(),
            error: () => this.resetTokenForm.get("words")?.patchValue(this.defWords),
        });
    };

    validateField(fieldName: string): boolean {
        return this._formHelperService.validateField(this.resetTokenForm, fieldName);
    };

    get someWordsAreInvalid(): boolean {
        return this.resetTokenForm.get('words')?.getRawValue().some((v: string) => v === "");
    };

    get wordsInputs(): FormControl[] {
        return (this.resetTokenForm.get('words') as FormArray).controls as FormControl[];
    };
}
